# Mobx에 대해서 알아보도록 하자!!

redux, redux-saga를 어느정도 익혔으니 Mobx에 대해서도 조금 알아보도록 할 것이다.
redux와 비슷한 역할을 하는데 좀 더 쉬워서 러닝커브가 낮다고 들었다. 그래서 velopert님의 글을 읽으면서 공부 해볼 것이다. 
일단 한번 쭉 읽으면서 정리해보고 한번 해보고 그런식으로...!

## Mobx는 최소한의 공수로 상태관리 시스템을 설계 할 수 있게 해준다.

### 1-1 Mobx의 주요 개념들

#### 1. Observable State (관찰 받고 있는 상태)

Mobx를 사용하고 있는 앱의 상태는 Observable하다. 관찰 할 수 있는 상태, 관찰 받고 있는 상태. 우리의 앱에서 사용하고 있는 상태는, 변할 수 있으며 만약에 특정 부분이 바뀌면, Mobx에서는 저확히 어떤 부분이 바뀌었는지 알 수 있습니다. 그값이, 원시적인 값이던, 객체이던, 배열 내부의 객체이던 객체의 키이던 간에 말이죠.

읽어보니깐 리액트나 리덕스처럼 상태 값이 바뀌면 Mobx가 알아채서 어떤 행동을 취해준다~~ 이런거인거 같다. 그니깐 state 값!

#### 2. Computed value (연산된 값)

연산된 값은, 기존의 상태값과 다른 연산된 값에 기반하여 만들어질 수 있는 값.
이는 주로 성능 최적화를 위하여 많이 사용된다. 어떤 값을 연산해야 할 때, 연산에 기반되는 값이 바뀔때만 새로 연산하게 하고, 바뀌지 않았다면 그냥 기존의 값을 사용할 수 있게 해준다.

그니깐 리덕스에서 리듀서를 사용해서 바뀌지 않았다면 그냥 ...state를 return 해주는 것처럼 바뀐 값만 확인하고 바뀌지 않았다면 그냥 내보내준다는 것인거 같다!

#### 3. Reactions (반응)

Reactions는 Compute Value와 비슷한데, Computed Value의 경우는 우리가 특정 값을 연산해야 될 때에만 처리가 되는 반면에, Reactions는 값이 바뀜에 따라 해야할 일을 정하는 것을 의미. 예를 들어서 Observable State의 내부의 값이 바뀔 때, 우리가 console.log('ooo가 바뀌었어!') 라고 호출해 줄 수 있다.

이거는 reducer에서 return 하기 전에 위에 적는 로직들을 말하는 거 같다.

#### 4. actions(액션; 행동)

액션은, 상태에 변화를 일으키는 것을 말한다. 만약에 Observable State에 변화를 일으키는 코드를 호출한다? 이것은 액션이다. - 리덕스에서의 액션과 달리 따로 객체형태로 만들지는 않습니다.

따로 객체 형태로는 안 만들지만 리덕스에서의 액션과 비슷한 역할인듯.


### 1-2 리액트 없이 Mobx 사용해보기

리덕스와 마찬가지로 MobX는 리액트 종속적인 라이브러리가 아니다. 따로 쓸 수 있고 Vue, Angular 등이랑 써도 전혀 무방함.


    import { observable, reaction, computed, autorun} from 'mobx';

함수들을 불러온다. 하나씩 사용해보면서 설명해주신다고 한다.

#### observable

observable 함수는 Observable State를 만들어준다.
한번, 덧셈을 해주는 계산기 객체를 만들어보자~~

    import { observable, reaction, computed, autorun } from 'mobx';

    const calculator = observable({
        a : 1,
        b: 2
    });

이렇게 Observable State를 만들고나면 MobX가 이 객체를 "관찰 할 수" 있어서 변화가 일어나면 바로 탐지해낼 수 있다.

#### reaction

특정 값이 바뀔 때 어떤 작업을 하고 싶다면 reaction 함수를 사용한다.
한번 a나 b가 바뀔 때 console.log 로 바뀌었다고 알려주도록 코드를 작성해보자.

    import { observable, reaction, computed, autorun } from 'mobx';

    const calculator = observable({
        a : 1,
        b: 2
    });

    reaction(
        () => calculator.a,
        (value, reaction) => {
            console.log(`a 값이 ${value}로 바뀌었네요!`);
        }
    );

    reaction(
        () => calculator.a,
        (value, reaction) => {
            console.log(`a 값이 ${value}로 바뀌었네요!`);
        }
    );

    calculator.a = 10;
    calculator.b = 20;

하면 바뀌었다고 log가 출력된다. 보니깐 reaction의 첫번째 인수에 함수로 어떤 값을 해주고 두번째 인수에 함수로 value에 바뀐 값이 담기나 보다.

#### computed

computed 함수는 연산된 값을 사용해야 할 때 사용된다. 특징은, 이 값을 조회할 때마다 특정 작업을 처리하는 것이 아니라, 이 값에서 의존하는 값이 바뀔 때 미리 값을 계산해놓고 조회 할 때는 캐싱된 데이터를 사용한다는 점.

