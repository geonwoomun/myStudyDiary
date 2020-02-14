# 타입스크립트 고급 기능

## 1. 제네릭
제네릭은 타입 정보가 동적으로 결정되는 타입이다. 제네릭을 통해 같은 규칙을 여러 타입에 적용 할 수 있기 때문에 타입 코드를 작성할 때 발생할 수 있는 중복 코드를 제거 할 수 있다.
배열의 크기와 초깃값을 입력 받아서 배열을 생성하는 함수를 작성한다고 생각해보자. 숫자와 문자열을 위한 함수는 다음과 같이 작성할 수 있다.

    function makeArray<T>(defaultValue: T, size: number): T[] {
        const arr: T[] = [];
        for (let i = 0; i < size; i++) {
            arr.push(defaultValue);
        }
        return arr;
    }
    const arr1 = makeArray<number>(1, 10);
    const arr2 = makeArray<string>("empty", 10);
    const arr3 = makeArray(1,10);
    const arr4 = makeArray("empty", 10);

제네릭으로 직접 명시해줘도 되고, makeArray 함수의 첫 번째 매개변수를 알면 타입 T의 정보도 알 수 있기 때문에,
호출 시 타입 T의 정보를 명시적으로 전달하지 않아도 된다.

제네릭은 데이터의 타입에 다양성을 부여해주기 때문에 자료 구조에서 많이 사용된다. 제네릭을 이용해서 스택 클래스를 구현해보자.

    class Stack<D> {
        private items: D[] = [];
        push(item: D) {
            this.items.push(item);
        }
        pop() {
            return this.items.pop();
        }
    }

    const numberStack = new Stack<number>();
    numberStack.push(10);
    const v1 = numberStack.pop();
    const stringStack = new Stack<string>();
    stringStack.push('a');
    const v2 = stringStack.pop();

    let myStack: Stack<number>;
    myStack = numberStack;
    myStack = stringStack; // 타입에러

### extends 키워드로 제네릭 타입 제한하기

지금까지는 제네릭 타입에 아무 타입이나 입력할 수 있었다. 하지만 리액트와 같은 라이브러리의 api는 입력 가능한 값의 범위를 제한한다. 예를 들어 리액트의 속성값 전체는 객체 타입만 허용된다. 이를 위해 타입스크립트의 제네릭은 타입의 종류를 제한할 수 있는 기능을 제공한다. 다음과 같이 extends 키워드를 이용하면 제네릭 타입으로 입력할 수 있는 타입의 종류를 제한할 수 있다.

    function identity<T extends number | string>(p1 :T) : T {
        return p1;
    }
    identity(1);
    identity('a');
    identity([]); // 타입 에러

제네릭 T의 타입을 number | string에 할당 가능한 타입으로 제한한다. 타입 T는 숫자 또는 문자열 타입만 가능하다. 배열은 number | string 타입에 할당 가능하지 않기 때문에 타입 에러가 발생한다.

