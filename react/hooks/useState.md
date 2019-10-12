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


