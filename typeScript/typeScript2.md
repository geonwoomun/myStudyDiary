## 타입스크립트 인터페이스부터

### 인터페이스

자바에서의 인터페이스는 클래스를 구현하기 전에 필요한 메서드를 정의하는 용도로 쓰이지만, 타입스크립트에서는 좀 더 다양한 것들을 정의하는 데 사용된다. 타입스크립트에서 인터페이스로 정의할 수 있는 타입의 종류와 인터페이스로 타입을 정의하는 방법을 알아보자.

#### 인터페이스로 객체 타입 정의하기
인터페이스로 객체의 타입을 정의하는 방법을 알아보자. 인터페이스로 타입을 정의할 때는 interface 키워드를 사용한다. 인터페이스로 객체의 타입을 정의하는 코드다.

    interface Person {
        name: string;
        age: number;
    }

    const p1: Person = { name: 'mike', age: 23};
    const p2: Person = { name: 'mike', age: 'ten'}; // 타입 에러

Person 인터페이스를 정의했다. 객체 내부에 존재하는 각 속성의 타입을 정의한다. p2는 age속성 타입을 만족하지 못해 에러가 발생. 이처럼 하나 이상의 속성 타입을 만족하지 못하면 타입 에러가 발생한다.

#### 선택 속성
선택 속성은 객체에서 없어도 되는 속성을 말한다 인터페이스에서 선택 속성은 다음과 같이 물음표 기호를 사용한다.

    interface Person {
        name: string;
        age?: number;
    }

    const p1: Person = {name: 'mike'};

반면, 다음과 같이 물음표 기호를 사용하지 않고 undefined를 유니온 타입으로 추가하면 선택 속성과 달리 명시적으로 age 속성을 입력해야 한다.

    interface Person {
        name : string;
        age : number | undefined;
    }
    const p1: Person = { name: 'mike'};
    const p2: Person = { name: 'mike', age: undefined};

선택 속성과 달리 명시적으로 age속성을 입력하지 않으면 타입 에러가 발생한다.

##### 읽기 전용 속성
객체에서 읽기 전용 속성은 값이 변하지 않는 속성을 말한다. 인터페이스에서 읽기 전용 속성은 다음과 같이 readonly 키워드를 사용한다.

    interface Person {
        readonly name: string;
        age?: number;
    }

    const p1: Person  = {
        name: 'mike',
    };

    p1.name = 'jone'; // 컴파일 에러

당연하게도 p1 변수를 정의하는 시점에는 값을 할당할 수 있다. 하지만 읽기 전용 속성의 값을 수정하려고 하면 컴파일 에러가 발생한다.

##### 정의되지 않은 속성값에 대한 처리
보통은 객체가 인터페이스에 정의되지 않은 속성값을 갖고 있어도 할당이 가능하다. 단, 리터럴로 값을 초기화하는 경우에는 인터페이스에 정의되지 않은 속성갑시 있으면 타입에러가 발생한다.

    interface Person {
        readonly name: string;
        age?: number;
    }

    const p1: Person = {
        name: 'mike',
        birthday: '1997-01-01', // 타입에러
    };

    const p2 = {
        name: 'mike',
        birthday: '1997-01-01',
    };

    const p3: Person = p2;

Person 인터페이스에 정의되지 않은 속성을 리터럴로 입력하므로 타입 에러가 발생.
p2 객체에는 Person 인터페이스에서 정의되지 않은 속성이 있다.
p3에서 p2가 Person에 정의되지 않은 속성을 포함하지만 타입에러가 발생하지 않는다. 이는 p3 타입이 p2 타입을 포함하는 더 큰 타입이기 때문이다. 나중에 '타입호환성'에서 확인 가능하다.
리터럴에서 에러가 발생하는 이유는 프로그래머의 실수일 확률이 높기 때문이며, 이는 타입스크립트의 편의 기능이다.

##### 9.3.2 인터페이스로 정의하는 인덱스 타입

인터페이스에서 속성 이름을 구체적으로 정의하지 않고 값의 타입만 정의하는 것을 인덱스 타입이라고 한다.

    interface Person {
        readonly name: string;
        age: number;
        [key: string] : string | number;
    }
    const p1: Person = {
        name: 'mike',
        birthday: '1997-01-01',
        age: '25', // 타입에러
    }

문자열로 된 모든 속성 이름에 대해 값이 문자열 또는 숫자라고 정의했다. brithday 속성을 입력해도 컴파일 에러가 발생하지 않는다. 단, age는 명시적으로 숫자로 정의했기 때문에 문자열을 입력하면 타입에러가 발생한다.

##### 여러 개의 인덱스를 정의하는 경우

자바스크립트에서는 속성 이름에 숫자와 문자열을 사용할 수 있다. 그리고 속성 이름에 숫자를 사용하면 문자열로 변환된 후 사용된다. 따라서 타입스크립트에서는 수자인 속성 이름의 값이 문자열인 속성 이름의 값으로 할당 가능한지 검사한다.


### 그 밖에 인터페이스로 할 수 있는 것

