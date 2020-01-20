## react에서 MobX 사용해 보기!!!

이거 할려고 배우는거닿ㅎㅎ

MobX는 리액트 종속적이진 않지만, 리액트에서 쓰려고 만들어졌기 때문에 함께 사용하면 엄청난 시너지가 발생한다. 더 쉬운 글로벌 상태 관리는 물론이고, setState도 쓸 필요가 없게 된다.


#### 2-1 MobX가 리액트를 만나면

우리가 이전 섹션에서 decorator 문법을 통해서 더 편하게 MobX를 사용하는 방법을 배웠었는데, cra로 react 프로젝트를 만들면 기본적으로는 decorator를 사용하지 못 하기 때문에 따로 babel 설정을 해줘야 한다.

우선, decorator 없이 리액트에서 MobX를 사용하는 방법을 알아보자!

    npx create-react-app mobx-with-react
    cd mobx-with-react
    yarn add mobx mobx-react  
    yarn start

mobx랑 mobx-react를 설치해줘야 한다!! 이런건 redux랑 같은듯!!


##### 간단한 카운터를 만들어본다!!!


    import React, { Component } from 'react';
    import { decorate, observable, action } from 'mobx';
    import { observer } from 'mobx-react';

    class Counter extends Component {
        number = 0;

        increase = () => {
            this.number++;
        }

        decrease = () => {
            this.number--;
        }

        render() {
            return (
                <div>
                    <h1>{this.number}</h1>
                    <button onClick={this.increase}>+1</button>
                    <button onClick={this.decrease}>-1</button>
                </div>
            );
        }
    }

    decorate(Counter, {
        number : observable,
        increase : action,
        decrease : action,
    })
    
    export default observer(Counter);

간단하다. 뭔가 state도 사용하지 않고 뭔가 리액트스럽지가 않다... setState 없이 그냥 값 바꿔주면 알아서 렌더링이 된다. 어떻게 되냐면.. 코드 최하단에서 사용된 observer가 observable 값이 변할 때 컴포넌트의 forceUpdate를 호출하게 함으로써 자동으로 변화가 화면에 반영된다.

이게 성능상으로 과연 좋을까 걱정 될수도 있겠지만 놀랍게도 최적화가 많이 되어있어서 그 부분에 대해서는 크게 걱정할 필요가 없다.

이런식으로 , 리액트에서 Mobx를 사용할 땐 리덕스에서 사용했던 것처럼 다른 파일로 스토어를 만들 필요도 없고, 그냥 컴포넌트에 바로 적용해줄 수 있다. (필요하면 만들 수 있음)


#### Decorator 함께 사용하기

여기서, decorator를 사용하면 훨씬 더 편하게 문법을 작성할 수 있다. 그러려면 babel 설정을 해줘야한다. 

    yarn add @babel/plugin-proposal-class-properties @babel/plugin-proposal-decorators

그러고 나서 package.json을 열어서 babel 쪽을 찾아서 

    "babel": {
    "presets": [
      "react-app"
    ],
    "plugins": [
        ["@babel/plugin-proposal-decorators", { "legacy": true}],
        ["@babel/plugin-proposal-class-properties", { "loose": true}]
    ]
    }

설정.

    import React, { Component } from 'react';
    import { observable, action } from 'mobx';
    import { observer } from 'mobx-react';

    @observer
    class Counter extends Component {
        @observable number = 0;

        @action
        increase = () => {
            this.number++;
        }

        @action
        decrease = () => {
            this.number--;
        }

        render() {
            return (
                <div>
                    <h1>{this.number}</h1>
                    <button onClick={this.increase}>+1</button>
                    <button onClick={this.decrease}>-1</button>
                </div>
            )
        }
    }

    export default Coutner; // obsercer는 코드의 상단으로 올라감


#### 2-2 MobX 스토어 분리시키기

MobX에도 리덕스처럼 스토어라는 개념이 있다. 리덕스는 하나의 앱에는 단 하나의 스토어만 있지만, MobX에서는 여러개를 만들어도 된다. 이번에는, 한번 카운터의 상태관련 로직을 스토어로 따로 분리시키는 작업을 해본다.

스토어 만들기 


MobX에서 스토어를 만드는건 생각보다 간단하다. 리덕스처럼, 리듀서나, 액션 생성함수... 그런건 없다. 그냥 하나의 클래스에 observable 값이랑 함수들을 만들어주면 끝!

    import { observable, action } from 'mobx';

    export default class CoutnerStore {
        @observable number = 0;

        @action increase = () => {
            this.number++;
        }

        @action decrease = () => {
            this.number--;
        }
    }

#### Provider로 프로젝트에 스토어 적용

    import React from 'react';
    import ReactDOM from 'react-dom';
    import { Provider } from 'mobx-react'; // MobX 에서     사용하는 Provider
    import './index.css';
    import App from './App';
    import registerServiceWorker from './   registerServiceWorker';
    import CounterStore from './stores/counter'; // 방금    만든 스토어 불러와줍니다.

    const counter = new CounterStore(); // 스토어   인스턴스를 만들고

    ReactDOM.render(
      <Provider counter={counter}>
        {/* Provider 에 props 로 넣어줍니다. */}
        <App />
      </Provider>,
      document.getElementById('root')
    );

    registerServiceWorker();

#### inject로 컴포넌트에 스토어 주입

inject 함수는 mobx-react에 있는 함수로서, 컴포넌트에서 스토어에 접근할 수 있게 해준다. 정확히는, 스토어에 있는 값을 컴포넌트의 props로 'ㅜ입'을 해준다.

    import React, { Component } from 'react';
    import { observer, inject} from 'mobx-react';

    @inject('counter')
    @observer
    class Counter extends Component {
        render(){
            const { counter } = this.props;
            return (
                <div>
                    <h1>{counter.number}</h1>
                    <button onClick={counter.increase}>+1</button>
                    <button onClick={counter.decrease}>-1</button>
                </div>
            )
        }
    }
    export default Counter;

위와 같이 inect('스토어이름') 을 하시면 컴포넌트에서 해당 스토어를 props로 전달받아서 사용할 수 있다.
아니면 특정 값만 받아오려면

    @inject(stores => ({
      number: stores.counter.number,
      increase: stores.counter.increase,
      decrease: stores.counter.decrease,
    }))

이런식으로 하면 된다.