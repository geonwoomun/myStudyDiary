# view

view 는 데이터베이스 select문을 저장한 OBJECT라고 할수가 있다.
쿼리문에서 테이블처럼 쓰인다.

뷰 생성

    CREATE OR REPLACE VIEW V1_IDOL AS
    SELECT * FROM IDOL_GROUP WHERE GROUP_NAME = 'BTS';

뷰 조회
    SELECT * FROM V1_IDOL;

뷰 생성 (조인문)
    CREATE OR REPLACE VIEW V2_IDOL AS
    SELECT A.COMPANY, A.GROUP_NAME, B.MEMBER_NAME, B.REAL_NAME
     FROM IDOL_GROUP A, IDOL_MEMBER B
        WHERE A.GROUP_NAME = B.GROUP_NAME
        AND A.GROUP_NAME = 'BTS';

보통은 간단한 쿼리 보다는 굉장히 복잡한 쿼리를 뷰로 생성해놓고 사용한다.
자주 쓰이는 쿼리일 경우 계속 복잡한 쿼리를 적는 것보다는 뷰로 만들어놓고 그것을
재활용하는것이 편하기 때문이다.

뷰 삭제
    DROP VIEW V1_IDOL;

    DROP VIEW V2_IDOL;


## 뷰사용 이유
 1. 공통모듈처럼 쓰기 위해서. 프로그래밍에서 함수를 사용하는 이유와 같음.
 하나를 설정 해놓으면 이 VIEW를 참조하는 애플리케이션단의 소스를 수정하지 않고도 
 이 뷰만 수정하면 다 바뀐다.

 2. 굉장히 복잡한 쿼리를 자주 사용할 경우에는 소스단에 있는 쿼리가 매우 간결해질 수 있다.

 3. 제일 중요한 이유는. 보안상의 이유. 중요한 정보가 있는 컬럼들은 보여주지 않고 
 정말 필요로하는 컬럼만 보여주는 뷰를 만들어서 제공해줄 수 있다.