import { observable, reaction, computed, autorun } from 'mobx';

    const calculator = observable({
        a : 1,
        b: 2
    });

    reaction(
        () => calculator.a,
        (value, reaction) => {
            console.log(`a 값이 ${value}로 바뀌었네요!`);
        }
    );

    reaction(
        () => calculator.a,
        (value, reaction) => {
            console.log(`a 값이 ${value}로 바뀌었네요!`);
        }
    );

    calculator.a = 10;
    calculator.b = 20;

    // computed로 특정 값 캐싱

    const sum = computed(() => {
        console.log("계산중이예요!');
        return calculator.a + calculator.b;
    });

    sum.observe(() => calculator.a); // a 값을 주시
    sum.observe(() => calculator.b); // b 값을 주시

    // 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만

    // 내부의 값이 바뀌면 다시 호출함
    // 즉, 여러번 호출해도 계산중이예요가 처음 한번만 뜨지만 값이 바뀌면
    // 새로 계산된다.
    // 마치 리액트에서 useCallback의 2번째 인자인 []에 바뀔 값들을 넣는 것 처럼 되는 거 같다.

#### autorun

autorun은 reaction이나 computed의 observe 대신에 사용 될 수 있는데, autorun으로 전달해주는 함수에서 사용되는 값이 있으면 그 값을 주시하여 그 값이 바뀔 때마다 함수가 주시되도록 해준다. 여기서 만약에 computed로 만든 값의 .get() 함수를 호출해주면, 하나하나 observe 해주지 않아도 된다.

    import { observable, reaction, computed, autorun } from 'mobx';

    // Observable State 만들기
    const calculator = observable({
    a: 1,
    b: 2
    });

    // computed 로 특정 값 캐싱
    const sum = computed(() => {
    console.log('계산중이예요!');
    return calculator.a + calculator.b;
    });

    // **** autorun 은 함수 내에서 조회하는 값을 자동으로 주시함
    autorun(() => console.log(`a 값이 ${calculator.a} 로 바뀌었네요!`));
    autorun(() => console.log(`b 값이 ${calculator.b} 로 바뀌었네요!`));
    autorun(() => sum.get()); // su

    calculator.a = 10;
    calculator.b = 20;

    // 여러번 조회해도 computed 안의 함수를 다시 호출하지 않지만..
    console.log(sum.value);
    console.log(sum.value);

    calculator.a = 20;

    // 내부의 값이 바뀌면 다시 호출 함
    console.log(sum.value)

#### class 문법을 사용하면 조금 더 깔끔해진다.

decorate함수를 이용하면 MobX에 신기하게 적용이 됨!!

action을 사용함에 있어서의 이점은 나중에 개발자도구에서 변화의 세부정보를 볼 수 있고, 변화를 한꺼번에 일으켜서 변화가 일어날 때 마다 reaction들이 나타나는 것이 아니라, 모든 액션이 끝나고 난 다음에서야 reaction이 나타나게끔 해줄 수 있다.

액션을 한꺼번에 일으키는건, transaction을 통해 할 수 있다.

#### decorator 문법으로 더 편하게!

decorator 문법은 일종의, 자바스크립트 사투리라고 생각하면 된다. 정규 문법은 아니지만, bable 플러그인을 통하여 사용할 수 있는 문법이다. 이 문법을 사용하면 decorate 함수가 더 이상 필요하지 않다;


    import { observable, computed, autorun, action, transaction } from 'mobx;

    class GS25 {
        @observable basket = [];

        @computed
        get total() {
            console.log('계산중입니다..!');
            // reduce 함수로 배열 내부의 객체의 price 총합 계산
            
            return this.basket.reduce((prev, curr) => prev + curr.price, 0);
        }

        @action
        select(name, price) {
            this.basket.push({name, price});
        }

    }

    const gs25 = new GS25();
    autorun(() => gs25.total); // total이 바뀌는 것을 주시하는 거임
    autorun(() => {
        if (gs25.basket.length > 0) {
            console.log(gs25.basket[gs25.basket.length -1]);
        }
    });
    // 새 데이터 추가 될 때 알림

    transaction(() => {
        gs25.select('물', 800);
        gs25.select('물', 800);
        gs25.select('포카칩', 1500);
    });

    console.log(gs25.total);

transaction을 통해 계산 작업은 처음 한번, 그리고 transaction이 끝나고 한번 호출 되게 된다. 새 데이터가 추가 될 때마다 알리는 부분도 3개를 다 추가하고 나서야 딱 한번 실행 됨.
@ 붙여서 함수 지정 해주는 것이 decorator 문법인가 보다!!
뭔가 자바에서 많이 본듯한 기분!
MobX를 사용하는 대부분의 예제는 이 Decorator를 사용! 아무래도, 사용하는 편히 훨씬 편하다. 하지만 없이도 사용하는 것에는 지장이 안 간다.


