# Redux-saga란 ?

redux-saga는 리액트 / 리덕스 애플리케이션의 사이드 이펙트, 예를 들면
fetching이나 브라우저 캐시에 접근하는 순수하지 않은 비동기 동작들을, 더 쉽고 좋게 만드는 것을 목적으로 하는 라이브러리이다.

createSagaMiddle로 Redux Store에 연결.

saga는 오브젝트들을 redux-saga 미들웨어에 yield하는 제너레이터 함수로 구현되어있다. yield된 오브젝트들은 미들웨어에 의해 해석 되는 명령의 한 종류이다. yield는 잠시 멈추고 next()를 실행하면 다음 코드로 진행하게 되는 비동기 작업을 동기적으로 만들어줄 수 있는 녀석인데, saga에서 yield 다음에 saga의 effect들 (put, take, 등등.. ) 을 쓰면 코드가 실행되고 나서 자동으로 next()를 해줘서 다음 코드로 넘어가게 만들어준다.

delay는 몇초간 지연시키고 난 후 다음으로 넘어가게 해준다.
put은 우리가 이펙트라고 부르는 것 중 하나인데, 이펙트는 미들웨어에 의해 수행되는 명령을 담고있는 간단한 자바스크립트 객체이다. put은 redux store에 dispatch하는 역할을 한다. 그니깐 dispatch 처럼 action을 인자로 넣어서 실행시켜줘야한다!!

takeEvery는 해당 액션이 들어올 때마다 사가에서 캐치해서 다음 함수를 실행하게 한다.

    import { delay } from 'redux-saga';
    import { takeEvery, put } from 'redux/saga/effetcs";
    
    function* ageUpAsync() {
        yield delay(4000);
        yield put({ type : "AGE_UP_ASYNC", value : 1});
    }
    function* watchAgeUp() {
        yield takeEvery("AGE_UP", ageUpAsync);
    }

이런식으로 짜놓으면 "AGE_UP"이라는 액션이 들어오면 SAGA가 그거를 알아채고 ageUpAsync라는 제너레이터 함수를 실행시키는 것이다. 그러면 ageUpAsync 함수가 실행되고 4초를 기다린후에 AGE_UP_ASYNC 액션을 put(dispatch) 해주는 것이다.

이런 사가들을 여러개 묶어서 사용하고 싶으면 all Effect를 사용해서 아래와 같이 만들어 사용 가능.

    import { all } from 'redux-saga/effects";

    export default function* rootSaga() {
        yield all([
            fork(watchAgeUp),
            call(watchIncrement); 
        ])
    }

fork와 call 둘다 함수를 실행시켜준다. fork는 비동기적으로 실행되는 것이고 call은 동기적으로 실행시켜준다. 순서대로... 어쨋든 해당 액션이 들어오면 그 함수가 실행되는 것.

takeEvery는 여러 같은 액션이 들어오면 여러개를 다 처리하는 것. takeLatest는 여러개의 같은 액션이 들어왔을 때 마지막의 하나만 처리하는 것. take는 한번만 받고 실행 종료됨. 그래서 거의 대부분이 여러 개의 액션을 받는 것을 기다려야 되기 때문에 takeEvery나 takeLatest를 사용 하고 

takeEvery는 클릭하는 게임 같은 것을 할 때 여러개 눌렸는데 하나만 올라가고 그러면 안 되기 때문에 takeEvery 사용.

로그인 같은 작업에는 여러번 눌려도 한번만 작동 되면 되기 때문에 메모리, 용량 등을 최대한 아끼기 위해 1번만 실행되게 하는 takeLatest 사용.
