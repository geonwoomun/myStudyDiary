# Do it 타입스크립트 프로그래밍을 읽으며 공부할 것이다.

세 종류의 자바스크립트 : 웹 브라우저에서 동작하는 표준 자바스크립트인 ES5, 2015년부터 매년 새로운 버전을 발표하는 ESNext, 그리고 EXNext에 기능을 추가한 타입스크립트

타입스크립트는 마이크로소프트가 개발하고 유지하고 있는 오픈소스 프로그래밍 언어로 2012년 말 처음 발표. C#언어를 창시한 아네르스 하일스베르가 핵심 개발자로 참여하고 있다.

타입스크립트 컴파일러는 문제의 원인이 어디에 있는지 친절하게 알려준다.

트랜스파일
ESNext 자바스크립트 소스코드는 바벨이라는 트랜스파일러르 거치면 ES5 자바스크립트 코드로 변환된다. 바벨과 유사하게 타입스크립트 코드는 TSC라는 트랜스파일러를 통해 ES5 자바스크립트 코드로 변환된다.
트랜스파일러란 어떤 프로그래밍 언어로 작성된 소스코드를 또 다른 프로그래밍 언어로 된 소스코드로 바꿔주는 프로그램을 말한다.

### tsconfig.json 살펴보기

  module 키 : 동작 대상 플랫폼이 웹 브라우저인지 노드제이에스인지를 구분해 그에 맞는 모듈 방식으로 컴파일하려는 목적으로 설정
  > 웹브라우저에서 동작 : amd
  > nodejs에서 동작 : commonjs


  moduleResolution 키 : module 키의 값이 commonjs이면 nodejs에서 동작하는 것을 의미하므로, moduleResolution 키 값은 항상 node로 설정. 반면에 module 키값이 amd이면 moduleResolution 키 값은 classic으로 설정

  target 키 : 트랜스파일할 대상 자바스크립트의 버전을 설정. 대부분 es5를 키값으로 설정. 

  baseUrl과 outDir 키 : baseUrl과 outDir 키에는 트랜스파일된 ES5 자바스크립트 파일을 저장하는 디렉터리를 설정. 현재 디렉터리를 의미하는 '.'로 baseUrl 키값을 설정하는 것이 보통. OutDir키는 baseDir을 기준으로 했을 때 하위 디렉터리의 이름. 

  paths 키 : import 문에서 from부분을 해석할 때 찾아야 하는 디렉터리를 설정. import 문이 찾아야하는 소스가 외부 패키지이면 node_modules 디렉터리에서 찾아야 하므로 키값에 node_modules/*도 포함.

  sourceMap 키 : true 이면 트랜스파일 디렉터리에는 js 파일 이외에도 js.map 파일이 만들어진다. 이 소스맵 파일은 변환된 자바스크립트 코드가 타입스크립트 코드의 어디에 해당하는지를 알려준다. 주로 디버깅할 때 사용.

  downlevelIteration : generator가 정상적으로 동작하기 위해 true 로 해야함.


## 3. 타입과 주석

타입스크립트 타입 -> number, boolean, string, object

타입스크립트는 자바스크립트 변수 선언문을 확장해 다음과같은 형태로  타입을 명시할 수 있다. 이를 타입주석이라고 한다.

    let 변수이름: 타입 = 초기값
    const 변수이름: 타입 = 초기값

타입추론 : 자바스크립트와 호환성을 위해 타입 주석 부분을 생략할 수 있다. 타입 주석 없이 그냥 있는 코드는 = 오른쪽 값에 따라 변수의 타입을 정한다.

any 타입 : 어떤 종류의 값도 저장가능 -> 남발하면 타입스크립트를 사용하는 의미가 없음.

undefined 타입: 자바스크립트에서 undefined는 값. 그러나 타입스크립트에서는 undfined는 타입이기도 하고 값이기도 하다.

any는 모든 타입의 최상위 타입, undefined는 모든 타입의 최하위 타입이다.

템플릿 문자열: `${변수이름}`

인터페이스 선언문
    
    interface 인터페이스이름 {
        속성이름[?]: 속성 타입
    }

선택 속성 구문: 어떤 속성은 있어도 되고 없어도 되는 형태로 만들고 싶을 때 선택속성을 넣는다. 속성 이름 뒤에 물음표 기호를 붙여서 만든다.

    interface IPerson2 {
        name: string, // 필수
        age: number, // 필수
        etc?: boolean // 선택
    }

익명인터페이스 : interface 키워드도 사용하지 않고 인터페이스의 이름도 없는 인터페이스를 만들 수 있다. 이를 익명 인터페이스라고 한다.

    let ai: {
        name: string, 
        age: number, 
        etc?: boolean
    } = {name: 'jack', age: 32};
이렇게 하는거 보다 만들어 놓는게 재사용성도 높일 수 있고 좋을거 같다.


인터페이스나 클래스를 사용해 관련된 정보를 묶어 새로운 타입으로 표현 이를 구조화라고 한다.

    export interface IPerson {
        name: string,
        age: number
    }

    export interface ICompany {
        name: string,
        age: number,
    }

구조화된 데이터를 분해하는 것을 비구조화라고 한다.
비구조화 할당

    let jack: IPerson = {name: 'Jack', age: 32};
    let {name, age} = jack;


잔여 연산자 : ...연산자, 스프레드 연산자,  사용되는 위치에 따라 잔여 연산자 혹은 전개 연산자로 불림.

    let address: any = {
        country: 'Korea',
        city: 'Seoul',
        address1: 'Gangnam-gu',
        address2: 'Sinsa-dong 123-456',
        address3: '789 street, 2 Floor ABC building'
    }

    const {country, city, ...detail} = address;
    console.log(detail);

address의 country와 city를 제외한 나머지를 detail이라는 변수로 받은 것.

전개연산자: 

    let part1 = {name: 'jane'}, part2 = {age: 22}, part3 = {city: 'Seoul', country: 'Kr'};
    let merged = {...part1, ...part2, ...part3};
    console.log(merged);

이러면 merged 안에 모든 속성들이 담긴다.
