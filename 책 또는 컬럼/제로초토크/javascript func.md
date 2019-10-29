# 제로초토크 자바스크립트에서 func()가 함수로 보이시나요?

func()은 함수가 아니다.

함수를 값으로 치는 언어들이라면 마찬가지일 것이다.
()이 붙고 안 붙고의 차이가 엄청 크다. 

    function func() {
        
    }

위에 것은 함수다. 즉 func는 함수인데 func()는 함수가 아니다.
func() -> undefined   undefined는 함수가 아니다. func()은 return 값이다. 
func() 은 return 값에 따라 값이 바뀐다. func는 계속 함수인 것이다. return 값을 모르면
func()도 모르는 것이다.

    const func = function() {
        console.log('hello');
    }

    //document.getElementById('hello').onclick = func() // 이것은 함수의 return 값을 넣는 것. 즉 undefined를 넣음.
    document.getElementById('hello').onclick = func // 이것이 함수를 넣는 것.

--------------------------------------------------------------------------------------------------

    document.getElementById('hello').onclick = function func(e) {

    }

e가 뭔지 모르는 분들이 많다. 내부적으로 func(event)가 호출된다. 외워야한다. event가 원래 첫자리에 들어있다. click event라던지 뭐.. event가 들어있고 event.target 으로하면 event가 일어난 tag가 나오게 된다.
    
    document.getElementById('hello').onclick = function func(e) {

    }

    document.getElementById('hello').onclick = function func() {

    }

이것을 헷갈려 하는 사람들이 많다. e를 쓸 때는 e.target 등을 쓰기 위해서 e를 파라미터로 받은 것이고 밑에 것은 쓰지 않으니깐 파라미터를 쓰지 않은 것이다.

파라미터가 만약
    function func(a,b,c) {
        ~~
    }

이렇게 있을 때 a파라미터를 쓰고 싶을 땐

    func(a);

이렇게 할 수 있지만 b파라미터를 사용하고 싶을 땐

    func('',b);
이런식으로 해서 첫번째 인자를 어떻게든 넘겨줘야한다. 즉 순서대로 넘겨줘야 사용이 가능하다.
맨 파라미터만 사용하고 싶어도 그 앞의 인자들을 다 넘겨줘야 한다. 최소 자기 앞에꺼까지 다 인자를 줘야한다.



