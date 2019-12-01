# 데브옵스와 테스트

데브옵스?

테스트 ?

데브옵스 구축.

목표 : 테스트가 뭔지 아는 개발자. 팀에 자동화 테스트를 도입하고 싶은 개발자.

데브옵스 개념에 대한 이해, 자동화 테스트를 왜 해야하는지, 빠진 툴을 구축해서 전파...

--------------------------------------------

데브옵스의 장점 : 속도, 사용자에게 신속한 제공, 안정성, 협업 강화, 보안

언어에 맞는 Test Framework 설정.
테스트를 잘 작성한다..

test 
 - unit intergartion acceptance 

TDD : TEST DRIVEN DEVELOPMENT 
테스트 주도 개발.

Clean Code That works 
세줄 요약 : fail success refactoring
문제를 정의하고, 테스트로 만듦.
최소한의 리소스로 테스트를 성공시킴.
제대로 동작하도록 리팩토링.

unit : 기능을 하는 최소한의 단위, function class 등..

intergration : unit test 들의 그룹. 외부 의존 api, storage 등..
Unit test에 비해 내부 복잡도가 높음.

데브옵스에 꼭 테스트를 넣어야함..
사이클 안에 테스트가 꼭 들어가야함.

결론 :
테스트 작성, 중요한 부분만이라도ㅡ DevOps toolchain을 꼭만들어라! ci에 작성한 테스트 넣기, 결과를 전파하고 문화 만들기.

처음 TDD는 굉장히 작은 것부터 연습 할 것.