함수 타입 정의하기

    interface GetInfoText {
        (name: string, age: number): string;
    }

    const getInfoText: GetInfoText = function(name, age) {
        const nameText = name.substr(0, 10);
        const ageText = age >= 35 ? 'senior' : 'junior';
        return `name: ${nameText}, age: ${ageText}`;
    };

인터페이스로 함수를 정의할 때는 속성 이름 없이 정의한다. 자바스크립트에서는 함수도 속성값을 가질 수 있다. 인터페이스로 함수 타입을 정의할 때 다음과 같이 함수의 속성값도 같이 정의할 수 있다.

    interface GetInfoText {
        (name: string, age: number): string;
        totalCall: number;
    }

    const getInfoText: GetInfoText = function(name, age) {
        getInfoText.totalCall += 1;
        console.log(`totalCall: ${getInfoText.totalCall}`);
        // ...
    };
    getInfoText.totalCall = 0;

숫자 타입의 속성값을 정의했다. 타입스크립트는 totalCall 속성값이 숫자라는 것을 안다.

##### 인터페이스로 클래스 구현하기
다음과 같이 인터페이스는 클래스로 구현될 수 있다.

    interface Person {
        name: string;
        age: number;
        isYoungerThan(age: number): boolean;
    }

    class SomePerson implements Person {
        name: string;
        age: number;
        constructor(name: string, age: number) {
            this.name = name;
            this.age = age;
        }
        isYoungerThan(age: number){
            return this.age < age;
        }
    }

세 개의 속성을 가진 인터페이스를 정의했다. implements 키워드를 사용해서 인터페이스를 구현할 수 있다. 인터페이스에서 정의한 세 속성을 클래스 내부에서 구현하고 있다. 만약 하나의 속성이라도 구현하지 않으면 컴파일 에러가 발생한다. name, age 속성은 필숫값이기 때문에 생성자에게 값을 할당하지 않으면 컴파일 에러가 발생한다.

##### 인터페이스 확장하기

다음과 같이 인터페이스를 확장해서 새로운 인터페이스를 만들 수도 있다.
    
    interface Person {
        name: string;
        age: number;
    }

    interface Korean extends Person {
        isLiveInSeoul: boolean;
    }
    /*
    interface Korean {
        name: string;
        age: number;
        isLiveInSeoul: boolean
    }
    */

Person 인터페이스를 확장해서 Korean인터페이스를 만든다. 확장해서 만들어진 Korean 인터페이스는 밑에 직접 작성한것과 같이 된다.

extends를 여러개해서 확장할 수도 있고, 인터페이스를 교차타입을 이용하여 합칠 수도 있다.

    interface Person {
        name: string;
        age: number;
    }
    interface Product {
        name: string;
        price: number;
    }

    type PP = Person & Product;
    const pp: PP = {
        name: 'a',
        age: 23,
        price: 1000,
    };

type PP는 합쳐진 두 인터페이스 Person과 Proudct의 모든 속성값을 포함한다. 교차타입이 집합에서의 교집합과 같은 기능을 한다고 했는데, PP 타입이 name 속성값만 포함하는게 아니라서 헷갈릴 수도 있다. 이는 속성의 교집합이 아니라 타입이 가질수 있는 값의 집합에 대한 교집합이기 때문이다. 값의 집합에 대해서는 뒤에서 다룰 타입호환성에서 설명.


### 9.4 타입 호환성

타입호환성은 어떤 타입을 다른 타입으로 취급해도 되는지 판단하는 것이다. 정적 타입 언어의 가장 중요한 역할은 타입 호환성을 통해 컴파일 타임에 호환되지 않는 타입을 찾아내는 것이다. 어떤 변수가 다른 변수에 할당 가능하기 위해서는 해당 변수의 타입이 다른 쪽 변수의 타입에 할당 가능해야 한다.
할당 기능은 다음과 같이 서브타입으로 표현되기도 한다.
 - 타입 A가 타입 B에 할당 가능하다 = 타입 A는 타입 B의 서브타입이다.

할당 가능을 판단할 때는 타입이 가질 수 있는 값의 집합을 생각하면 이해하기 쉽다. A타입의 값의 집합이 B타입의 값의 집합에 포함되면 A타입은 B타입에 할당 가능하다.

##### 숫자와 문자열의 타입 호환성
숫자와 문자열 타입은 서로 포함 관계에 있지 않기 때문에 서로 할당 가능하지 않는다. 반면 숫자의 집합은 number | string 값의 집합에 포함되기 때문에 숫자는 number | string 타입에 할당이 가능하다.

수자와 문자열의 타입 호환성을 코드로 살펴보자.

    function func1(a: number, b: number | string) {
        const v1: number | string = a;
        const v2: number = b;
    }
    function func2(a: 1|2) {
        const v1: 1 | 3 = a;
        const v2: 1| 2 | 3 = a;
    }

숫자는 number | string 타입에 할당 가능하다. number | string 타입은 숫자에 할당 가능하지 않다. 1 | 2 타입은 1 | 3 타입에 할당 가능하지 않기 때문에 타입 에러가 발생한다. 1 | 2 타입은 1 | 2 | 3 타입에 할당 가능하다.

