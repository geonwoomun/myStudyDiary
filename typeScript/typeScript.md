## 타입스크립트에 대해서 공부!!!

typescript는 정적타입 언어이다. 정적 타입 언어와 동적 타입언어는 장단점이 달라서 팀과프로젝트의 성격에 따라 선택해야한다. 작은 규모의 프로젝트에서는 동적타입언어를 사용하고, 큰 규모의 프로젝트에서는 정적타입언어를 사용하기를 추천한다.


### 정적 타입 언어가 생산성이 높은 이유

정적 타입 언어의 코드는 타입으로 서로 연결되어 있다. 덕분에 연관된 코드 간의 이동이 쉽고, 변수명이나 함수명을 변경하는 등의 리팩터리도 쉽다. 임포트 하지 않고 코드를 작성해도 단축키 한 번이면 IDE가 필요한 임포트 코드를 자동으로 넣어주고. 함수를 호출하기 위해 함수 이름과 괄호를 입력하면 함수의 매개변수 종류와 반환값의 타입을 확인 할 수 있다. 속성값의 종류가 많은 객체라 하더라도 객체 이름과 점을 입력하면 속성값 목록을 확인할 수 있다. 철자가 틀리거나 숫자 타입의 변수에 문자열을 입력하면 IDE가 즉시 알려준다.

타입스크립트는 마이크로소프트에서 개발하고 있고 꾸준히 업데이트 된다. 큰 생태계를 가지고 있고 마이크르소프트에서 개발하고 있는 IDE인 VSCODE와 굉장히 궁합이 잘 맞는다. 


타입을 명시적으로 입력하지 않아도 타입스크립트가 자동으로 타입을 인식하는 기능을 타입 추론이라고 한다.(type inference) 타입 추론 덕분에 기존의 자바스크립트 코드를 크게 변경하지 않고도 타입스크립트를 비교적 쉽게 적용할 수 있다.

    let v1: number | string = 123;
    v1 = 'abc';

이렇게 하면 v1은 number 또는 string 타입이라는 뜻이라 에러가 나지 않음.

    const size: number = 123;
    const isBig: boolean = size >= 100;
    const msg: string = isBig ? '크다' : '작다';

    const values: number[] = [1,2,3];
    const value2: Array<number> = [1,2,3];
    values.push('a'); // 타입에러 value는 숫자배열이므로 'a' 같은 string push 불가능

    const data: [string, number] = [msg, size];
    data[0].substr(1);
    data[1].substr(1); // 타입에러 size는 숫자이므로 배열의 메소드 호출 불가

자바스크립트에서 값으로 존재하는 null과 undefined는 타입스크립트에서 각각 타입으로 존재

    let v1: undefined = undefined;
    let v2: null = null;
    v1 = 123; // 에러

    let v3: number | undefined = undefined;
    v3 = 123;

undefined와 null 타입은 다른 타입과 함께 유니온 타입으로 정의할 때 많이 사용된다.


#### 문자열 리터럴과 숫자 리터럴 타입
타입스크립트에서는 문자열 리터럴과 숫자 리터럴을 타입으로 정의 가능!!

    let v1: 10 | 20 | 30;
    v1 = 10;
    v1 = 15; // 타입에러 v1은 오직 10,20,30만 가질 수 있는 타입!

    let v2: '경찰관' | '소방관';
    v2 = '의사'; // 타입에러

#### any 타입
any 타입은 모든 종류의 값을 허용하는 타입이다.

    let value: any;
    value = 123;
    value = '456';
    value = () => {};

