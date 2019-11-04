const { createStore }  = require('redux');

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


const store = createStore(reducer, initialState); 
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
