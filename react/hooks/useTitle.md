### custom hook  useTitle

    const useTitle = initialTitle => {
        const [title, setTitle] = useState(initialTitle);
        const updateTitle = () => {
            const htmlTitle = document.querySelector("title");
            htmlTitle.innerText = title;
        };
        useEffect(updateTitle, [title]);
        return setTitle;
    };

이렇게 만들면 파라미터로 initialTitle을 받아서 title state 값을 초기화 하고 
updateTitle을 useEffect로 처음 마운트 됐을 때랑 title state 값이 바뀌었을 때 실행하는 것이다.
updateTitle은 html 코드의 title 을 가지고 와서 그 안의 text를 title state 값으로 업데이트 시키는 함수이다.

return으로 setTitle을 줘서 밑의 App 함수 컴포넌트에서 사용할 수 있게 했다.


    const App = () => {
        const titleUpdater = useTitle("Loading...");
        setTimeout(() => titleUpdater("Home"), 5000);
        return ~~
    }

이렇게 적게 되면 위의 setTitle이 titleUpdater에 담기게 되고 마운트 됐을 때 title이 Loading...으로 바뀌었다가 5초뒤에 Home으로 바뀌게 된다.
