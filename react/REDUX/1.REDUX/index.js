const { createStore }  = require('redux');

//dispatch 되면 reducer로 옴. 무조건 새로운 state를 만들어줘야함.
const reducer = (prevState, action) => { // 리듀서는 뭐냐. 액션을 받아서 새로운 state를 만들어주는 녀석.
    switch(action.type) {
        case 'CHANGE_COMP_A':
            return {
                ...prevState, // 얕은 복사를 해서 중복을 제거한다.
                compA : action.data
            };
        case 'CHANGE_COMP_B':
            return {
                ...prevState,
                compB : action.data,
            }
        case 'CHANGE_COMP_C':
            return {
                ...prevState,
                compC : action.data,
            }
        default:
            return prevState; // action.type에 오타가 나서 위의 case에 걸리지 않았을 것에 대비. 또는 다른 오류
    }
};
// 불변성을 준다. history를 만들기 위해. action을 하나하면 새로운 state 객체를 만든다.
const initialState = {
    compA : 'a',
    compB : 12,
    compC : null
};

// initialState.compA = 'b' 이런식으로 막 바꾸면 안 됨. redux의 장점이자 단점.

const store = createStore(reducer, initialState); // 첫번째 인자로 reducer를 받음. 두번째인자로 state값들.

console.log(store.getState()); // state를 가져오는 것.

// action
// 액션 자체를 구체적으로 만들어도 좋지만 살짝 추상적으로 만드는게 좋다.
// 액션은 함수가 아니라 객체다.  이름 그대로 compA를 b로 바꾸는 것. 이렇게 해놓으면 c로 만드는 것도 또 만들어야 한다.
// type도 바꾸고 data도 바꾸고...
// 변수명을 짓는 상황을 피하라. 그러면 코드가 엄청 깔끔해진다. 확장성 있게 만들어야한다.

const changeCompAtoB = {
    type : 'CHANGE_COMP_A_TO_B', // 액션의 이름.
    data : 'b',
}
const changeCompAtoC = {
    type : 'CHANGE_COMP_A_TO_C', // 액션의 이름.
    data : 'c',
}

// 위 코드는 너무 구체적.

const changeCompA = (data) => {
    return {
        type : 'CHANGE_COMP_A',
        data
    }
} // 액션을 동적으로 만드는 creater // createAction 이라고 볼 수 있음.

// 이런식으로. 액션을 함수로 하면 data. 함수자체가 액션이 아니라 함수의 반환값인 객체가 액션임.
// 만들고나서는 이런식으로 dispatch를 사용.
// 중복을 처리하는 가장 쉬운 방법은 함수로 만드는 것.


store.subscribe(() => {  // react-redux 안에 들어있다.
    console.log('changed'); // 화면 바꿔주는 코드는 여기서
})

store.dispatch(changeCompA('b'));

console.log(store.getState());

// 화면은 알아서 뀐다.