##### 인터페이스의 타입 호환성

타입스크립트는 값 자체의 타입보다는 값이 가진 내부 구조에 기반해서 타입 호환성을 검사한다. 이를 덕 타이핑 또는 구조적 타이핑이라 부른다. 타입스크립트가 구조적 타이핑을 도입한 이유는 동적 타입 언어인 자바스크립트를 기반으로 하기 때문이다.
인터페이스 A가 인터페이스 B로 할당 가능하려면 다음 조건을 만족해야한다.

 B에 있는 모든 필수 속성의 이름이 A에도 존재해야한다.
 같은 속성 이름에 대해, A의 속성이 B의 속성에 할당 가능해야한다.

다음 코드에서 정의하는 두 인터페이스의 타입 호환성을 살펴보자.

    interface Person {
        name: string;
        age: number;
    }
    interface Product {
        name: string;
        age: number;
    }
    const person: Person = { name: 'mike', age: 23};
    const product: Product = person;

Person과 Product는 이름이 다르지만 모든 속성 이름과 타입이 같다. 타입 이름은 다르지만 내부 구조가 같기 때문에 Person과 Product는 서로 할당이 가능하다.
많은 수의 정적 타입 언어에서는 할당 가능하지 않지만 타입스크립트는 구조적 타이핑을 사용하기 때문에 할당 가능하다.

만약 Person에 age 속성이 없다면 Person은 Product에 할당 가능하지 않다. 속성이 많을 수록 타입에 더많은 제약을 가하는 것이고, 이는 해당 타입의 값의 집합이 작아지는 것을 의미한다.

다음과 같이 Persond의 age가 선택 속성이라면 Person은 Product에 할당 가능하다.

    interface Person {
        name: string;
        age? : number;
    }
    // ...
    const person: Person = {
        name: 'mike',
    };
    const product : Product = person;

age가 선택 속성이면 Person 값의 집합은 Product 값의 집합보다 커진다. 따라서 Person은 Product에 할당가능하지 않다. 반대로 Product의 agㄷ가 선택 속성이면 Product 값의 집합이 Person 값의 집합보다 커진다. 따라서 다음 코드에서 Person의 Product에 할당 가능해진다.

    interface Person {
        name: string;
        age: number;
    }
    interface Product {
        name: string;
        age?: number;
    }

추가 속성과 유니온 타입은 타입 호환성에 영향을 미친다. 추가 속성이 있으면 값의 집합은 더 작아진다. 반대로 유니온 타입이 있으면 값의 집합은 더 커진다.
다음은 Person에 속성을 추가하고, Product의 age 속성을 유니온 타입으로 변경한 코드다.

    interface Person {
        name: string;
        age: number;
        gender: string;
    }

    interface Product {
        name: string;
        age: number | string;
    }

추가 속성이 있으면 값의 집합은 더 작아지므로 Person을 Product에 할당하는데 문제가 되지 않는다. 속성 타입의 범위가 넓어지면 값의 집합은 더 커진다. 따라서 Person이 Product에 할당 가능하다는 사실에는 변합이 없다.
Person의 집합이 Product의 집합에 포함되기 때문에 Person은 Product에 할당 가능하다.

##### 함수의 타입 호환성
함수는 호출하는 시점에 문제가 없어야 할당 가능하다. 다음은 함수 타입 A가 함수 타입B로 할당 가능하기 위한 조건이다.

 A의 매개변수 개수가 B의 매개변수 개수보다 적어야한다.
 같은 위치의 매개변수에 대해 B의 매개변수가 A의 매개변수로 할당 가능해야한다.
 A의 반환값은 B의 반환값으로 할당 가능해야 한다.

    type F1 = (a: number, b: string) => number;
    type F2 = (a: number) => number;
    type F3 = (a: number) => number | string;
    let f1: F1 = (a, b) => 1;
    let f2: F2 = a => 1;
    let f3: F3 = a => 1;
    f1 = f2;
    f2 = f1; // 타입에러
    f2 = f3; // 타입에러

f2보다 f1의 매개변수 개수가 더 많으므로 F1은 F2로 할당가능하지 않다. F3의 반환 타입은 F2의 반환 타입으로 할당 가능하지 않으므로 F3는 F2로 할당 가능하지 않다.

좀 더 실용적인 예로 배열의 map 메서드를 사용하는 코드를 살펴보자.

    function addOne(value: number) {
        return value + 1;
    }
    const result = [1,2,3].map<number>(addone);
    // (value: number, index: number. array: number[]) => number

addOne 함수는 map 메서드의 매개변수로 할당 가능하다. 참고로 map 메서드의 제네릭으로 입력한 number는 매개변수 함수의 반환 타입을 의미한다. 제네릭은 뒤에서 설명. 주석은 map 메서드가 입력 받는 함수의 타입을 의미하며, addOne 함수는 이 타입에 할당 가능하다.
앞에서의 조건을 배열의 map 메서드 입장에서 생각해 보자.
