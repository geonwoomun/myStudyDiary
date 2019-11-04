const addPost = (data) => {
    return {
        type : 'ADD_POST',
        data,
    }
}

module.exports = {
    addPost
}
// 분리하는 기준은 데이터.