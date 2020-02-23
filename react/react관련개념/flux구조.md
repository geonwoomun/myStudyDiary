# Flux 구조

여러 채용공고를 보니깐 Flux or Redux 구조에 대한 이해가 자격요건에 들어가 있어서 찾아보게 되었다.

Flux 패턴은 React.js처럼 데이터 흐름이 단방향으로 전달되는 소프트웨어 개발에서 사용된다.
물론 Flux 패턴을 사용하지 않아도 개발은 가능하다.

react.js에서는 부모컴포넌트에서 자식 컴포넌트로 밖에 props를 못 보내기 때문에 이러한 단방향 데이터 흐름의 소프트웨어에서 데이터를 효율적으로 관리하기 위해 Flux 패턴이 나왔다.

Action -> Dispatcher -> Store => View

View는 react 컴포넌트 Action은 View에서 사용자가 취한 액션, Dispatcher는 중앙 통제소? Store는 View에 보여질 데이터를 모아놓은 저장소라고 생각..!

View에서 Action이 발생하면 Dispatcher는 해당 Action을 처리하기 위한 적절한 Store를 찾아서 전달한다. Store는 Dispatcher에서 들어온 요청을 뚝딱뚝딱 처리하여 데이터가 변화되었음을 감지하면 해당 View를 재 렌더링한다.

그니깐 그냥 Redux 같은 상태관리 라이브러리의 구조를 말하는 것 같다.

View에서 Action을 dispatch를 통해 발생시킨다 -> middleware or reducer가 해당 Action이 일어나면 지정해놓은 로직이 일어나고 store에 저장되어있는 state가 업데이트 됨.

view가 중앙의 dispatcher를 통해 action을 전파. 어플리케이션의 데이터와 비지니스 로직을 가지고 있는 store는 action이 전파되면 이 action에 영향이 있는 모든 view를 갱신. 이 방식은 특히 React의 선언형 프로그래밍 스타일 즉, view가 어떤 방식으로 갱신 해야 되는지 일일이 작성하지 않고서도 데이터를 변경할 수 있는 형태에서 편리하다.

