# Context

요즘 리액트 공식 문서를 보면서 공부를 하고 있다.

context를 이용하면 단계마다 일일이 props를 넘겨주지 않고도 컴포넌트 트리 전체에 데이터를 제공할 수 있습니다.

일반적인 React 애플리케이션에서 데이터는 위에서 아래로 (즉, 부모로부터 자식에게) props를 통해 전달되지만, 애플리케이션 안의 여러 컴포넌트들에 전해줘야 하는 props의 경우 이 과정이 번거로울 수 있다. context를 이용하면, 트리 단계마다 명시적으로 props를 넘겨주지 않아도 많은 컴포넌트가 이러한 값을 공유하도록 할 수 있다.


### 언제 context를 써야할까?

context는 React 컴포넌트 트리 안에서 전역적이라고 볼 수 있는 데이터를 공유할 수 있도록 고안된 방법이다. 그러한 데이터로는 현재 로그인한 유저, 테마, 선호 하는 언어 등이 있다.
context를 사용하면 중간에 있는 엘리먼트들에게 props를 넘겨주지 않아도 된다.

### context를 사용하기 전에 고려할 것

context의 주된 용도는 다양한 레벨에 네스팅된 많은 컴포넌트에게 데이터를 전달하는 것. context를 사용하면 컴포넌트를 재사용하기 어려워지므로 꼭 필요할때만 사용!

여러 레벨에 걸쳐 props 넘기는 걸 대체하는 데에 context보다 컴포넌트 합성이 더 간단한 해결책일 수도 있다.


# API

#### React.createContext

    const MyContent = React.createContext(defaultValue);

Context 객체를 만든다. Context 객체를 구독하고 있는 컴포넌트를 렌더링할 때 React는 트리 상위에서 가장 가까이 있는 짝이 맞는 Provider로부터 현재값을 읽는다.

defaultValue 매개변수는 트리 안에서 적절한 provider를 찾지 못 했을 때만 쓰이는 값. 컴포넌트를 독립적으로 테스트할 때 유용한 값이다. Provider를 통ㅇ해 undefined를 보낸다고 해도 구독 컴포넌트들이 defaultValue를 읽지는 않는다.

#### Context.Provider

    <MyContext.Provider value={/* 어떤 값*/}>

Conetxt 오브젝트에 포함된 React 컴포넌트인 Provider는 context를 구독하는 컴포넌트들에게 context의 변화를 알리는 역할을 한다.

Provider는 value prop을 받아서 이 값을 하위에 있는 컴포넌트에게 전달한다. 값을 전달받을 수 있는 컴포넌트의 수에 제한은 없다. Provider 하위에 또 다른 Provider를 배치하는 것도 가능하며, 이 경우 하위 Provider 값이 우선시 된다.

Provider 하위에서 context를 구독하는 모든 컴포넌트는 Provider의 value prop가 바뀔 때 마다 다시 렌더링 된다. Provider로부터  하위 consumer로의 전파는 shouldComponentUpdate 메서드가 적용되지 않으므로, 상위 컴포넌트가 업데이트를 건너 뛰더라도 consumer가 업데이트된다.


#### Context.Consumer

    <MyContext.Consumer>
        {value => /* context 값을 이용한 렌더링*/}
    <MyContext.Consumer>

context 변화를 구독하는 React 컴포넌트입니다. 함수 컴포넌트 안에서 context를 읽기 위해서 쓸 수 있다.

Context.Consumer의 자식은 함수여야한다. 이 함수는 context의 현재값을 받고 React 노드를 반환한다. 이 함수가 받는 value 매개변수 값은 해당 context의 Provider 중 사우이 트리에서 가장 가까운 Provider의 value prop과 동일하다. 사우이에 Provider가 없다면 value 매개변수 값은 createContext()에 보냈던 defaultValue와 동일 할 것이다.

### Context.displayName

Context 객체는 displayName 문자열 속성을 설정할 수 있다. React 개발자 도구는 이 문자열을 사용해서 context를 어떻게 보여줄 지 결정한다.


## 주의사항

다시 렌더링할지 여부를 정할 때 참조를 확인하기 때문에, Provider의 부모가 렌더링 될 때마다 불필요하게 하위 컴포넌트가 다시 렌더링 되는 문제가 생길 수도 있다. 예를 들어 아래 코드는 value가 바뀔 때마다 매번 새로운 객체가 생성되므로 Provider가 렌더링 될 때마다 그 하위에서 구독하고 있는 컴포넌트 모두가 다시 렌더링 될 것이다.
이를 피하기 위해서는 값을 부모의 state로 끌어올려라.