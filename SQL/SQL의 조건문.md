## SQL의 조건문 CASE WHEN, DECODE

    SELECT GROUP_NAME, CASE GENDER WHEN 'boy' THEN '남' WHEN 'girl' THEN '여' ELSE '혼성' END GENDER_KO,
    CASE WHEN GENDER = 'boy' THEN '남' WHEN GENDER = 'girl' THEN '여' ELSE '혼성' END GENDER_KO2,
    DECODE(GENDER, 'boy', '남', 'girl', '여', '혼성') GENDER_KO3
    FROM IDOL_GROUP;

2,3,4 컬럼 모두 GENDER 컬럼이 'boy' 면 '남', 'girl' 이면 '여', 둘다 아니면 '혼성' 을 출력해주는 조건문이자 컬럼(?)이다.

첫번째 case 문은 조건의 대상이 될 컬럼을 먼저 적고 그 컬럼의 조건에 따라 결과를 반환한다.

두번째 case문은 WHEN 안에 컬럼과 조건에 대해 적기 때문에 한가지 컬럼 뿐만아니라 여러 컬럼에 대한 내용도 가능하다.

DECODE 문은 컬럼을 적고 ~일때 ~ ~일 때 ~ 아니면 ~ 이런식이다.
뒤에 적는 개수에 따라서 알아서 작동한다.

보통 간단한 조건문일 때는 DECODE를 많이 사용하고 여러줄이나 조금 복잡하다 싶을 때는 CASE WHEN을 많이 사용한다고 한다.