# JS에서 조건문을 더 낫게 사용해보자

### 1. 여러 조건에 함께 맞아야 할 때는 Array.includes를 사용하자

    function test(fruit) {
        if (fruit == 'apple' || fruit == 'strawberry'){
            console.log('red);
        }
    }

    function test(fruit) {
        const redFruits = ['apple', 'strawberry', 'cherry', 'cranberries'];
        
        if (redFruits.includes(fruit)) {
            console.log('red);
        }
    }

조건들을 배열로 따로 작성하면 코드가 더 간결해진다.

### 2. 중첩은 최대한 적게, Return은 최대한 빨리

조건에 맞지 않으면 최대한 빨리 return 하는 것.
이렇게 하면 단 하나의 중첩 if문만 남게 된다. if문으로 실행할 코드의 길이가 길 때 유용.

조건을 부정하고 빨리 return 하는 것으로 중첩을 더 줄일 수 있다.
부정이라 return을 빨리 할 수 있을땐 그 조건을 맨 위에 두는 것이 좋다.
훨씬 깔끔하고 가독성이 좋다.
### 3. 기본 파라미터와 비구조화를 사용하자

기본 값을 넣어서 조건문을 줄이자.
그리고 비구조화를 사용하자.

    function test({name} = {}) { // 기본값 {}
        console.log(name || 'unknown');
    }

    test(undefined); // unknown
    test({}) // unknwon;
    test({name : 'apple', color : 'red});
### 4. Switch 대신 Map과 오브젝트를 사용하자.
switch 문으로 쓰면 코드가 길어진다. key- value 값인 객체 또는 Map을 사용하면 코드를 줄일 수 있다.

    const fruitColor = {
        red: ['apple', 'strawberry'],
        yellow: ['banana', 'pineapple'],
        purple: ['grape', 'plum']
    };

    function test(color) {
        return fruitColor[color] || [];
    }

이렇게 객체를 사용해서 줄이거나.

    const fruits = [
        {name: 'apple', color: 'red'},
        {name: 'strawberry', color: 'red'},
        {name: 'banana', color: 'yellow'},
        {name: 'pineapple', color: 'yellow'},
        {name: 'grape', color: 'purple'},
        {name: 'plum', color: 'purple'},
    ];

    function test(color) {
        return fruits.filter(f => f.color === color);
    }

이런식으로도 가능 filter 사용해서.
### 5. 배열의 전체 조건에는 Array.every, 부분 조건에는 Array.some을 사용하자.

    const fruits = [
        { name: 'apple', color: 'red' },
        { name: 'banana', color: 'yellow' },
        { name: 'grape', color: 'purple' }
    ];

    function test() {
    
      const isAllRed = fruits.every(f => f.color === 'red');

      console.log(isAllRed); // false
    }

every는 모든 결과가 참이어야 true가 나오고 아니면 false가 나온다.

    const fruits = [
        { name: 'apple', color: 'red' },
        { name: 'banana', color: 'yellow' },
        { name: 'grape', color: 'purple' }
    ];

    function test() {
      // condition: if any fruit is red
      const isAnyRed = fruits.some(f => f.color === 'red');

      console.log(isAnyRed); // true
    }

some은 하나라도 true 값이 나오면 true을 반환한다. 배열의 전체 조건은 Array.every, 부분조건에는 Array.some을 사용하면 코드를 깔끔하게 줄일 수 있다.