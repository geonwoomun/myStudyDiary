# NEXT.JS란

ZEIT에서 만든 리액트 프레임워크이다. 
사용하는 언어는 ts와 js이다.

Netflix, Github, Twitch, Hulu, Uber 등에서 사용중이다.

React는 ui를 만들기 위한 라이브러리라서 핵심적인 기능만 제공하고 그 외의 기능은 서드파티 라이브러리로 제공한다. 결국 뭔가 제대로 만들려면 React하나로는 부족하고 여러가지 라이브러리를 조합해야한다는 것이다.

NEXT.JS는 React로 웹을 개발할 때 필요한 많은 기능들을 기본적으로 제공한다.
SSR이라고 불리는 서버사이드렌더링을 기본으로 사용하고 파일 시스템 기반의 라우팅 기능을 제공한다.

리액트로 화면을 만들면 새로고침을 할 때 화면이 깜빡거린다 SSR은 깜빡거림이 없고 렌더링도 빠르다. SEO를 적용하기에도 유리하다. 파일 기반의 라우팅은 아주 간단히 페이지를 추가할 수 있다.

ZERO configuration으로 제공. 아무 설정 없이 이런 기능을 사용할 수 있다. 최근 리액트로 개발을 하려고 하면 설정할 것이 많아 내가 babel을 하는건지 webpack을 하는건지 개발을 하는건지 알기가 어려울 때가 많은데 NEXT.JS를 사용하면 그런걱정 없이 개발에만 집중할 수 있다.

성능적인 면에서도 세세한 부분을 신경썼다. 코드 스플리팅, 구글 크롬 개발팀과 협력.
문서와 예제에서도 신경을 많이 썼음. NEXT.JS는 기본적으로 정적인 페이지를 제공하지만 동적인 페이지도 만들 수 있다.

그동안 귀찮게 세팅하고 불편했던 부분은 없애고 리액트 코드 자체에만 집중할 수 있게 해준다.