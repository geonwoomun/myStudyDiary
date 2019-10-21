## useFadeIn and useNetwork

hooks와 animation을 섞는 방법을 알아본다.


    const useFadeIn = (duration = 1, delay = 0) => {  // = 1 같은 것은 기본값을 줄 때 사용하는 것.
        if(typeof duration !== "number" || typeof delay !== "number"){
            return;
        }
        const element = useRef();
        useEffect(() => {
            if(element.current){
                const { current } = element;
                current.style.transition = `opacity ${duration}s ease-in-out ${delay}s`;
                current.style.opacity = 1;
            }
        }, [])
        return {ref: element, style : { opacity : 0} };
    }

    const App = () => {
        const fadeInH1 = useFadeIn(1,2);
        const fadeInP = useFadeIn(5, 10);
        return (
            <div className = "App">
                <h1 {...fadeInH1}>Hello</h1>
                <p {...fadeInP}>lorem ipsum lalalalala</p>
            </div>
        )
    }

글자들이 투명했다가 밝아지는데 duration 만큼 걸리고 delay 만큼 뒤에 실행 된다.~ ease-in-out 방식으로 보여진다.
hooks를 통해 css를 다루는 방법을 알아보았다.


### useNetwork 

navigator가 online 또는 offline이 되는걸 막아준다.
코드 샌드박스의 경우 개발자 모드의 Network 탭에서 Offline을 누르면 빨간 메시지를 보여주는데 그것이 할 일.

    const useNetwork = onChange => {
        const [status, setStatus] = useState(navigator.onLine); // navigator.online 은 true 혹은 false를 반환 웹사이트가 온라인인지 아닌지.

        const handleChange = () => {
            if (typeof onChange === "function") { // onChange 가 함수일 경우에 실행.
                onChange(navigator.onLine);
            }
            setStatus(navigator.onLine); // status 의 값을 navigator.onLine 값으로 바꾼다.
        }
        useEffect(() => {
            window.addEventListener("online", handleChange); // 윈도우에 "online" 됐을 때 handleChange가 실행되는 eventListener를 추가한다 . 
            window.addEventListener("offline", handleChange); // 윈도우에 "offline" 됐을 때 handleChange가 실행되는 eventListener를 추가.
            return () => {
                window.removeEventListener("online", handleChange); // componentWillUnmount 됐을 때 eventListener들을 삭제시켜 준다.
                window.removeEventListener("offline", handleChange);
            }
        }, [])
        return status;
    }

    const App = () => {
        const handleNetworkChange = online => {
            console.log(online ? "We just went online" : "We are offline");
        }
        const onLine = useNetwork(handleNetworkChange); // hooks는 뭔가 state값을 return으로 받고 실행되는 건 hooks가 다하고...? 뭔가 그냥 js로 //짰을 때랑 다르게 두개가 합쳐진 느낌이랄까

        return (
            <div className="App">
                <h1>{onLine ? "Online" : "Offline"}</h1>
            </div>
        )
    }

온라인 상태일때는 Online을 보여주고 오프라인 상태일 때는 Offline을 보여주는 코드.