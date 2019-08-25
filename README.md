# myStudyDiary 2019/08/25

## git

branch : 브랜치를 만들어서 각자 작업을 한다음에 master에 merge를 하여 합칠 수 있다.
        ex) master 브랜치 말고 mun 브랜치 kwon, pyo 브랜치 등등을 만들어 
        각자 master에서 pull을 받은 다음에 각자의 브랜치에 푸쉬를 하고 ..

git branch : 브랜치 목록 전체를 확인 할 수 있다.

git branch <이름> : ex) git branch mun  mun이라는 브랜치를 만든다.

git checkout mun : 현재 브랜치에서 mun 브랜치로 바꾸는 것. 브랜치 전환

git checkout -b <이름> : -b 옵션을 넣으면 브랜치 작성과 전환을 동시에 할 수 있다.


git branch -f master mun 

merge : git lab에서는 팀을 만든 다음에 merge request를 보내면 merge를 할 수 있다.

master 브랜치에 mun을 넣기 위해서는 master 브랜치에 'HEAD'가 위치 해야한다.

git checkout master 해서 마스터 브랜치로 변경.

git merge mun 하면 마스터 브랜치가 가리키는 커밋이 mun가 같은 위치로 이동.

브랜치 삭제 : git branch -d <이름>


마스터로 이동한 다음에 git merge mun 하면 master가 mun과 합쳐진다.
그리고 mun으로 이동한 다음에 git merge master를 하면 mun 이 master와 같아진다.

그럼 끝...

다른 방법도 있었는데 생각해 봐야겠다. 


## 헤로쿠 배포 하는법

express + react로 이루어진 웹앱 배포방법

react는 create-react-app으로 생성하였다.

현재 앱은 
제일 상위 폴더에 client,config, database, models, node_modules, routes 등이 있다.
그리고 server.js 에는 서버에 대한 주된 내용이 들어있다.
package.json 파일에
scripts 부분에
"start": "node server.js",
"server": "nodemon server.js",
"client": "npm start --prefix client",
"dev": "concurrently --kill-others-on-fail \"yarn run server\" \"yarn run client\"",
"heroku-postbuild": "NPM_CONFIG_PRODUCTION=false npm install --prefix client && npm run build --prefix client"
를 추가한다.


client  폴더에 리액트 앱들이 들어있고,

내가 작성한 server.js 를 본다

server.js의 상단 부분에 
const path = require('path'); 를 추가.

그리고 api 쪽들의 req, res 들이 끝난 다음 위치에 


if(process.env.NODE_ENV === "production"){
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, "client", "build", "index.html"))
    })
}

추가 헤로쿠에 배포를 하면 NODE_ENV 가 production 으로 바뀌어서
production 일 때만 이걸 실행하겠다는 의미임.
모든 요청을 /client/build/index.html로 보내겟다는 의미.

cd client를 해서 npm build 또는 yarn build를 통해 배포를 위한 파일들을 만든다.
build 폴더에는 index.html 파일과 static 폴더에 js, css, media 폴더들이 생긴다.
리액트로 만든 파일들이 배포 환경에 맞게 알아서 만들어진다.

npm i councurrently를 다운 받아서 
개발 환경에서 하나의 명령어로 2개의 명령어를 동시에 실행 할 수 있게 한다.
개발 환경에서 완벽하게 되면 
heroku에 빌드를 해본다.

헤로쿠 cli를 설치한다.
헤로쿠에 new 앱을 만든다. 그리고 
배포하고자 하는 폴더로 와서

heroku login을 한다. (윈도우에서는 cmd에서만 되는듯

git add .
git commit -am "commit"
heroku git:clone -a <앱 이름>
git push heroku master를 하면 완료.

그럼 헤로쿠 쪽에서 알아서 package.json의 scripts에 있는 "heroku-postbuild"가 실행 되면서 알아서 배포를 완료한다.



p.s ) package-lock.json 이 있어야 하는 듯. 
package-lock.json이란 ?

기본적으로 npm install을 실행하게 되면 package.json의 dependencies 에 적혀있는 모든 패키지들이 설치가 된다.

배포시에는 package에 관련된 종속성을 고정시키기 위해 package-lock.josn을 사용해야 할 때가 있다.
따라서, 운영에 있는 개발자는 pacakge lock을 건후 package-lock.json을 git에 업데이트 하게 된다.
개발자들이 일일이 npm install을 한후 실행하는 것이 어려우므로 install 및 빌드 command를 package.json의 scripts에 포함시키는 경우가 있다. 한마디로 파일이 생성되는 시점의 의존성 트리에 대한 정보를 가지고 있다. 


package-lock.json 은 npm을 사용하여 package.json 파일을 또는 node_moduels 트리를 수정하면 자동으로 생성되는 파일이다. 

package-lock.json이 필요한 이유:

package.json 파일의 의존성 선언에는 version range가 사용되는데, 이는 특정 버전이 아니라 버전의 범위를 의미한다. 예를들어 보자면, npm i express를 실행하게 되면 package.json 파일에는 ^4.16.3으로 버전 범위가 추가된다. 이 package.json을 기반으로 npm i를 실행하면 npm i을 실행하면 현재는 4.16.3 버전이 설치 되지만 새로이 express의 마이너 패치가 이러우진 버전이 퍼블리시 되어있따면 동일한 package.json 파일로 npm i을 실행해도 4.16.4 이나 4.17.1 같은 다른 버전이 설치 될 수 있다는 것이다. 간혹 업데이트 된 버전이 오류를 발생시키는 경우가 있기 때문에 안정성을 위해 package-lock.json은 매우 중요.

