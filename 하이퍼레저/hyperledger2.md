## 8.31 '실전! 하이퍼레저 패브릭'강의 2교시

k그룹의 신태영님의 강의였다.

앞에서 했던 HLF 아키텍처 구조에 대해 다시 듣고

환경설정 하는 것들에 대해 배웠다.

nodejs, docker 설치 등에 대해 배웠다.

nodejs와 docker는 다른 책들을 통해 이미 설치 되어 있는 상태였다.

docker는 사용법을 거의 다 알았었는데 최근에 계속 백엔드 쪽만 공부 하다보니 잘 기억이 안 났다.

docker의 장점: 
1. 컨테이너를 활용한 가상화 방식으로 VM보다 실행 성능 좋음.
2. 이미지를 활용하여 여러가지 환경에 대한 배포가 가능
3. 버전 관리가 용이함
4. 운영을 위한 반복적인 작업 설정이 쉬움.

그래서 도커 등을 활용해서 쿠버네티스 등이 뜨는 중.


하이퍼레저패브릭 네트워크 동작시키기

./byfn.sh generate (네트워크 동작을 위한 필수 파일 생성하기)

1. cryptogen toll을 사용하여 인증서 생성하기 

2. genesis.block 생성

3. mychannel.tx 생성하기

4. anchor.tx 생성하기

(./byfn.sh generate를 통해 생성 되는 파일 네 가지//
    1. certicicate
    2. genesis.block
    3. channel.tx
    4. anchor.tx )
    
./byfn.sh up (네트워크 동작시키기)

 5. 네트워크 동작시키기 docker-compose -f ./docker-compose-cli.yaml p -d
 6. 채널 생성하기
 7.채널 조인 하기
 8. 앵커 피어 업데이트 
 9. 체인코드 설치하기/초기화하기/ 업그레이드하기
 
 
 버전         1.0     1.1    1.2    1.3
 install       O       O      O      O
 instantiate   O       X      X      X
 upgrade       X       O      O      O

10. 체인코드 호출하기 , query(조회) invoke(옮기기)

사용 가능한 cli 명령어 및 옵션 살펴보기   peer chaincode --help



