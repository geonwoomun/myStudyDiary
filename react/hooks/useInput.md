# 노마드 코더 실전형 리액트 강의 들으면서


### useInput part 1

useInput은 input 태그 안의 value와 onChange 등을 간단하게 쓰기 위해 개인적으로 만든 hook이다 .

    const useInput = initalValue => {
        const [ value, setValue ] = useState(initialValue);
        const onChange = event => {
            console.log(event.target);
        };

        return { value, onChange };
    }

    const App = () => {
        const name = useInput("Mr.");
        return (
            <div className="App">
                <h1>Hello</h1>
                <input placeholder="Name" {...name}/>
            </div>
        )
    }

이렇게 적으면 <input value = {name.value} onChange = {name.onChange}/> 랑 같다고 했다. 이게 왜 같은지 잘 이해가 안간다..
{...name} 이면 {name.value, name.onChange} 인거 같은데 value = {name.value} onChange = {name.onChange}랑 같다는게...
{...name} 이면 {value, onChange}가 나오고 value랑 onChange가 같으니깐
{ value = value , onChange= onChange} 이런식으로 해석 되서 그런거 같긴하다.
     
    ---------------------------------------------------------------------
### useInput part 2

custom hook 인 useInput에 검증 기능까지 추가 해본다.


    const useInput = (initialValue, validator) => {
        const [value, setValue] = useState(initialValue);
        const onChange = event => {
            const {
                target : {value}
            } = event;  // const {value} = e.target 이랑 같은거 같다.
                        //구조분해 문법이 두번 쓰인것....
            let willUpdate = true;
            if(typeof validator === "function"){ // validator가 함수라면
                willupdate = validator(value); // value를 넣은 결과값을                                    //willupdate에 갱신
            }
            if(willUpdate){ // willUpdate가 참이면
                setValue(value); // setValue 진행, 즉 validator 없으면 그냥 setValue하는거고 있으면 
                                //검증 후 setValue 여부 판단.
            }
        };
        return { value, onChange };
    }

    const App = () => {
        const maxLen = value => value.length < 10;
        const name = useInput("Mr.", maxLen); // useInput의 파라미터로 초기값과 검증할 수 있는 
                                              //함수를 넣음
                                              // 밑은 같음..
    }


이런식으로 하면 input 창의 글자가 10자리가 넘으면 더이상 적히지 않는다. 왜냐하면 setValue가 되지 않기 때문에...

