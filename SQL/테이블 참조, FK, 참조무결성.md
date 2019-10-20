## FK 설정

부모테이블과 자식테이블을 CREATE TABLE로 만들고

자식테이블에 설정을 추가하면 된다.

    ALTER TABLE CHILD ADD CONSTRAINT C_FK FOREIGN KEY(P_ID) REFERENCES PARENT (P_ID);

이렇게 하면 CHILD 테이블에 C_FK라는 이름을 가진 FK를 P_ID로 추가하는데 이거는 PARENT 테이블의 P_ID를 참고한다.가 된다.

부모 테이블의 PK에 없는 값을 자식 테이블의 FK에 넣으려고 한다면 참조무결성 에러가 날 것이다.
부모테이블의 PK를 참조하고 있기 때문에 참조할게 없으니 나타나는 현상. 이럴 때 참조무결성의 위배한다고 한다.

    DELETE FROM PARENT WHERE P_ID = 'A'

이런식으로 할 때도 에러가 나는데 자식이 해당 값을 참조하고 있기 때문에 참조무결성을 위배한다는 에러가 난다. 

하지만 옵션을 바꿔주면 참조를 하고 있어도 삭제 할 수 있다.

    ALTER TABLE CHILD ADD CONSTRAINT C_FK FOREIGN KEY(P_ID) REFERENCES PARENT(P_ID)
    ON DELETE CASCADE;

이렇게 하면 참조되고 있는 로우를 삭제 했을 때 그것을 참조하고 있는 자식 테이블의 로우들도 같이 삭제가 되게 된다.
CASCADE는 자식까지 같이 삭제되기 때문에 위험할 수 도 있다.

다른 제약 조건.
 1. CASCADE : PARENT 삭제 시 CHILD 같이 삭제
 2. SET NULL : PARENT 삭제시 CHILD의 해당 필드 NULL로 UPDATE
 3. SET DEFAULT : PARENT 삭제 시 CHILD의 해당 필드 DEFAULT 값으로 UPDATE
 4. RESTRICT CHILD 테이블에 PK 값이 없는 경우만 PARENT 삭제
 5. NO ACTION: 참조 무결성 제약조건을 위배하는 액션은 불가.


사실 실무에서는 이런 FK를 설정하는 것에 대해 논란이 좀 있는편.
왜냐하면 테이블이 셀수 없을 정도로 많은 경우도 있고
거기에 담겨 있는 데이터도 엄청 많고
그렇게 되면 하나의 테이블을 참조하는 테이블들이 다수가 되는 상황들도 있따.
이런 상황에서 FK를 설정하게 되면은 테이블 LOCK이 걸린다던지 DML 부하가 엄청나게 되는 상황이 생긴다던지 할 수 있기 때문에 운영을 하는 사람들 입장에서는 FK를 설정하는것을 매우 지양하는 편이라고 한다.


