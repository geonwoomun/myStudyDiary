const logIn = (data) => { // async action creator/ 함수를 리턴할 때. 비동기
    return (dispatch, getState) => {
        dispatch(logInRequest(data)); // 동기 액션들간의 실행순서를 조작하는 그런정도..
        try {
            setTimeout(() => {
                dispatch(loginSucess({
                    userID : 1,
                    nickname: 'mun'
                }));
            },2000)
        }
        catch(e) {
            dispatch(logInFailure(e));
        }
     
    }
}

const logInRequest = (data) => { // 이 두개는 동기액션 크리에이터가 되어야함.
    return {
        type : 'LOG_IN_REQUEST',
        data
    }
};

const loginSucess = () => {
    return {
        type: 'LOG_IN_SUCCESS',
        data,
    }
}

const logInFailure = (error) => {
    return {
        type : 'LOG_INFAILURE',
        error
    }
}
const logIn = (data) => { // sync action creator
    return { // action / 객체를 리턴할 때 동기 액션 크리에이터
        type : 'LOG_IN',
        data
    }
} 

const logOut = () => {
    return {
        type: 'LOG_OUT'
    }
}

module.exports = {
    logIn,
    logOut
};