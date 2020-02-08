const { sum, sumOf } = require('./sum');

describe('sum', () => {
    it('calculates 1+ 2', () => {
        expect(sum(1,2)).toBe(3);
    });

    it('calculates all numbers', () => {
        const array = [1,2,3,4,5];
        expect(sumOf(array)).toBe(15);
    });
});



// test라는 함수는, 새로운 테스트 케이스를 만드는 함수.
// 그리고 expect는 특정값이 ~~일 것이라고
// 사전에 정의를 하고 통과를 하면 테스트를 성공시키고, 통과를 하지 않으면 테스트를 실패 시킨다. toBe는 mathercs라고 부르는 함수인데, 특정값이 어떤 조건을 만족하는지, 또는 어떤 함수가 실행이 됐는지, 에러가 났는지 등을 확인할 수 있게 해준다.
// 여기서 toBe는 특정 값이 우리가 정한 값과 일치하는지 확인을 해준다.

// 테스트코드를 작성 했을 때 얻을 수 있는 이점은, 리팩토링 이후 코드가 제대로 작동하는지 
// 있는 것을 검증하기 매우 간편하다는 것이다.