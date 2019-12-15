# ESLint 란? 

ESLint란, 2013년 6월에 Nicholas C. Zakas가 처음 만든 오픈소스 Javascript Linting 유틸리티이다. 코드 Linting이란 특정 스타일 규칙을 준수하지 않는는 문제가 있는 소스코드를 찾는데 사용되는 방식을 말하며, Linter는 이러한 Linting을 수행하는 도구이다.

대부분의 프로그래밍 언어에는 컴파일하는 과정이 있어서 컴파일시 수행되는 Linter가 내장되어 있다.

그러나 역동적이고 느슨한 언어인 JavaScript는 이러한 Linter가 존재하지 않음.
JavaScript는 별도의 컴파일 과정이 없고, Node나 Browser에서 바로 실행되기 때문.

따라서 일반적인 JavaScript 개발시 구문 오류나 기타 오류를 찾기 위해서는 실제 실행까지 시켜봐야한다.
하지만 ESLint 같은 Linting 도구를 사용하면 JavaScript를 실행하지 않고도 기본적인 문제를 발견할 수 있다.

### 사용환경

ESLint를 사용할 수 있는 환경은 두가지이다.
첫번째로 JavaScript 개발시 사용되는 IDE/Editor에 지원되는 ESLint 플러그인을 설치하는 것이고,

두번째로는 webpack을 사용하며 webpack 번들링시 eslint-loader를 추가하여 사용하는 것.

### 환경설정

ESLint를 사용할 때 환경 설정 파일이 존재한다.
이 환경 설정 파일을 참고하여 Linter는 소스코드 체크를 수행.
환경설정은 IDE/Editor에 따라 별도의 UI로 제공되는 경우도 있고,
환경설정 파일 내용을 오픈 소스로 공개하여 자신들만의 ESLint 환경 설정을 배포하기도 한다.
자신만의 Linting 설정을 하고자 한다면 ESLint 공식 홈페이지에서 확인하여 설정할 수 있다.

eslint를 쓰면 코드를 깔끔하게 통일 시킬 수 있고, 팀원들에게 규칙을 강제할 수 있다.
그래서 원래는 사람마다 코드 스타일이 달라서 중구난방으로 되던 코드들이 하나로 통일 되어서 깔끔해질 수 있다. 그러면 보기에 좋고 유지보수에 좋아진다.