any 타입에는 숫자와 문자열뿐만 아니라 함수도 입력될 수 있다. any 타입은 기존에 자바스크립트 코드로 작성된 프로젝트를 타입스크립트로 포팅하는 경우에 유용하게 사용될 수 있다. 기존 프로젝트의 모든 코드에 타입을 한번에 정의하는 것은 부담되기 때문에 타입 에러가 나는 부분은 임시로 any 타입으로 정의하면 된다. any 타입은 실제로 타입을 알 수 없는 경우나 타입 정의가 안 된 외부 패키지를 사용하는 경우에도 사용하기 좋다. 단, any 타입을 남발하면 타입스크립트를 사용하는 의미가 퇴색되기 때문에 되도록 피하는 게 좋다.

#### void와 never 타입

아무 값도 반환하지 않고 종료되는 함수의 반환 타입은 void 타입으로 정의할 수 있다. 그리고 항상 예외가 발생해서 비정상적으로 종료되거나 무한 루프 때문에 종료되지 안흔 함수의 반환 타입은 never 타입으로 정의할 수 있다.

#### object 타입 

object 타입은 자바스크립트에서 일반적으로 사용되는 객체의 타입이다.
속성 정보를 포함해서 타입을 정의하기 위해서는 interface를 사용해야한다.

#### 교차 타입과 유니온 타입

여러 타입의 교집합과 합집합을 각각 교차(intersection) 타입과 유니온(union) 타입으로 표현할 수 있다. 교차 타입은 & 기호로 정의하고, 유니온 타입은 | 기호로 정의한다.

#### type 키워드로 타입에 별칭 주기

type 키워드를 사용해서 타입에 별칭을 줄 수 있다. 타입 별칭은 타입을 선언할 때 편리하게 사용할 수 있다.

    type Width = number | string;
    let width: Width;

#### 열거형 타입
열거형 타입은 enum 키워드를 사용해서 정의한다. 열거형 타입의 각 원소는 값으로 사용될 수 있고, 타입으로 사용 될 수도 있다.

    enum Fruit {
        Apple,
        Banana,
        Orange,
    }
    const v1: Fruit = Friut.Apple; // 애플을 값으로 사용
    const v2: Fruit.Apple | Fruit.Banana = Fruit.Banana; //타입으로 사용

명시적으로 원소의 값을 입력하는 코드

    enum Fruit {
        Apple,
        Banana = 5,
        Orange,
    }
    console.log(Fruit.Apple, Fruit.Banana, Fruit.Orange); // 0, 5, 6

열거형 타입의 첫번째 원소에 값을 할당하지 않으면 자동으로 0이 할당 됨.
열거형 타입의 각 원소에 숫자 또는 문자열을 할당할 수 있다. 명시적으로 값을 입력하지 않으면 이전 원소에서 1만큼 증가한 값이 할당된다.

#### 함수 타입

함수의 타입을 정의하기 위해서는 매개변수 타입과 반환 타입이 필요하다. 콜론을  이용해서 매개변수 타입과 반환 타입을 정의할 수 있다.

    function getInfoText(name: string, age: number): string {
        const nameText = name.substr(0, 10);
        const ageText = age >= 35 ? 'senior' : 'junior';
        return `name: ${nameText}, age: ${ageText}`;
    }

    const v1: string = getInfoText('mike', 23);
    const v2: string = getInfoText('mike', '23'); // 타입에러
    const v3: number = getInfoText('mike', 23); // 타입에러

매개변수와 반환 타입 정의. 
자바스크립트에서 함수는 일급이므로 함수를 변수에 저장할 수 있다. 함수를 저장할 변수의 타입은 다음과 같이 화살표 기호를 이용한다.

    const getInfoText: (name:string, age:number) => string = function(name, age) {

    }
 
함수를 구현하는 코드에서는 매개변수 타입과 반환 타입을 작성하지 않아도 된다. 타입스크립트는 오른쪽 코드에서 name과 age가 각각 문자열과 숫자라는 것을 안다. 그니깐. name:string, 과 age:number를 받아서 string을 return하는 함수이다~ 라는 걸 알리고 = 부터 함수 정의하는 것인거 같다.


