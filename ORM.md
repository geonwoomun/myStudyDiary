## ORM(Object Relational Mapping)이란 ?

객체와 관계형 데이터베이스의 데이터를 자동으로 매핑(연결) 해주는 것을 말한다.
  - 객체 지향 프로그래밍은 클래스를 사용하고, 관계형 데이터베이스는 테이블을 사용한다.
  - 객체 모델과 관계형 모델 간에 불일치가 존재한다.
  - ORM을 통해 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하여 불일치를 해결한다.
  
데이터베이스 데이터 <- 매핑 -> Object 필드
  - 객체를 통해 간접적으로 데이터베이스 데이터를 다룬다.
 
Persistant API라고도 할 수 있다.
  EX) JPA, Hibernate, Sequelize등
  
  
### ORM의 장 단점

 장점
  - 객체 지향적인 코드로 인해 더 직관적이고 비즈니스 로직에 더 집중할 수 있게 도와준다.
    - ORM을 이용하면 SQL Query가 아닌 직관적인 코드로 데이터를 조작할 수 있어 개발자가 객체 모델로 프로그래밍하는 데
      집중 할 수 있게 해준다. (나는 sql query를 짜는게 더 쉬운거 같기도....)
    - 선언문, 할당, 종료 같은 부수적인 코드가 없거나 급격히 줄어든다.
    - 각종 객체에 대한 코드를 별도로 작성하기 때문에 코드의 가독성을 올려준다.
    - SQL의 절차적이고 순차적인 접근이 아닌 객체 지향적인 접근으로 인해 생산성이 증가한다.
  
  - 재사용 및 유지보수의 편리성이 증가한다.
    - ORM은 독립적으로 작성되어있고, 해당 객체들을 재활용 할 수 있다.
    - 때문에 모델에서 가공된 데이터를 컨트롤러 의해 뷰와 합쳐지는 형태로 디자인 패턴을 견고하게 다지는데 유리하다.
    - 매핑정보가 명확하여, ERD를 보는 것에 대한 의존도를 낮출 수 있다.
    
  - DBMS에 대한 종속성이 줄어든다.
    - 객체 간의 관계를 바탕으로 SQL을 자동으로 생성하기 때문에 RDBMS의 데이터의 구조와 JAVA의 객체지향 모델 사이의 간격을
      좁힐 수 있다. ( 자바스크립트도 마찬가지일듯..?)
    - 대부분 ORM 솔루션은 DB에 종속적이지 않다.
    - 종속적이지 않다는 것은 구현 방법 뿐만 아니라 많은 솔루션에서 자료형 타입까지 유효하다.
    - 프로그래머는 Object에 집중함으로 극단적으로 DBMS를 교체하는 거대한 작업에도 비교적 적은 리스크와 시간이 소요된다.
    - 또한 자바에서 가공할 경우 equals, hashCode의 오버라이드 같은 자바의 기능을 이용할 수 있고, 간결하고 빠른 가공이 가능하다.
    
  단점
    - 완벽한 ORM으로만 서비스를 구현하기가 어렵다.
      - 사용하기는 편하지만 설계는 매우 신중하게 해야한다.
      - 프로젝트의 복잡성이 커질경우 난이도 또한 올라갈 수 있다. ( 얕은 지식으로 하다보니 그냥 SQL QUERY가 더 쉬운거 같기도 하다고 몇번 느낌...)
      - 잘 못 구현된 경우에 속도 저하 및 심각할 경우 일관성이 무너지는 문제점이 생길 수 있다.
      - 일부 자주 사용되는 대형 쿼리는 속도를 위해 SP를 쓰는 등 별도의 튜닝이 필요한 경우가 있따.
      - DBMS의 고유 기능을 이용하기 어렵다(하지만 이건 단점으로만 볼 수 없다. : 특정 DBMS의 고유 기능을 이용하면 이식성이 저하된다.)
      - 프로시저가 많은 시스템에선 ORM 객체 지향적인 장점을 활용하기 어렵다.
        - 이미 프로시저가 많은 시스템에선 다시 객체로 바꿔야하며, 그 과정에서 생산성 저하나 리스크가 많이 발생할 수 있다.
        
  
  ### Sequelize 란?
  
   설치 : npm install --save sequelize
   mysql 쓰려면 npm install -s mysql2 도 같이 설치. (또는 maria DB) 
   그리고 npm i -g sequelize-cli 설치
   
   Sequelize란 nodejs에서 mysql을 쉽게 다를 수 있도록 도와주는 라이브러리이다. (몽고 디비 등도 가능)
   ORM으로 분류가 됨. ORM은 간단하게 객체와 관계형 데이터베이스의 관계를 매핑 해주는 도구.
   
   Sequelize 함수에 
   
   create , findAll , update, destroy 등의 함수가 내장되어있다.
   
   CRUD -> 
   
   Insert 문
   
   SQL : INSERT INTO person(name, age) value ("Tony", 25);
   
   Sequelize : Person.create({
            name: "Tony",
            age : 25
          });
   이런식으로 사용 가능.
   
   SELECT 문
   
   SQL : SELECT * FROM person;
         SELECT * FROM person WHERE name = "Peter";
    
   Sequelize : Person.findAll({});
               Person.findAll({
                  where : {
                    name: "Peter"
                  }
               })
   
    UPDATE 문
    
    SQL : UPDATE person SET name = "Logan" WHERE id = 3;
    
    Sequelize : Person.update({
        name: "Logan",
    },{
      where : {id:3}
    });
    
    Delete 문
    
    SQL : DELETE FROM person WHERE id = 4;
    
    Sequelize : Person.destroy({
      where : {id:4}
    })
    
    이런식으로 사용 가능하다. 물론 모델을 정의하고 불러와서 사용해야한다.
    
