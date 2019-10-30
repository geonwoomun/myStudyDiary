const { createStore }  = require('redux');

const reducer = (prevState, action) => { 
    switch(action.type) {
        case 'LOG_IN':
            return {
                ...prevState, 
                user : action.data
            };
        case 'LOG_OUT':
            return {
                ...prevState,
                user : null,
            }
        case 'ADD_POST':
            return {
                ...prevState,
                posts : [...prevState.posts, action.data],
            }
        default:
            return prevState;
    }
};

const initialState = {
    user : null,
    posts : []
};


const store = createStore(reducer, initialState); 
console.log(store.getState()); 

const login = (data) => {
    return { // action
        type : 'LOG_IN',
        data
    }
} 

const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

const addPost = (data) => {
    return {
        type : 'ADD_POST',
        data,
    }
}

//////////////////////////////////////////
// 위는 미리 만들어 둬야 하는것. 밑에는 화면에서 필요할 때마다 실행하는 것.
console.log(store.getState());
store.dispatch(login({
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
