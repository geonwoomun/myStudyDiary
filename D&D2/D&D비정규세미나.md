# D&D 비정규 세미나

## 1. 권희구

스타트업 내게 맞을까?
스타트업이 무엇인지 어떤 느낌인지 썰들 이야기들 위주로 공유
장단점을 알아본다.

스타트업 ? 아기 키우기..  스타트업도 아기 키우기처럼 스트레스를 엄청 받는다.

* 대기업 같은 경우는 청소, 창고정리 등을 일하시는 분이 해주셨는데 자기가 해야했다.

* 초기 자본이 많이 없다. 정부 과제를 많이 진행한다. 과제 때문에 개발을 하는 경우가 많이 생긴다. 실용성 등은 따지지 않고 과제 결과서를 위해서 실험도 하고... 등 진짜 필요한 연구 개발 등을 못 하는 경우가 생김
금전적인 지원을 위해 형식적인 일들을 하는 경우가 있음.
* 일을 하는 사람이 정해져있다. 
* 현장 백업.. 회사에서 진행하는 페스티벌이 있는데 준비하면서 뿌듯했다. 자신이 개발한 프로그램들을 사람들이 보면서 사람들과 소통하는 부분이 좋았다.
* 번아웃, 우울함과 무력함을 많이 느꼈었다. 사람들과 해외여행, 스쿠버다이빙 등을 하면서 좀 풀었다. 

스타트업의 업무 프로세스
업무의 기본은 프로세스 정립, 프로세스에 따라 권한과 책임 부여, 명확한 결과와 
정립된 업무 프로세스가 없다.. 스타트업에서는 시장 규모나 환경규모가 개선이 되고 고객에 대한 접근법이 계속해서 바뀌는 겨웅가 많다.
문제가 인식될경우, 소통, 결정, 협업, 수정 끊이 없이 진행됨. 잘 이끌어 나갔을 때 성취감이 좋다.

Agile
장단점 : 하고 싶은 일을 할 수 있음, 다양한 업무를 통한 멀티플레이어, 수평적인 문화, 최신 트렌드를 빨리 익힐 수 있음. 시간의 지배자
단점 : 광범위한 업무 범위, 비교적 낮은 급여, 기술부채, 여유와 인내 필요, 멘토링 부재, 명확하지 않은 업무 프로세스, 처음해 보는 일이 많음.


### 현업에서 자주 쓰이는 AWS 서비스

1. EC2
VPS 임대 서비스, 컴퓨팅 파워를 마음껏 조절 가능, 사용한 만큼 요금 지불(용량, 트래픽), 전세계에 퍼져있는 AWS 리전에 배포 가능

원래 cafe24에서 하고 아파치, php, mysql로 하고 있엇따. -> 비싼 이용요금, 1대의 서버를 여러명이서 나누어서 사용하는 방식, 소프트웨어 관련 설정이 까다로움.. 같은 서버를 쓰는 다른 서비스가 해킹 당했을 경우, 내서비스도 위험

웹 호스팅은 한대의 서버를 각각 조금씩 나눠 가져서 하는거고
vps 호스팅은 물리서버를 여러개의 가상 서버로 나누어서 하는... 독립적으로 한다.

저렴한 이용요금, 혼자서 모든 인프라를 구축, 관리 가능, 초기 비용이 거의 없고고, 데모 목적의 프리티어 제공, 서버 증설 필요시 손쉽게 대응

2. Lightsail
EC2 Light 버전, 다소 복잡한 EC2 cONSOLE 대비 사용하기 쉬운 UX
빠른 가상 머신 생성 가능, 서비스 실험 또는 학습 목적에 유용함.

3. S3
파일 저장 서비스, 높은 안정성, 파일 수 ㅔㅈ한이 없음, 다양한 인증 설정, 저렴한 비용, 고성능, SPA 배포 가능.

로그 파일, 데이터베이스 백업파일은 CRON으로 S3 로 업로드
사용자가 올린 파일은 바로 S3로 업로드

4. Lambda
Serverless 서버를 프로비저닝 하거나 관리할 필요 없음
마치 함수 같다. 요청에 따라 Auto-Scaling, 실행된 만큼 비용 지불.
약간의 지연이 있을 수 있다.

사용자가 api gateway를 통해 Lambda로 이미지 업로드
람다가 썸네일 이미지 생성 업로드된 이미지와 생성된 썸네일을 s3에 업로드.

5. RDS
Database 임대 서비스, 데이터베이스의 관리보다 비즈니스와 어플리케이션에 집중가능.
편리한 Auto-Scaling, 편리한 백업/복원 정책. 
생각 보다 비싸다. 데이터베이스와 서버가 같은 공간에 있다보면 나중에 언젠가는 서버를 분리하게 되는데 그런걸 신경 쓸 필요가 없다.

추가 또는 변경되는 기능들 때문에 잦은 스키마 변경 발생, 유저가 늘어남에 따라 database 용량도 늘어나고 ..~~ 
그래서 Rds 추가..

6. ELB - Clustering
한 곳에 집중되는 트래픽을 여러 EC2 Instance로 분산처리, Instance 상태를 지속적으로 확인, 오류 발생시 분산 처리 대상에 제외
auto Scaling 됨.

트래픽에 따라 EC2 Instacne를 사용할 순 없을까..
ec2에도 auto scaling이 있었따.