#### 선택 매개변수
선택 매개변수는 반드시 입력하지 않아도 되는 매개변수다. 매개변수 이름 오른쪽에 물음표 기호를 입력하면 선택 매개변수가 된다.

    function getInfoText(name: string, age: number, language?: string): string {
        const nameText = name.substr(0, 10);
        const ageText = age >= 35 ? 'senior' : 'junior';
        const languageText = language ? language.substr(0, 10) : '';
        return `name: ${nameText}, age: ${ageText}, language: ${languageText}`;
    }
    getInfoText('mike', 23, 'ko');
    getInfoText('mike', 23);
    getInfoText('mike', 23, 123); // 타입에러

language를 선택 매개변수로 정의했다. 함수 호출 시 선택 매개변수의 인수를 입력하지 않아도 타입 에러가 발생하지 않는다. ?를 붙였기 때문에! 만약 인수의 존재여부를 검사하지 않고 substr 메서드를 호출하면 타입에러가 발생!! 
language에 해당하는 인수는 입력하지 않아도 괜찮지만 입력하는 경우에는 반드시 정의된 타입을 만족하는 값을 입력해야한다.

선택 매개변수 오른쪽에 필수 매개변수가 오면 컴파일 에러가 발생한다.

오류 없이 구현하려면 undefined를 사용해야한다.

    function getInfoText(
        name: string,
        language: string | undefined,
        age: number,
    ): string {
        .......
    }
    getInfoText('mike', undefined, 23);

유니온 타입을 이용하여 undefined도 입력 할 수 있도록 하였다. 함수 호출 시에는 중간에 undefined를 입력할 수 있다. 컴파일 에러가 발생하지는 않지만 사용성과 가독성이 좋지 않다. 매개변수의 개수가 많은 경우에는 비구조화 문법을 이용해서 명명된 매개변수로 작성하는게 좋다. 타입 정의와 함께 명명된 매개변수를 작성하는 방법은 뒤에서 설명~~


#### 매개변수의 기본값 정의하기

    function getInfoText(
        name: string,
        age: number = 15,
        language = 'korean',
    ): string {
        ...
    }
    console.log(getInfoText('mike'));
    console.log(getInfoText('mike', 23));
    console.log(getInfoText('jone', 36, 'english'));

    const f1: (
        name: string,
        age?: number,
        language?: string,
    ) => string = getInfoText;

타입 오른쪽에 = 기호를 사용해서 매개변수의 기본값을 정의할 수 있다. 
타입을 입력하지 않아도 매개변수의 기본값을 정의 할 수 있다. 기본값이 문자열이기 때문에 매개변수 language 타입도 문자열이 된다. 기본값이 있는 매개변수는 선택 매개변수다.

#### 나머지 매개변수

나머지 매개변수의 타입을 정의하는 코드다.

    function getInfoText(name: string, ...rest: string[]): string {
        // ...
    }

나머지 매개변수는 배열로 정의 할 수 있다.

#### this 타입

함수의 this 타입을 정의하지 않으면 기본적으로 any타입이 사용된다. 앞에서도 말했듯 any 타입은 가급적 사용하지 않는게 좋으므로 this 타입을 정의해 두는게 좋다.

    function getParam(index: number): string {
        const params = this.splt(',');
        if (index < 0 || params.length <= index) {
            return '';
        }
        return this.split(',')[index];
    }

split이라고 쓰려 했는데, splt으로 오타냈는데, 하지만 any 타입이 되었기 때문에 컴파일 에러가 발생하지 않는다.
함수의 this 타입은 다음과 같이 첫 번째 매개변수 위치에서 정의할 수 있다.

    function getParam(this: string, index: number): string {
        const params = this.splt(','); // 타입에러
        // ...
    }

매개변수 index는 두 번째 자리에 정의되어 있다. 하지만 this 타입은 매개변수가 아니므로 index가 첫 번째 매개변수가 된다. this의 타입을 정의했기 때문에 splt 오타에서 타입에러가 발생한다.

