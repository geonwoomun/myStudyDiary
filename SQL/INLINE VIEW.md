# INLINE VIEW

INLINE VIEW는 따로 object를 생성하지 않고 sql내에 직접 기술을 해서 쓰이는 일회성적인 view이다.

FROM 절에 subquery가 사용 되는 것.

    SELECT A. DEPARTMENT_NAME,
        B.AVG_SAL
        FROM DEPARTMENTS A,
            (SELECT DEPARTMENT_ID, ROUND(AVG(SALARY),2) AVG_SAL
            FROM EMPLOYEES
            GROUP BY DEPARTMENT_ID) B
        WHERE A.DEPARTMENT_ID = B.DEPARTMENT_ID

일단 FROM 절의 SUB QUERY를 실행하면 DEPARTMENT_ID 별로 평균 급여가 나온다.
그리고 그냥 FROM절은 DEPARTMENT_NAME을 출력하는건데 두개를 INNER JOIN을 한 것.

인라인뷰는 남발하면 문제가 되겠지만 적절하게 활용을 하면 비용절감에 큰 효과가 있기도 하다.

예를 들어서 두 테이블을 조인한다고 할 때 전체 데이터를 조인해서 필요없는 부분을 줄이는 것 보다는
먼저 필요한 데이터만 INLINE VIEW로 생성을 해서 그것만 조인을 하면 비용절감이 된다.
