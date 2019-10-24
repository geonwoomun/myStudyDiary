## 클로저 실수를 let으로 해결

    var btns = {
        document.getElementById('btn0');
        document.getElementById('btn1');
        document.getElementById('btn2);
    };

    function setClick() {
        for (var i = 0; i < 3; i++){
            btns[i].onClick = function () {
                console.log(i);
            }
        }
    }

    setClick();

이것일 때는 i가 언제나 어느버튼을 눌려도  3이 나온다. 왜 그럴까. 그런데 var를 let으로만 고치기만 하면 

    
    var btns = {
        document.getElementById('btn0');
        document.getElementById('btn1');
        document.getElementById('btn2);
    };

    function setClick() {
        for (let i = 0; i < 3; i++){
            btns[i].onClick = function () {
                console.log(i);
            }
        }
    }

    setClick();

결과가 버튼에 따라 0, 1, 2가 나온다. 왜 그런지 알아본다.. 

var과 let의 차이를 알아본다. var는 함수단위 let은 중괄호 즉 블록단위

    function x() {
        {
            var t = 1;
        }
        console.log(t);
    }

    x();

를 하면 t가 1로 출력된다. 왜냐하면 함수 단위이기 때문이다.

    function x() {
        {
            let t = 1;
        }
        console.log(t);
    }

    x();

이렇게 하면 t가 선언 되어있지 않다는 에러가 뜬다. 왜냐하면 let은 블록 안에서만 존재하기 때문이다.


맨 위의 식이 실행이 되면  global 스코프가 생기고 그 안에는 btns 왜 setClick이 있다. 그리고 setClick이 실행이 되면 setClick의 스코프가 생긴다. setClick 스코프 안에 i가 들어가고 for문이 돈다. i에 0. 0번째 버튼에 onclick 함수를 넣어준다. for문이 바뀌고 1 . index가 1인 버튼에 함수 넣어주고 2에도 넣어주고.
i가 3보다 작을 때까지니깐 i가 1 증가해서 3이 되고 3보다 작은게 아니니깐 for문이 끝난다.
그럼 이제 버튼을 클릭했을 때 함수가 실행된다. 버튼들은 함수가 실행될 때 i를 찾게 되는데 i가 자기한테 없으니깐 setClick에 가서 찾게 된다. 그러면 i가 3이니깐 3이 출력된다.

그럼 var이 let으로 바꼇을 땐 뭐가 다를까.
let을 하게 되면 함수에 i가 있는게 아니라 중괄호에 let이 존재한다. for문을 돌때마다 새로운 중괄호들이 각각 i를 가지고 있다. 각자 자기만의 블록..

for문에서만 let이 조금 다르게 작동하는데... babel로 let으로짠 코드를 보면 이해를 하기가 조금더 쉽다. babel은 현재 코드를 예전으로 바꿔주는 것. 컴퓨터가 이해할 수 있게.

그래서 var로 바꿔주는데 var로 for문을 짠 것과 다르게 각각 함수를 새로 만들고 i를 매개변수로 받아서 사용. 그래서 i가 그 함수 안의 스코프에서 유지 될 수 있게


    function setClick() {
        var _loop = function _loop(i) {
            btns[i].onclick = function () {
                console.info(i);
            }
        }
    
        for (var i = 0; i < 3; i++){
            _loop(i);
        }
    }

이렇게 바뀐다. 그래서 var가 함수 스코프 이기 때문에 i를 함수의 매개변수로 넘겨주게 되면 
각각의 btns들이 i를 함수 안에서 찾게 되므로 i가 0, 1, 2와 같이 정상적으로 나오게 된다.