1. pacakge-lock.json 파일은 의존성 트리에 대한 정보를 가지고 있으며, 작성된 시점의 의존성 트리가 다시 생성될 수 있도록 보장해준다.
2. pacakge-lock.json 파일은 저장소에 꼭 같이 커밋해야 한다.
3. package-lock.json 파일은 node_modules 없이 배포하는 경우 반드시 필요하다.


참고자료 : 
https://www.youtube.com/watch?v=71wSzpLyW9k&t=558s
https://www.youtube.com/watch?v=eHWK4Pu6dmE
https://medium.com/@han7096/package-lock-json-%EC%97%90-%EA%B4%80%ED%95%98%EC%97%AC-5652f90b734c


## aws ec2 배포하는 법

express + react로 이루어진 웹앱 배포방법

이번엔 블로그에 package-lock.json을 .gitignore에 추가하여 넣지 말라고 해서 넣지 않았다.

.gitignore는 git에 올릴 때 이 파일들은 올리지 마세요 라고 명명하는 것이다.
기본적으로는 node_modules를 적는다.
적는 이유는 내 생각에는 용량이 너무 커져서 그런 것 같다.
그래서 package.json의 dependencies에 package들을 적어 놓고 npm install로 각자 다운을 받는거 같다.

ec2에는 nginx까지 활용해서 했다.

ec2를 만드는거는 aws에 로그인을 한다음 인스턴스 생성.
나동빈이나 아래의 유튜브 강의를 보면 만드는 법이 있다.
key파일 확장자명 .pem을 만들어 관리자 모드 cmd에서 key 파일이 있는 폴더로 이동한 후
aws ec2에 연결하기를 누르면 있는 ssh ~ 로 시작하는 걸 붙여 넣으면 접속 가능.
(pem은 사용자 권한을 바꿔주어야함 유튜브에 설명 있음.)

마찬가지로 맨 위부분에 
const path = require('path');
를 추가해주고

app.use(express.static('frontend/build'));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'frontend', 'build','index.html'));
})

부분 추가. frontend로 하든 client로 하든 상관없다.

그리고 자신의 코드를 깃허브에 올려서 다운 받을 수 있게 한다.

깃랩에 올리니깐 프라이베이트라 그런가 aws에서 clone할 때 오류가 떠서 되지 않아서 그냥 github로만 했다.

그리고 블로그 아래에 나오는데로 실행~

노드 버전과 npm 버전도 맞춰준다.

그리고 블로그에 영어지만 설명이 잘 되어있어서 그대로 따라하면 된다. 잘모르겠으면 유튜브 보고 참고

nginx를 사용하려면 설치를 한 후

cd /etc/nginx/sites-available로 이동 후

sudo vim {{your cloned repo`s name}}

server {
    listen 80;
    location / {
        proxy_pass http://{{PRIVATE IP FROM EC2 INSTANCE}}:{{NODE-PROJECT-PORT}};
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

이런식으로 해준다.

ec2 인스턴스에 있는 private ip 와 server.js에 연 포트 번호를 적어준다(나는 5000번)

그리고 블로그 대로 진행~

pm2를 깔고~

sudo npm install 해서 node_modules 를 깔고

client(frontend)로 가서 sudo npm install을 해준다.
그리고 client 쪽에서 sudo npm run build를 한다음

그 밑에 부분은 mongodb 부분이라 하지 않고 나는 aws rdb를 통해 연결을 했다.

그리고 나서 pm2 start server.js를 해주고

sudo service nginx stop && sudo service nginx start를 통해 nginx를 다시 실행시켜주면 배포 완료!

오류가 나면 윈도우에서 개발환경에서 제대로 실행 되는지를 확인 해본다.



p.s) pm2란 ?

pm2는 생산 프로세스 관리자로 서버 인스턴스들에 대한 로드 밸런싱과 더불어 node.js의 스케일 업이나 스케일다운을 돕는다.
프로세스들이 계속 실행할 수 있는 환경을 제공한다.
처리하지 못한 예외에 의해 쓰레드가 죽음으로 인해 어플리케이션이 죽는 현상을 방지한다.
로드 밸런서 역할도 할 수 있다.

npm install pm2 -g 를 통해 pm2를 설치 할 수 있다.
pm2 start server.js 를 통해 실행 할 수 있다.
pm2 show [id] : 실행되고 있는 id에 해당하는 정보를 출력 할 수 있다.
pm2 logs : log를 볼 수 있다.


nodemon도 있는데 인터넷 상 문서에 의하면 개발용은 nodemon 이 좋고 라이브 서비스에서 사용한다면 pm2가 좋은거 같다는 말이 많은 것 같다.

둘다 javascript를 수정 할때마다 어플리케이션을 재실행하지 않아도 바로바로 수정사항을 반영시켜준다.

노드몬도 npm install nodemon -g 로 설치하고
nodemon server.js로 실행한다.


참고자료 :

https://www.youtube.com/watch?v=fIeIzHMC4BQ
https://medium.com/@rksmith369/how-to-deploy-mern-stack-app-on-aws-ec2-with-ssl-nginx-the-right-way-e76c1a8cd6c6
https://tech.cloud.nongshim.co.kr/2018/10/16/%EC%B4%88%EB%B3%B4%EC%9E%90%EB%A5%BC-%EC%9C%84%ED%95%9C-aws-%EC%9B%B9%EA%B5%AC%EC%B6%95-8-%EB%AC%B4%EB%A3%8C-%EB%8F%84%EB%A9%94%EC%9D%B8%EC%9C%BC%EB%A1%9C-route-53-%EB%93%B1%EB%A1%9D-%EB%B0%8F-elb/

등등

