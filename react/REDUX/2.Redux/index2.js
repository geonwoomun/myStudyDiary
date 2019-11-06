const { createStore, compose, applyMiddleware }  = require('redux');

const reducer = require('./reducers');
const { logIn, logOut } = require('./actions/user');
const { addPost } = require('./actions/post');

const initialState = { // 구조를 잘 짜야함. 이 구조에 따라 액션, 리듀서들을 나누기 때문에
    user : {
        isLoggingIn : true,
        data : null,
    },
    posts : [],
 // state들이 메모리에 저장되는데 엄청나게 많이 용량을 차지하진 않음..
    // infinite scroll 등을 사용할 땐 메모리 관리를 해야 할 상황이 나올 수 있음.
    // 불변성을 유지할 때 얕은 복사가 되기 때문에 메모리를 엄청나게 잡아 먹고 그러진 않는다.
};

const firstMiddleware = (store) => (dispatch) => (action) => { //함수가 여러번 중첩되어있음.
    // 고차함수.. store와 next 사이에서 무슨 일을 하고 싶다면 1,2 () 사이에서
    // next와 action 사이에서 무엇을 하고 싶다면 2,3 사이에서 action쪽에서 하고 싶으면 action 에서
    // 실행되는 시점의 차이가 있음.

    console.log("action 로깅",action); // 부가적인 기능. 이곳에 여러 기능을 넣으면 됨.
    dispatch(action); //기본동작 , next로 적을 수도 잇음.
    // dispatch 하고 난후 부가기능 추가하고 싶으면 여기.
    console.log("action 끝");
}

// 비동기를 제어하는 미들웨어 중에는 thunk 와 saga가 유명하다.
const thunkMiddleware = (store) => (dispatch) => (action) => {
    if (typeof action === 'function') {// 비동기, 동기이면 객체다. 
        return action(store.dispatch, store.getState);
    // 비동기일때는 thunk가 실행을 해줌.
    }    
    return dispatch(action); // 동기일땐 바로 dispatch(action)
};

const enhancer =  // compose 합성하는 함수.이거 말고 더 추가할때 compose 유용, 함수를 합성해줌.
    applyMiddleware(firstMiddleware); 


const store = createStore(reducer, initialState, enhancer); 
store.subscribe(() => {   // 액션 실행 , subscribe, 액션 끝 순서..
    console.log('changed');
})
//////////////////////////////////////////
// 위는 미리 만들어 둬야 하는것. 밑에는 화면에서 필요할 때마다 실행하는 것.
console.log(store.getState());
store.dispatch(logIn({
    id : 1,
    name : 'mun',
    admin: true
})); //dispatch는 액션을 받아야함. 액션은 객체임. {}

console.log(store.getState());
store.dispatch(addPost({
    userId: 1,
    id : 1,
    content : '안녕하세요. 리덕스'
}))
console.log(store.getState());
store.dispatch(logOut());

console.log(store.getState());

// 화면은 알아서 뀐다.
