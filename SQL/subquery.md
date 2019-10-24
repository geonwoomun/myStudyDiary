## subquery

subquery의 종류에는 3가지가 있는데
 1. select절에 사용하는 scalar subquery
 2. from절에 사용하는 inline view
 3. where 절에 사용하는 중첩 subquery

기본적으로 subquery는 query안에 있는 또 다른 query를 의미한다. 바깥에 있는 query를 main query 안에 있는 query를 subquery라고 한다.

예를 들면 HR.EMPLOYEES 랑 HR.DEPARTMENTS가 있다고 할 때 

    SELECT * FROM HR.EMPLOYEES A
        WHERE A.DEPARTMENT_ID = (SELECT B.DEPARTMENT_ID FROM HR.DEPARTMENTS B
                                    WHERE B.LOCATION_ID=1800);

이런식으로 subquery를 사용할 수 있다. HR.DEPARTMENTS 테이블의 LOCATION_ID가 1800인 DEPARTMENT_ID와 같은 DEPARTMENT_ID를 가진 EMPLOYEES 테이블의 ROW를 출력하라라는 뜻이다.

그런데 = 조건은 단일행 서브쿼리로만 해야한다. 즉 서브쿼리의 결과가 1건만 나와야한다는 것이다. 여러건이 결과로 나오는 서브쿼리를 사용하면 에러가 난다.

이럴 때는 
      SELECT * FROM HR.EMPLOYEES A
        WHERE A.DEPARTMENT_ID IN (SELECT B.DEPARTMENT_ID FROM HR.DEPARTMENTS B
                                    WHERE B.LOCATION_ID=1700);

이런식으로 해야한다.

많은 개발자 분들이 서브쿼리를 사용하면 성능이 안 좋다는 생각을 많이 한다. 그런데 사실은 서브쿼리랑 성능은 별 상관이 없다고 보면 된다. 서브쿼리로 하는게 유리한지 JOIN으로 하는게 유리한지는 optimizer가 알아서 판단을 해서 실행계획을 작성해주기 때문에 성능과는 무관하다.

실제로 알아보기 위해서 join으로 풀어쓴 쿼리를 다시 짜보면

    SELECT * 
        FROM HR.EMPLOYEES A, HR.DEPARTMENTS B
        WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID
         AND B.LOCATION_ID = 1700;

이다. 실행계획을 비교해보면 서브쿼리로 작성한것이 HASH JOIN으로 풀리고 버퍼가 8개가 쓰인다.
밑에 join으로 풀어쓴 쿼리도 실행계획이 동일하게 HASH JOIN에 버퍼가 8개가 쓰인다.

서브쿼리를 HASH JOIN으로 풀지 말고 그냥 그대로 쓰라고 하고 싶을 때는

      SELECT * FROM HR.EMPLOYEES A
        WHERE A.DEPARTMENT_ID 
        IN (SELECT /*+NO_UNNEST*/ B.DEPARTMENT_ID 
        FROM HR.DEPARTMENTS B
        WHERE B.LOCATION_ID=1700);

이런식으로 SQL 힌트를 주면된다. 그러면 HASH JOIN으로 하지않고 그대로 실행계획이 나온다.
이렇게 하면 FILTER라는 것을 사용하고 버퍼를 28개를 읽게 된다. 효율적이지 못 하게 된다.
개발 할 때 함부로 힌트를 넣으면 안된다. 안 넣으면 optimizer가 알아서 효율적인걸 선택해주기 때문에.

효율에 대해서 또 알아보자.

    SELECT A.EMPLOYEE_ID,
           A.FIRST_NAME,
           A.LAST_NAME,
           A.SALARY
        FROM HR.EMPLOYEES A
     WHERE A.SALARY = (SELECT MIN(SALARY) FROM HR.EMPLOYEES)
        OR A.SALARY = (SELECT MAX(SALARY) FROM HR.EMPLOYEES);

이것과 

    SELECT B.EMPLOYEE_ID,
           B.FIRST_NAME,
           B.LAST_NAME,
           B.SALARY
        FROM (
            SELECT A.EMPLOYEE_ID,
                   A.FIRST_NAME,
                   A.LAST_NAME,
                   A.SALARY,
                   ROW_NUMBER() OVER(ORDER BY SALARY) MINSAL,
                   ROW_NUMBER() OVER(ORDER BY SALARY DESC) MAXSAL
                FROM HR.EMPLOYEES A
        )   B
    WHERE B.MINSAL = 1 OR B.MAXSAL = 1;

은 같은 결과를 내는 쿼리문이다. 어느게 더 효율적일까? 답은 밑에것이다.
위에 것은 같은 테이블에 3번이나 접근을 해야한다. 밑에 테이블은 1번만 접근한다.
이것을 실행계획을 확인해보면
위에 것은 EMPLOYEES 테이블에 3번을 접근해서 18개의 버퍼를 읽고 밑에 것은 1번만 접근을해서 6개의 버퍼를 읽었다고 나온다. 3배의 성능 차이가 난다. 데이터 수가 엄청난 대용량 데이터베이스 였다면 엄청난 성능차이가 났을 것이다. 그래서 서브쿼리를 너무 막 쓰면 안된다.


