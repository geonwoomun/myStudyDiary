# 리액트만 하다 리액트 훅스를 조금씩 공부해보면서..

리액트 훅스는 함수형 프로그래밍을 할 수 있게 해준다. class를 쓰며 객체지향적? 이던 기존 리액트와는 다르게..
함수형이기에 코드는 더 짧고 알아보기 쉬워진다. 

## useState

useState 는 기존의 state, this.setState를 대신 한다고 보면 될것 같다.

    import React, { useState } from 'react';

와 같이 해주면 useState를 사용할 수 있게 된다.

그리고 

    const [ title, setTitle ] = useState('리액트');

라고하면 title이라는 state와 title을 바꿀 수 있는 setState같은 setTitle이 만들어지게 된다.
useState 안에 넣는건 초기값이고 안 넣을 수도 있다.

그리고 

    const changeTitle = () => setTitle(title + 1)

이런식으로 하고 changeTitle 함수를 사용하면 리액트1 리액트11... 이런식으로 될것이다...

useState는 state, this.setState 등으로 인해 엄청 길어지던 리액트의 코드를 짧고 간결하게 만들어주었다.


---------------------------------------------------------------

const [count, setCount] = useState(0) 이 의미하는 것은 무엇일까

앞의 [count, setCount] 부분이 생소할 수 있다.
위 문법을 "배열 구조 분해" 라고 한다.
useState를 사용하면 배열로 [초기값, 앞의 값을 재설정해주는 함수] 이런식으로 반환이 되기 때문에 저렇게 변수를 선언할 수 있다.

react hooks 공식문서를 보다보니 클래스 컴포넌트의 this.setState와 달리 staet를 갱신하는 것은 병합하는 것이 아니라 대체하는 것입니다. 라고 되어있다.
무슨 뜻일까..
아마 클래스에서는 기존 state를 이전 prevProps로 보내고 기존 state를 현재 state로 받고 바꿀값을 바꿔주는..? 그런식이였다면
hooks에서는 그냥 일반 변수처럼 대체하는 그런 방법이라는 거 같다...

state는 보통 obj이였고 hooks는 하나씩 set을 할 수 있으니깐