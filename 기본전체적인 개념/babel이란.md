# Babel이란??

자바스크립트 컴파일러. 친절하게도 최신 자바스크립트를 표준 자바스크립트로 변환시켜준다.

NodeJS에서 Babel을 실행시키기 위해서는 NPM에서 @babel/core, @babel/node를 설치해야한다. 

 @babel/core : babel의 기본적인 기능들이 들어있다.
 @babel/node : babel을 nodeJS에서 사용하기 위해 필요하다.

    npm install @babel/core @babel/node

로 설치.


위의 패키지만으로 바벨을 실행시키면 아무 컴파일 없이 entry -> output으로 넘어간다.
바벨로 인해 컴파일 시킬 기준으로 자바스크립트 스펙이 필요한데 자바스크립트 스펙으로 아직 확정되지 않은 proposal 스펙들이 존재.

이것들을 한번에 다 사용할 수 있게 해주는 것이 babel-preset-env

    npm install @babel/preset-env

.babelrc이름의 파일은 만든다. 이 파일은 babel의 config 파일이다.

그리고 이 파일에 preset-env를 사용한다고 아래처럼 입력하면 된다.

    {
        "presets" : ["@babel/preset-env"]
    }

그리고 실행을 하면 된다

    babel-node index.js
노드몬 사용시
    nodemon --exec babel-node index.js

index.js 파일을 표준 스크립트 문법으로 컴파일해서 실행한다.