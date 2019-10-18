useClick을 만들어보기 전에 
useRef()를 사용해보자.

    import React, { useRef } from 'react';
    
    const App = () => {
        const potato = useRef();
        setTimeout(() => potato.current.focus(), 5000);
        return (
            <div>
                <input ref={potato} placeholder="la"/>
            </div>
        )
    }

이런식으로 되어있다면 5초뒤에 input 창에 focus가 맞춰질 것이다.
왜냐하면 useRef를 사용했기 때문에. useRef는 document.querySelector랑 비슷한 역할을 하기 때문이다. 
dom 요소에 직접 접근을 할 수 있게 만들어준다. potato 변수의 이름은 아무거나 해도 상관없다. 이름으로 지은거 다음에 current를 붙여주는걸 명심.


### useClick 

    const useClick = onClick => {
        const element = useRef();
        useEffect(() => {
            if (element.current) {
                element.current.addEventListener("click", onClick);
            }

            return () => {
                if (element.current){
                    element.current.removeEventListener("click",onClick);
                }
            };
        }, []);
        return element
    }

    const App = () => {
        const sayHello = () => console.log("say hello");
        const title = useClick(sayHello);
        return (
            <div>
                <h1 ref={title}>Hi</h1>
            </div>
        )
    }

이렇게 되면 useClick에서 useRef를 사용하고 그것을 반환 하니까 h1에 직접 접근할 수 있게 된다. 그리고 클릭 이벤트를 추가해준다. 해당 dom을 클릭하면 onClick이 실행된다. onClick은 전달인자로 넣어준 sayHello다. 그러면 h1을 클릭했을 때 console.log("say hello") 가 실행된다.
밑에 있는 return () => ... 은 componentWillUnmount 할 때의 상황이다. 클릭 이벤트를 지운다.
[] 안에 dependencies가 없기 때문에 componentDidMount 일 때만 실행이 된다. 