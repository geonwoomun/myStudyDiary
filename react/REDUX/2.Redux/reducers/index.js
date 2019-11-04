const { combineReducers } = require('redux');
// 리듀서를 합치는 것.
const userReducer = require('./user');
const postReducer = require('./post');

// 분리가 쉬운이유는 순수함수이기 때문이다.

module.exports = combineReducers({
    user: userReducer,
    posts : postReducer,
});