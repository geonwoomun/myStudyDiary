# redux and mobx 공부 

### 시작 : 2019.10.29

redux와 mobx는 다들 react랑 써야한다고 생각 할 수도 있지만 사실 전혀 상관없다. 다른거랑 같이 써도 되지만 대부분 react랑 같이 쓰기는 한다.

redux부터 배워보자.

### redux

redux는 vue나 angular랑도 같이 쓸 수 있지만 둘다 자신만의 상태관리 방법이 있기 때문에 그것을 주로 쓰고 react는 공식 홈페이지 소개를 보면 상태관리가 없기 때문에 상태관리의 선택지가 생긴다. redux라던지 아니면 mobx라던지.. 
요즘 또 context api라는게 있는데 그것도 대안 중 하나가 될 수 있다. context api가 redux mobx를 대체할 수 있냐 라고 묻는 사람들이 많은데 이렇게 생각하면 좋다. jquery가 javascript를 대체할 수 있나요?
context api는 javascript라고 생각하면 되고 jquery가 react redux, mobx react. 대체가 하죠.
javascript로 jquery를 만들었듯이 context api로 redux, mobx를 만들었기 때문에. 가능은 한데
jquery는 편하니깐 쓴다~ context api 안 쓰고 redux랑 mobx를 쓰는 이유가 기능들이 이미 구현이 다 되어있기 때문이다.

context api랑 useReducer hook으로 코딩을 하다보면 자신이 redux를 구현하고 있는걸 보게 된다.
어차피 redux mobx처럼 만들꺼 처음부터 쓰는 것이다.



redux 쓰는 이유.

react를 할 때 
componentA - state
componentB - state
componentC - state
가 있다고 했을 때 각각 안에서 자신의 state만 바꾸는것은 그렇게 어렵지 않다.

그런데 C가 B의 자식이 되었을 때 부모 B 컴포넌트가 자식 C컴포넌트의 state 값을 바꾸고 싶고
자식 C컴포넌트가 부모 B컴포넌트의 state값을 바꾸고 싶을 때. 컴포넌트가 이렇게 달라질 때 엄청 헷갈린다. 

부모가 자식 컴포넌트의 state값을 바꾸는건 불가능... 자식이 부모 컴포넌트의 state값은 props로 state를 바꾸는 method를 하나 내려주면 된다. 

만약에 component가 더 깊어지면 A의 자식 B 의 자식 C 이렇게 되면 state값을 관리하기가 어려워진다. 
이것들의 state 값들을 관리하기 쉽게 하기 위해서 context api가 나온 거고 그것에 편의 기능을 추가한것이 redux, mobx이다.

redux를 쓰면 redux { compA, compB, compC } 안에 다 관리를 하는 것. 그래서 component안에 state를 안 써도 된다. 안 쓸수 있다지 안 써야한다는 아님. 

redux가 A,B,C의 state를 가지고 온 것이니깐 state를 안 써도 되겠구나. 하지만 반드시 안 써야 할까? 이거는 생각을 좀 해봐야한다. 우리가 redux를 왜 썼냐를 생각을 해봐야한다. 컴포넌트 간에 state가 넘다들기 힘들기 때문에 redux를 쓴다고 했다. B에 있는 state가 A와 C는 전혀 상관이 없고 B에만 사용된다고 하면 B에서 state를 사용해도 된다. 왜냐하면 redux는 컴포넌트 간 겹치는 state를 편하게 쓰기 위해서 사용하는 것이기 때문에. 서로 간의 관계가 생기면 redux에다가 다 몰아넣는게 더 편할 것이다. 

redux는 store(데이터 묶음) 를 중심으로 생각하는게 좋다. 

    state (단방향)
    {
        compA : 'a',
        compB : 12,
        compC : null
    }

    store(데이터 묶음)

전체를 스토어라고 부르고 스토어 안에 있는 데이터를 state라고 부른다. 한가지 방향으로 밖에 못 바꾼다. 
state를 바꾸기 위해서 action을 만들어준다. action은 state를 어떻게 바꿀지에 대한 행동을 적어 놓은 것.
    action
    {
        a -> b
    }

a를 b로 바꾼다는 액션을 하나 만든다. 그 액션을 실행 실행은 dispatch라고 한다. 액션을 실행하게 되면 compA의 'a'가 'b'로 바뀐다. state를 action의 어떻게 바꾼다인데, dispatch가 실행해서 그것을 state를 바꾼다.
dispatch도 함수. dispatch(action) 이런식으로 실행을 하는데 기록이 남는다. history가 남음. 에러들을 찾아낼 때 엄청 편하다. 에러가 엄청 적게 난다. 개발 할때도 기록. 기록이 남기 때문에 타임머신 기능을 쓸 수가 있다.
개발하다가 이 action이전으로 돌가가고 싶다고 하면 돌아갈 수 있다. redux를 쓰면 에러가 거의 안난다. 그러면 내가 정말 멍청했구나라는 생각이 들게된다. 

대신에 단점도 있다. 액션들을 미리미리 다 만들어놓아야 한다. history, 즉 타임머신 기능을 쓰려면 state 들의 불변성이라는 개념을 지켜야한다. state 객체를 매번 새로 만들어줘야한다.

Reducer라는게 나온다. state가 있고 미리 만들어둔 action들 그 액션이 dispatch로 실행 되면 Reducer에서 실제로 새로운 객체를 만들어내서 state에 덮어쓴다? 대체된다. dispatch랑 Reducer사이에 끼는게 middleware이다.

말로는 알기 어려우니 실제 코딩으로 가보자~_~