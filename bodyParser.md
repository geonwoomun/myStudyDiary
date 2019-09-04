## body-parser란 ??

클라이언트 POST request data의 body로부터 파라미터를 편리하게 추출합니다.

body-parser가 없을 때의 문제점 : undefined

다음과 같은 데이터를 body에 담아 POST request를 보내고자 한다.

{
  userID: "아무거나",
  password : "아무거나"
}

서버단에서 express를 써서 POST request를 처리하는 방법은 다음과 같다.

const express = require('express');
const app = express();

app.post('/profile', (req, res) => {
  console.log(req.body);
})

그런데, 위 코드 기준 5번째 줄 console.log(req.body) 라인에서 undefined Error를 마주하게 됩니다.

req.body는 body-parser를 사용하기 전에는 디폴트 값으로 Undefined가 설정되기 때문이다.

### 해결방안은 body-parser이다.

body-parser를 설치 한다.

npm install body-parser

중간에 

const bodyParser = require('body-parser');
app.use(bodyParser().json());
을 적으면 body의 userID 값과 password를 읽어 낼 수 있다.

바디파서를 안쓰고 

app.use(express.json())을 써도 해결이 된다. //


app.use(express.urlencoded( {extended : false} ));

이 옵션이 false면 node의 querystring 모듈을 사용하여 쿼리스트링을 해석하고,
true면 qs모듈을 사용하여 쿼리스트링을 해석한다.

qs 모듈은 내장 모듈이 아니라 npm 패키지이며 querystring 모듈의 기능을 조금 더 확장한 모듈이다.


이전에는 POST와 PUT 요청의 본문을 전달 받으려면 req.on('data')와 req.on('end')로 스트림을 사용해야 했었다.

body-parser를 사용하면 그럴 필요가 없다.
이 패키지가 내부적으로 본문을 해석해 req.body에 추가해준다.


예름 들어 json 형식으로 {name : 'backback', book:'nodejs'}를 본문으로 보낸다면 req.body에 그대로 들어간다.
- URL-encoded 형식으로 name=backback&book=node.js를 본문으로 보낸다면
- req.body에 {name: 'backback', book: 'nodejs'}가 들어간다.





