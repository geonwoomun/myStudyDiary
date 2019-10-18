## useEffect

useEffect는 class형 컴포넌트의 라이프 사이클의
componentDidMount와 componentDidUpdate componentWillUnmount를 합쳐놓은거라고 보면 된다.


    const App = () => {
        const sayHello = () => console.log("hello");
        const [number, setNumber] = useState(0);
        const [aNumber, setAnumber] = useState(0);
        useEffect(sayHello);
        return ~~~~~
    }

이런식으로 사용이 되는데 useEffect를 저런식으로 사용하면 어떤 state가 변해도 실행이 된다. componentDidMount와 componentDidUpdate가 계속 실행이 되는 것이다.

useEffect(sayhello, []) 이런식으로 하면 어떤 state값이 바뀌어도 다시 실행되지 않는다. 즉 componentDidMount의 역할만 한다.

useEffect(sayhello, [number]); 이렇게 하면 처음과 number의 값이 바꼇을 때 실행이 된다.
즉 뒤에 [] 값에 넣은 파라미터의 값이 바꼈을 때 실행이 되는 componentDidUpdatet가 되는 것이다.
