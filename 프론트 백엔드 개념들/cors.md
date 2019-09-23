## cors란??

Ajax에는 Same Origin Policy라는 원칙이 있음
 - 현재 브라우져에 보여지고 있는 HTML을 내려준 웹서버(Origin- 동일 도메인, 동일 port, ehddlf vmfhxhzhf)dprpaks 멈ㅌ dycjddmf qhsof tn dlTdma
 - CORS가 미 구현된 웹브라우저에서는 다른 도메인간 통신이 불가능
 - 우회 방법으로 JSONP, IFRAME IO, CrossDomain Proxy 등이 고안됨(Get만 허용 및 보안취약, 동기호출안됨 등 문제있음)
 - HTML5 에서 다른 도메인 간 통신이 가능한 스펙이 추가되었는데 바로 CORS이다.
 
 
 --------------------------
 
 처음 전송되는 리소스의 도메인과 다른 도메인으로부터 리소스가 요청될 경우 해당 리소스는 cross-origin HTTP 요청에 의해 요청된다
 예를 들어, http://domain-a.com으로부터 전송되는 HTML 페이지가 <img> src 속성을 통해 http://domain-b.com/image.jpg
 를 요청하는 경우.. 
 
 보안 상의 이유로 브라우저들은 스크립트 내에서 초기화되는 cross-origin HTTP 요청을 제한한다.
 예를 들면, XMLHttpRequest는 same-origin 정책을 따르기에, XMLHttpRequest를 사용하는 웹 애플리케이션은 
 자신과 동일한 도메인으로 HTTP 요청을 보내는 것만 가능. 웹 애플리케이션을 개선시키기 위해,
 개발자들은 브라우저 벤더사들에게 XMLHttpRequest가 cross-domain을 요청할 수 있도록 요청했다.
 
 CORS는 웹서버에게 cross-domain 데이터 전송을 활성화하는 cross-domain 접근 제어권을 부여한다.
 모든 브라우저들은 cross-origin HTTP 요청의 위험성을 완화 시키기 위해 API 컨테이너에서 CORS를 사용한다.
 
 ---- -------------------------
 
 ### nodejs에서의 cors
 
 SPA(Single Page Applicaiton)의 경우에는, RESTful API 기반으로 비동기 네트워크 통신을 하기 때문에
 API 서버와 웹 페이지 서버가 다를 수 있다. 이런 경우에 API 서버로 요청을 할 시에 CORS 제한이 걸리게 된다.
 
 이를 해결 하기 위한 가장 간단한 바업ㅂ은, 서버(API 서버)의 응답 헤더를 변경해주는 것이다.
 서버의 헤더 중에는 Acess-Control-Allow-Origin라는 프로퍼티가 있는데, CORS를 허용해 줄 도메인을
 입력하는 곳이다. 모든 곳에서 CORS를 허용하기 위해서는 모두를 의미하는 *를 입력하면 된다.
 
 Access-Control-Allow-Origin : *
 
 만약 특정 도메인에만 허용하길 원한다면
 
 Access-Control-Allow-Origin : 도메인, 도메인...
 이렇게 입력
 
 
 -------------
 ### express에서 cors 허용하기
 
 Express에서 CORS를 허용하려면, 위에서 언급한 방법처럼 헤더를 직접 변경해주는 방법이 있고, 미들웨어를 사용하는 방법이 있다.
 
 1. 
  app.all('/*', (req, res, next) => {
    res.header("Access-Control-Allow-Origindmf", "*");
    res.header("Access-Control-Allow-Origin", "X-Requested-With");
    next();
  });
  
  Access-Control-Allow-Origin을 위에서 언급한대로 설정, Access-Control-Allow-Headers를 설정.
  이는 요청이 Form이 아닌 비동기(AJAX) 요청임을 알려주기 위함.
  
  다른 방법으로는, 간단하게 express의 CORS 미들웨어를 적용하는 것. 
 위 방법보단 이걸 추천
 
 npm install cors로 cors 모듈 설치
 
 그리고 
 const cors = require('cors') 한다음
 
app.use(cors());  시작 부분에 추가

그 밑에 app.get~~ post~~ 등등을 쓰면 된다

위처럼 미들웨어를 사용할 경우, 모든 CORS 요청을 허용할 때 간단하게 한줄로 가능.

------------------------------

리액트와 express 서버를 구현할시 리액트에서 proxy를 설정하고 express로 요청을 보내면
cors 오류가 떴었는데 cors 모듈을 사용하여 설정하니 깔끔하게 해결이 되었다!
