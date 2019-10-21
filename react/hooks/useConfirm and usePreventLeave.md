## useConfirm and usePreventLeave

useState와 useEffect를 사용하지 않아서 진짜 hooks는 아니지만
함수형 프로그래밍을 하는 방법을 알게 된다.


### useConfirm 

사용자가 어떤 버튼을 눌렸을 때 '정말로 하고 싶니?'와 같은 메시지를 출력하는 것.
이 메시지는 browser에 의해서 만들어지게 된다.


    const useConfirm = (message = "", callback, rejection) => {
        if (typeof callback !== 'function'){
            return; // 없어도 되지만 있으면 함수형 프로그래밍을 이해하는데 도움이 됨.
        }

        const confirmAction = () => {
            if(confirm(message)){
                callback();
            } else {
                rejection();
            }
        }
        return confirmAction
    }

    const App = () => {
        const deleteWorld = () => console.log("Deleteing the world!");
        const abort = () => console.log("Abort");
        const confirmDelete = useConfirm("Are you sure", deleteWorld);

        return (
            <div className = "App">
                <button onClick = {confirmDelete}>Delete the world</button>
            </div>
        )
    }

이렇게 하면 button을 눌렷을 때 동의 하겠냐는 창이 나오고 ok를 눌렸을 때 deleteWorld가 실행이 되고 아니면 실행이 되지 않는다.

여기에 다른 파일로 만들어서 할려면 export를 사용해서 하면 된다. 그리고 조금 변경을 하면...

     const useConfirm = (message = "", callback, onCancle) => {
        if (!onConfirm || typeof callback !== 'function'){
            return; // 없어도 되지만 있으면 함수형 프로그래밍을 이해하는데 도움이 됨.
        }
        if(onCancel && typeof onCancel ! == "function") {
            return;
        }
        const confirmAction = () => {
            if(confirm(message)){
                callback();
            } else {
                onCancel();
            }
        }
        return confirmAction
    }

    const App = () => {
        const deleteWorld = () => console.log("Deleteing the world!");
        const abort = () => console.log("Abort");
        const confirmDelete = useConfirm("Are you sure", deleteWorld);

        return (
            <div className = "App">
                <button onClick = {confirmDelete}>Delete the world</button>
            </div>
        )
    }

------------------------------------------------------------------------------------

### preventLeave

윈도우 창을 닫을 때 "아직 저장하지 않았어!" 라고 하는 것...?


    const usePreventLeave = () => {
        //api에 뭔가를 보내서 아직 받아오지 않았을 때 활성화
        // 받아왔을 땐 닫을 수 있게 하는 것.
        const listener = event => {
            event.preventDefault();
            event.returnValue = ""; // 이게 없으면 실행이 안 됨. 크롬이 멍청해서..?
        }
        const enablePrevent = () => window.addEventListener("beforeunload", listener); 
        
        const disablePrevent = () => window.removeEventListener("beforeunload", listener);
        return { enablePrevent, disablePrevent };
    }

    const App = () => {
        const {enablePrevent, disablePrevent } = usePreventLeave();
        return (
            <div className="App">
                <button onClick = {enablePrevent}>Protect</button>
                <button onClick = {disablePrevent}>Unprotect</button>
            </div>
        )
    }

이렇게 적으면 protect 버튼을 눌렸을 때 닫을지 말지 물어본다. 그리고 Unprotect를 눌렸을 때는 물어보지 않고 바로 닫는다. 
이거는 api를 불러왔을 때 enablePrevent를 활성화시켜서 물어보게 만들고 다 불러오고 나서는 disalbePrevent를 사용해서 그냥 닫을 수 있게 만들면 유용하게 쓸 수 있을 것 같다.