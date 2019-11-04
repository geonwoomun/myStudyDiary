const logIn = (data) => {
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

module.exports = {
    logIn,
    logOut
};