7. AWS Personalize
아마존에서 사용하는 머신러닝 기술을 바탕으로한 실시간 개인화 및 추천 서비스
api를 통해 사용자에게 개인화 기반의 추천 결과 생성.
최신 딥러닝 알고리즘 및 다양한 개인화 기술 적용.
개인화 추천의 전체 과정을 자동화, 추천 결과 실시간 분석,
다양한 분야에서 활용가능.
높은 성능의 개인화 기술 
안정성 또한 좋다. 

## 2. 정다영

디자니어 
풀스택 디자이너 : ux research, ui design, front-end dev

디자인 공부 
트렌드 파악 및 분석, UX 공부, 기술에 대한 이해, 커뮤니케이션 능력, 디자인관련 툴 학습.


## 3. 김성준

실무에서는 어떤 방식으로 업무가 이루어질까? -> 소프트웨어 공학 
요구사항 정립 - 디자인 - 구현 - 확인, 검증 - 유지보수
실무에서 이런 교과서적인 방법으로 구현을 할까? 
실무 들어가보니 한술 더 떠서 개발하고 있엇다.

요구사항분석 - ux 설계 - ui 설계 - 개발 - 테스트 - 배포 - 유지보수

기획을 제대로 하지 않으면 다시 기획하고 다시 디자인해야하는 상황들이 발생..
개발 또한 마찬가지..
테스트 할 때 발생하면 ... 망함...
처음부터 잘 해야함... 기획서를 잘 짜는게 제일 중요하다.
ux - 사용자가 이용하는데 불편함을 느끼지 않게 디자인하는 절차..
러프하게 프로토타입을 넘겨주면
ui설계 해서 실제적으로 디자인 가능하게 만든다.

요즘 하드스킬(기술) 보다는 소프트스킬(커뮤니케이션, 협업 역량)이 더 중요하다는 사람도 많다.

FE 개발 - 마크업 개발 -> FE고도화
         HTML CSS JS,   JS 고도화

웹 접근성 표준
img의 alt 속성, 장애인, 고령자 등이 웹사이트에서 제공하는 정보에 비장애인과 동등하게 접근하고 이해할 수 있도록 보장하는 것.
버튼을 이용할 때 어디에 포커스를 맞춰야할지..

Semantic - html 각 태그의 의미에 맞는 개발 지향. 표를 만들 때 table... 웹접근성도 지켜지지 않을 가능성이 큼.
css로만 하면 좋지 않다..
크로스 브라우징 이슈..

QA(Quality Assurance) 테스트 ..
기본적인 기능에 대한 테스트 뿐만 아니라 다양한 시스템에서 동일한 스펙으로 동작하는지 점검, 기획을 완전히 이해하고 모든 경우의 수에 대한 예외 처리가 되어있는지 검토.
모든 운영체제, 브라우저 등에서 제대로 진행하는지... 예외 사항 없는지..

## 대형서비스는 어떻게 수많은 트래픽을 감당하나?

클라이언트 - was - db

갑자기 클라이언트들이 많이 요청을 하면.. 웹 서버를 도입. apache(정적처리) tomcat(동적 처리)

클라이언트 - 웹서버 - was - db
분산처리..
아파치랑 스프링을 많이 연결을 한다. 서버자체를 늘린다. 한번에 처리할 수 있는 양을 늘림.
서버 수를 늘려서 로드 밸런서로 처리..
로드밸런서가 알아서 좀 널널한 곳을 ㅗ보낸다.
서버가 여러개인데 db도 늘어나면 db도 터지니깐 db도 늘려준다.
master DB에 slave DB여러개를 붙여서 한다.. 삽입 삭제 등은 master에 하고 select 등은 slave에서 하는 듯.
네이버는 직접 이렇게 하고 있지만 aws 등으로 구축 가능..

## 학교에서 배우는 이론 지식, 어디다 쓸까..?

서버 구성을 어떻게 해야할까..? 등.. 운영체제의 프로세스 스케줄링, 
대기업에서 면접을 보면 스킬 같은걸 물어보지 않고 전공 지식에 대해 많이 물어본다. 무엇을 쓰던지 코어적으로 많이 쓰일 수 있기에

## 왜 대기업에선 spring을 쓸까?
채용공고에 spring 개발자를 정말 많이 뽑느다 왜그럴까욘.
개인 공부 등에선.. 내가 얼마나 빠르게 쉽게 잘 이런게 중요한데
프로덕트를 만들때는 안정성이 제일 중요하다. 서비스 관점으로 생각해볼 필요가 있다.
사람들은 사용할 때 뭘로 만들었는지는 궁금해하지 않음. 자신이 잘 되는지 등이 중요하기 때문에 안정성이 제일 중요하다. -> 이용자 수와 직결..
비즈니스 관점에서도 상당히 중요. 돈을 줄 테니깐 너희 페이지의 공간을 내가 시간만큼 사는거야 했는데 서버가 터지고 그러면 손해배상 청구 등... 할 수 있음.

JAVA -> 정적 타입 언어 - 생산성 업 안정성 업 언어차원에서 어느정도 검증
JS, PYTHON 생산성 업, 안정성 다운 개발자의 역량에 의존

TS 사용하면 상당부분 안정성이 올라가는데 생산성 낮아져서 그럴거면 왜 JS쓰지? 가 된다.

스프링: 멀티 쓰레드  -> 다중 스레드 사용으로 인한 안정성
NODE - 싱글 쓰레드 - 비동기 처리로 인한 실시간성.
프로젝트가 어떤 성격인지에 따라서 달라진다.

스프링 - DI, AOP, IOC, Spring이 추구하는 철학들 코드 품질 향상에 기여...