원시 타입에 메서드 추가하기

원시(primitive) 타입에 메서드를 등록할 때는 인터페이스를 이용한다. 다음은 문자열 타입에 메서드를 추가하는 코드다.

    interface String {
        getParam(this: string, index: number): string;
    }
    String.prototype.getParam = getParam;
    console.log('asdf, 1234, ok'.getParam(1));

인터페이스를 이용해서 이미 존재하는 문자열 타입에 getParam 메서드를 추가한다. 문자열의 프로토타입에 우리가 작성한 함수를 등록한다. 이제 문자열에 등록된 getParam 메서드를 호출할 수 있다.

##### 함수 오버로드: 여러 개의 타입 정의하기

자바스크립트는 동적 타입 언어이므로 하나의 함수가 다양한 매개변수 타입과 반환 타입을 가질 수 있다. 함수 오버로드(overload)를 사용하면 하나의 함수에 여러 개의 타입을 정의할 수 있다.
add 함수를 만들어 다음과 같은 일을 처리하고 싶다고 가정해 보자.
 두 매개변수가 모두 문자열이면 문자열을 반환한다.
 두 매개변수가 모두 숫자이면 숫자를 반환한다.
 두 매개변수를 서로 다른 타입으로 입력하면 안 된다.

다음은 함수 오버로드를 사용하지 않고 이 기능을 구현한 코드다.

    function add(x: number | string, y: number | string): number | string {
        if (typeof x === 'number' && typeof y === 'number') {
            return x + y;
        } else {
            const result = Number(x) + Number(y);
            return result.toString();
        }
    }

    const v1: number = add(1, 2); // 타입에러
    console.log(add(1, '2'));

모든 매개변수와 반환값의 타입은 문자열이거나 숫자이다. 모든 매개변수가 숫자이면 반환값도 숫자이지만 타입 에러가 발생한다. 두 매개변수의 타입이 달라도 타입 에러가 발생하지 않는다. 이는 1번에서 함수의 타입을 구체적으로 정의하지 못 했기 때문이다.
다음과 같이 함수 오버로드를 사용하면 이 조건을 만족하는 함수 타입을 저의 할 수 있다.

    function add(x: number, y: number): number;
    function add(x: string, y: string): string;

    function add(x: number | string, y : number | string ): number | string {
        // ...
    }
    const v1: number = add(1,2);
    console.log(add(1, '2')); // 타입 에러

매개변수와 반환 타입의 모든 가능한 조합을 정의한다. 실제 구현하는 쪽에서 정의한 타입은 함수 오버로드의 타입 목록에서 제외된다. 두 매개변수의 타입이 숫자이면 반환 타입도 숫자이므로 타입 에러가 발생하지 않는다. 두 매개변수의 타입이 다르면 타입 에러가 발생한다.

#### 명명된 매개변수

명명된 매개변수의 타입을 정의하는 방법을 알아보자. 다음은 명명된 매개변수를 사용한 코드다. 

    function getInfoText({
        name,
        age = 15,
        language,
    }: {
        name: string;
        age?: number;
        language?: string;
    }): string {
        const nameText = name.substr(0, 10);
        const ageText = age >= 35 ? 'senior' : 'junior';
        return `name: ${nameText}, age: ${ageText}, language: ${language}`;
    }

우선 매개변수의 이름을 정의한다. 매개변수의 기본값이 있따면 여기서 같이정의. 앞에 나열된 모든 매개변수에 대한 타입을 정의.
명명된 매개변수의 타입을 다른 코드에서도 재사용하려면 다음과 같이 인터페이스를 사용한다.

    interface Param {
        name: string;
        age?: number;
        language?: string;
    }

    function getInfoText({ name, age = 15, language } : param): string {
        //...
    }

명명된 매개변수의 타입을 인터페이스로 정의했다. Param 인터페이스를 사용한다. 인터페이스에 대한 자세한 설명은 다음에.
    