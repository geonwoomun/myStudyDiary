## Class란

Class란 계급, 조직, 분류, 집합.. 이란 뜻

과일이라는 집합, Class 안에 배, 감, 사과, 바나나, 오렌지 등등의 인스턴스들이 있다.

그런가 하면 과일은 음식이라는 범주안에 있으니깐 과일은 음식클래스 안의 하위 클래스라고 할 수 있다.

음식 - 과일 - 배,사과,바나나 등등   음식, 과일 추상적인 개념

반대로 사과, 오렌지 등은 구체적인 물체임. 어떤 공통 속성을 지니며 구체적인 대상을 인스턴스(instance)라고 한다.

순서대로 정의 해야함.

음식 - 과일 - 배, 사과, 

상위 클래스 (superclass)  하위클래스 (subclass)

Array 생성자와 prototype을 합쳐서 Class라고 보고

[1,2,3] 등으로 생성한 객체들을 instance라고 보면 된다.


Array 안에 정의된 method나 properties 등을 static methods 또는 static properties라고 하고 
Array.prototype에 정의된 method 들을 (prototype)methods라고 부른다.


instance에서 methods로는 직접적으로 접근 가능하지만 static인 애들한테는 직접적으로 접근 불가능하고 우회해서는 가능하지만 그래도 정상적인 동작을 기대하기는 어렵다.


    function Person(name, age) {
        this._name = name;
        this._age = age;
    }

    Person.getInformations = function(instance) {
        return {
            name: instance._name,
            age: instance._age
        }
    }

    Person.prototype.getName = function () {
        return this._name;
    }

    Person.prototype.getAge = function() {
        return this._age;
    }

    let mun = new Person('문건우', '25');

    console.log(mun.getName()); // mun.__proto__ 로 접근이 가능하다. __proto__는    생략가능해서 잘된다.
    console.log(mun.getAge());
    // console.log(mun.getInformations(mun));   // 오류 mun에서 Person의 static으로     바로 접근 불가해서
    console.log(Person.getInformations(mun)); // Person에서 바로 사용하면 된다.


## class 상속 구현

 es6이전 버전에서는 상속을 구현하기가 조금 어려운 것 같다. prototype을 통해서 상속을 구현한다. 

    function Person(name, age) { // Person 생성자 
        this.name = name || '이름없음';
        this.age = age || '나이모름'
    }
    Person.prototype.getName = function() {
        return this.name;
    }
    Person.prototype.getAge = function() {
        return this.age;
    }

    // prototype에 getName, getAge를 생성하지 않고 Person 생성자 안에 생성하면 
    // 새로운 인스턴스를 만들 때 마다 함수들이 또 생기고 , 또 생기고 되어서 
    // 메모리 낭비가 일어나게 된다. 많이 생길 수록 훨씬 심해짐.
    // prototype에 만들면 한번만 만들어도 된다.

    function Employee(name, age, position) {
        this.name = name || '이름없음';
        this.age = age || '나이모름';
        this.position = position || '직책모름';
    }

    Employee.prototype = new Person(); 
    Employee.prototype.constructor = Employee;
    Employee.prototype.getPosition = function(){
        return this.position
    }
    // Employee의 prototype에 Person을 넣고 저렇게 되면 prototype이 새로 만들어진거라
    // 처음과 달라지게 된다. 그래서 처음과 똑같이 만들어주려면 constructor에 
    // Employee를 넣어주고 getPosition을 정의해주면 된다.
    // getPosition을 먼저 정의해주면 new Person을 넣을 때 없어지기 때문에 먼저하면 /////안된다

----------------------------------------------------------------------------------

근데 이렇게 하면 Employee의 __proto__에 Person의 name, age가 들어가게되서 만약 Employee의 name을 삭제해 버리면 Person의 name이 나오게 되어버리는 상황이 발생한다.
그래서 Bridge라는 중간 매개체를 만들어주면 해결할 수 있다.

    function Person(name, age) {
        this.name = name || '이름없음';
        this.age = age || '나이모름';
    }
    Person.prototype.getName = function() {
        return this.name;
    }
    Person.prototype.getAge = function() {
        return this.age;
    }

    function Employee(name, age, position) {
        this.name = name || '이름없음';
        this.age = age || '나이모름';
        this.position = position || '직책모름';
    }

    function Bridge() {} // 아무 property도 없는 매게체 생성자
    Bridge.prototype = Person.prototype; 
    Employee.prototype = new Bridge();
    Employee.prototype.constructor = Employee;
    
    Employee.prototype.getPosition = function(){
        return this.position;
    }
    // Bridge의 prototype에 Person.protoype을 넣는다. Employee의 프로토타입에 
    // 브리지를 넣고 
    // Employee 프로토타입의 constructor에 Employee를 넣는다. 
    // 만약 브리지를 안 만들고 바로 Person.prototype을 넣어버리면 
    // Person.prototype과 Employee.prototype이 같은 객체를 가리키게 돼서
    // Employee.prototype에 getposition을 넣어버리면 Person.prototype에도
    // getPosition을 갖게 된다. 그래서 Bridge를 만든다.



----------------------------------------------------------------------------------

    var extendClass = (function() { // 클로저를 활용하여 바로 상속을 시켜주는 함수.
        function Bridge(){}
        return function(Parent, Child) {
            Bridge.prototype = Parent.prototype;
            Child.prototype = new Bridge();
            Child.prototype.constructor = Child;
            Child.prototype.superClass = Parent;
        }
    })();

    function Person(name, age) { // Person 생성자
        this.nameㅡ = name || '이름없음';
        this.age = age || '나이모름';
    }

    Person.prototype.getName = function() {
        return this.name;
    }

    Person.prototype.getAge = function() {
        return this.age;
    }

    function Employee(name, age, position) { // Employee 생성자
        this.superClass(name, age);
        this.position = position || '직책모름';
    }

    extendClass(Person, Employee);
    Employee.prototype.getPosition = function(){
        return this.position;
    }



    // ES6 버전 훨씬 쉬움, 좀 더 객체지향적? 자바적?? 이라고 해야하나

    class Person {  // Person 클래스를 만듦 . 밑에 getName과 getAge 메소드들 정의
        constructor(name, age) {
            this.name = name || '이름없음';
            this.age = age || '나이모름';
        }
        getName () {
            return this.name;
        }
        getAge () {
            return this.age;
        }
    }

    class Employee extends Person {   //Person을 상속 받는 Employee 클래스 정의.    getPosition 메소드 정의
        constructor (name, age, position) {
            super(name, age);
            this.position = position || '직책모름';
        }
        getPosition () {
            return this.position;
        }
    }

    let mun = new Employee('문건우', '25', '스터디장');
    console.log(mun.getAge(), mun.getName(), mun.getPosition());