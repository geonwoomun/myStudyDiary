## author를 잘 못 입력하거나 다른걸로 바꿔 버려서 commit이 다른 아이디로 될 때 해결법.
git lab을 사용한다고 config global에다가 git lab 주소를 적어버리는 바람에 내 로컬 환경에서 푸쉬를 했을 때는 다른 아이디로 커밋을 했다고 나와서 잔디밭이 꾸며지지 않는거임!!! 그래서 내 잔디밭을 다시 만들어주기 위해… 이어나가기 위해 공부해서 바꾸어보았다.

먼저 git log를 사용해서 commit의 hash 값을 알아낸다. git log는 맨 위에 최신이고 맨 아래가 옛날이다. 그리고 그거를 복사를 해두고 나와서
git rebase -i -p hash 를 입력! 그러면 vim 창이 나오면서 그 hash 값 이후로의 commit 들이 등장. 
pick 커밋, pick 커밋 이런식으로 되어있는데 바꾸고 싶은 commit 들을 edit 으로 변경. 그리고 :wq를 하고 나온다.
그러면 그 숫자만큼 rebase를 할 수 있게 되고
git commit –-amend –-author=”geonwoomun <ansejrrhkd@naver.com>”과 같이 입력을 한다 그러면 이름 이메일 순서대로 커밋 author 가 변경이 된다. 그리고 vim 창 같은게 뜨는데 똑 같은 :wq 하고 나온다. 그리고 git rebase –-continue를 이용해 다음 것도 rebase를 한다. 
그리고 완료가 되면 git push origin +master를 통해 +를 붙여서 강제로 커밋을 해줘야 rebase 내용들이 커밋이 된다. 그러면 끝 조금만 기다리면 잔디밭이 돌아온다.. ㅠㅠ 다행
