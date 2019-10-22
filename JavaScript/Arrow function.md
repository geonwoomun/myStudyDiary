## Arrow Function

arrow function은 기존 함수와는 달리 함수이름 , this , arguments가 없다.

arrow function 또는 화살표 함수라고 부른다.
기존에는 
    function () {

    }

이렇게 하지만 화살표 함수는

    () => {

    }

이렇게 한다. arrow 함수는 기명함수가 아니라 익명함수로만 존재한다. 
기존 익명 함수를 쓰려면

    const myFun = function() {

    }

이렇게 써야 했다. 화살표 함수도 마찬가지로

    const myFun = () => {

    }
이런식으로 쓰면 된다. 그리고 this가 없다. 이게 무슨소리냐.. 함수는 자기만의 this가 존재하지만 arrow function은 자기만의 this가 존재하지 않는다. 
기존의 함수에는 this를 하려고 bind, call,apply 등으로 this를 주입 할 수 있다.
화살표 함수에는 this가 없기 때문에 저런 함수들을 쓰지 못하고 함수 스코프에 따라 사용하게 된다. 예를들어 this를 쓰면 window를 가리키게 된다던가..

this에 관한 예

    var myObj = {
        count: 3,
        setCounter : function(){
            console.log(this.count);
        }
    };

    myObj.setCounter();

이렇게 하면 setCounter를 myObj에서 불렀으니 this가 myObj가 된다.
더 추가적인 예로

    const btn = document.getElementById('btn');

    var myObj = {
        count : 0,
        setCounter : function(){
            console.log(this.count);
            btn.addEventListener('click',(function(){
                console.log(this);
            }).bind(this));
        }
    };

    myObj.setCounter();

이것의 btn.add~~ 안의 this를 찍으면 지금은 myObj가 나온다. 왜나하면 bind를 밖의 this로 했기 때문에. 그런데 bind가 없이 this를 출력하면 button~~ 이 나온다. 왜냐하면 btn이 addEventListener라는 함수를 쓴것이기 때문이다. 
근데 이 this를 bind를 쓰지 않고도 myObj를 가리키게 하려면 화살표 함수를 쓰면 된다.

    var myObj = {
        count : 0,
        setCounter : function(){
            console.log(this.count);
            btn.addEventListener('click', () => {
                console.log(this);
            })
        }
    };

를 하면 this가 myObj를 가리키게 된다. 왜냐하면 화살표 함수는 this가 없기 때문에. 스코프에 의해 this가 해당 블록에 없으니 그 밖에서 찾게 되고 setCounter에서 this를 찍으면 myObj가 나오니깐 그 this가 btn 안에서의 this가 된다.
그리고 this가 없어서 할 수 없는게 또 있는데 생성자로 쓸 수 없다는 것이다.

    const MyClass = function(){

    }

    new MyClass();

이렇게 있는데 this를 자기 자신으로 써서 해야되는데 화살표 함수에는 this가 없으니 할 수가 없다. constructor, prototype 등을 가리킬 수가 없는..

그리고 마지막으로 arguments가 없다. 배열은 아닌데 배열처럼 접근 할 수 있는 그런것이다.

    const myFun = function () {
        console.log(arguments);
    }

    myFun(1,2,3,4);

이렇게 하면 인자로 넘겨준 값들 1,2,3,4가 배열과 비슷하게 log가 찍힌다.

하지만 
    const myFun2 = () => {
        console.log(arguments);
    }

    myFun2(1,2,3,4);

를 하면 arguments가 없다면서 에러가 뜬다. 

    function outter(){
        const myFun2 = () => {
            console.log(arguments);
        }
        myFun2();
    }

    outter(1,2,3,4);

를 하면 arguments로 1,2,3,4가 배열 비슷하게 나온다. 왜냐하면 스코프 체인이 이뤄졌기 때문에. 자기 자신의 스코프에서 arguments가 없으니 위로 찾아간 것이다.
arguments를 비슷하게 쓰려면

    conts myFun2 = (...args) => {
        console.log(args);
    }

    myFun2(1,2,3,4);

이렇게 하면 [1,2,3,4]가 출력된다. 진짜 배열로. ...은 spread 연산자인데 인자로 받은 모든것들을 배열로 만들어준다. spread 연산자는 다른 방법으로도 이용 가능한것 같다.

arrow function은 언제 유용하게 쓰일까? 타이핑을 많이 안 적어도 되고 읽기가 편하다. 그리고 this 바인드를 굳이 하지 않아도 된다. 
