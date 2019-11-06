# npm 이란 ?

Node Package Manager이다.
즉 node.js 모듈 관리자.
모듈은 프로그램보다 좀 작은 단위로 기능 같은 것을 사용하기 쉽게 만들어 놓았다고 생각하면 된다.

즉, Node.js로 만들어진 package(module)을 관리해주는 툴로서
개발자들은 단 몇줄의 명령어로 기존의 공개된 모듈들을 설치하고 활용 가능하다.

예전에는 npm을 따로 설치해야 했지만 지금은 node.js를 설치하면 내장되어 있다.
node.js는 npm을 사용하기 위해서 꼭 필요하다.
node.js 설치는 홈페이지를 통해 가능하다.


### Npm 모듈 다운로드

모듈을 다운하는 방법으로는
    npm install 모듈명 
    npm i 모듈명

등이 있다. 여기에 뭐 -g 라던가 -save라던가 같은 옵션들을 줄 수 있다.

이렇게 하나하나 설치하는 방법도 있고 모듈들을 한꺼번에 관리하는 방법도 있다.
json이라는 파일을 만들어서 그 안에 기록을 해놓음으로써 관리를 한다.

    npm init
을 하면 package.json이 만들어진다.
그리고
    npm install
을 하면 package.json 파일의 dependencies 아래에 나열된 모든 모듈들을 설치한다.

    npm install 패키지@버전
하면 특정 버전만 설치가능하고.

    npm install 주소
하면 특정한 저장소에 있는 패키지를 설치가능하다. 주로 Github에만 있는 패키지를 설치할 때 사용.

-g 옵션 : 글로벌 패키지에 추가.
  글로벌 패키지에 추가하면 이 프로젝트뿐만 아니라 다른 프로젝트에서도 해당 패키지를 사용 가능.

나머지 몇개의 명령어들을 알아보면
    npm update // 설치한 패키지를 업데이트하는 명령어
    npm dedupe // npm 중복된 패키지를 정리할때 사용. 가끔 용량을 줄여주고 싶을 때
    npm start // package.json의 scripts에 있는 start 명령어를 실행하는 부분.
             // 만약 start 명령어를 따로 설정하지 않았따면 node server.js가 실행됨.
    npm stop // npm start 했던 것을 멈추게 함.
    npm restart // npm stop후에 다시 npm start를 하는 명령어
    npm run // scripts를 실행하는 명령어, 만약 scripts에 build 명령어가 있따면, npm run build를 하면 된다.
