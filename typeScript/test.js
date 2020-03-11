const mergeArray = (...arrays) => {
    let result = []
    for (let index= 0; index < arrays.length; index++){
        const array = arrays[index];

        result = [...result, ...array];
    }
    return result;
}

console.log(mergeArray([1,2,3,4], [2,3,4,5], [4,5,6,7]));
