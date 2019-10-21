## useBeforeLeave

기본적으로 탭을 닫을 때 실행되는 function
마우스가 페이지를 벗어나면 실행된다.

"제발 떠나지마~~" 하고 실행시키는 것..


    const useBeforeLeave = (onBefore) => {
        if( typeof onBefore !== "function" ){
            return;
        }
        const handle = (event) => {
            const { clientY } = event;
            if (clientY <= 0) {
                onBefore();
            }
        };
        useEffect(() => {
            document.addEventListener("mouseleave", handle);
            return () => document.removeEventListener("mouseleave", handle)
        }, [])
        // []을 적어줌으로써 한번만 되게 한다. 즉 componentDidMount일 때에만 . componentWillUnmount일 때 event를 지운다.
    }

    const App = () => {
        const begForLife = () => console.log("Pls dont leave");
        useBeforeLeave(begForLife);
        return (
            <div className = "App">
                <h1>Hello</h1>
            </div>
        )
    }

이렇게 하면 마우스를 화면 밖으로 보내면 console.log가 찍히게 된다.
팝업이나 비슷한 걸 통해서 "떠나지마~~ 할인해줄게~~" 같은 창을 띄워주게 된다.

event를 찍어보면 위로 벗어날땐 clientY 가 0이고 밑으로 벗어날 땐 clientY가 0보다 큰걸 알 수 있다. 
그래서 위의 코드를 적으면 위로 벗어났을 때만 함수가 작동한다.

