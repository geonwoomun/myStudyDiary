### git reset

실수로 한 커밋을 되돌리고 싶을 때
git reset HEAD~1   (HEAD는 현재 커밋의 위치)
            
현재에서 하나 뒤로 되돌리고 싶을 때 
커밋이 풀림. 실수로 커밋했던게 사라짐
commit 했다는 기록조차 사라지기 때문에 조심해서 사용.

git reflog라는게 있는데 최대한 안 쓸수있게 해야함..
이걸 쓴다면 이미 git이 꼬인거임.

--soft --hard 이런 옵션들이 있다.
기본은 mixed

--soft 이면 초록색으로 --hard는 아예 되돌리고 --mixed는 빨강이로. 초록색 = 변경되고 add 된 상태, 빨간색 = 변경된 상태
hard는 잘 안 쓰는게 좋다. hard는 수정 했던게 다 사라진다.


수정을 했는데 수정사항이 마음에 안 들면
git reset --hard

아니면 HEAD~ 이런식으로 수를 세기가 귀찮으면 
git reset 고유번호    이런식으로 가능. (git log 치면 나오는 commit의 고유 번호.)

### git revert

실수를 되돌리는데 되돌린 커밋마저 새로운 커밋으로 만들어버린다..?
revert를 하면 실수한 내용이 그대로 남되 실수하기 전으로 새로운 커밋이 생긴다.
그래서 실수한 내용을 볼 수 있다.

원격서버까지 썼을 때 revert를 쓸 이유가 많아진다.
예를 들어 내가 잘못된 커밋을 push를 했고 다른 팀원들이 그것을 pull 받아서 쓰고 있을 때 
나혼자서 reset을 한다고 되는 것이 아니다. 이미 다른 사람들은 내 커밋을 받아서 사용했기 때문에 ..
그래서 revert를 해서 새로운 커밋으로 올리면서 바꾸면 다른 사람들도 다시 pull 받았을 때 되돌아 갈 수 있다.

### git branch

branch 나뭇가지 .. 여러개를 만들어서 각각 다른 작업 a,b 비교등등

git flow 라는 방식이 있다. branch를 나눠서 다른 프로그래머들이 개발을 하고 테스트도 하고 하다가
master로 합치고~ 그렇게 할 수 있다.
branch할 때 충돌이 많이 발생할 수 있다.

git branch 브랜치명 으로 새로운 branch 만들 수 있음.

git checkout 브랜치명으로 브랜치를 변경할 수 있음.

git branch로 지금 branch가 어디에 있는지 확인! 중요
git pull origin master 도 해서 master꺼를 받아서 최신으로 업데이트
충돌 예방에 좋음! 습관적으로 쳐라ㅏㅏㅏㅏ
gui 있는게 보기에 좋다.

### git merge

브랜치를 합치는 것. 
git checkout master로 간다음에 
git merge development를 하면 master에 development 것을 가져온다.

HEAD가 현재
밑에 것이 merge 들어온 것.

git status를 치면 동시에 수정 됐다. 충돌이 일어났다 이런게 나옴.

둘중에 하나를 골라도 되고 다른걸로 바꿔서 하나로 합쳐도 된다.
충돌이 나면 팀원과 상의를 해서 제대로 정해서 합쳐야 한다.

### git rebase

git rebase development 

현재에서 deveploment의 기능을 가지고 오는 것.
똑같이 충돌 난다. 충돌은 해결해야함.

고치고 나서 git add .   git rebase --continue 하면 된다.
그러면 branch가 나뉘는게 아니고 한줄로 쫙 만들어버린다.


한줄이 좋다 하면 rebase 편하고 나뉘는게 보기 좋다 하면 git merge 인듯..
나는 git merge를 많이 썼었다.

### git cherry-pick

git merge나 rebase로 하면 모든 커밋을 다가져와서 합치는데
어느 한 커밋만 가져오고 싶다. 이럴 때 
git cherry-pick을 사용한다.

git cherry-pick 고유번호 
그러면 그 커밋만 가져와서 합친다. cherry-pick도 충돌이 일어날 수 있다.

고유번호가 랜덤한 숫자문자라 외우기가 너무 어렵다~ 하면 tag를 붙이면 좀 더 편해진다.
git tag v1.0.0 이런식으로 하면 태그가 붙는다.
git tag 를 치면 tag를 보여준다.
커밋고유번호를 적는 곳에 그냥 tag로 하면 된다.
중요한 기점이 되는 부분에 태그를 달아놓으면 아이디를 외울 필요없이 tag로 할 수 있어 편하다.


### git stash

수정을 하다가 잠시 다른데거를 보고 싶어서 git checkout 브랜치명을 해버리면 에러가 뜬다 . 수정한게 다 날아간다고...
근데 이게 수정을 commit하기엔 애매하고 그런데 다른 브랜치 가서 확인 하고 싶을 때.
임시 저장이라 생각하면 됨..

다른 브랜치 간다음에 다시 돌아가기. 
git stash list 를 하면 list들을 보여주고
돌아가고 나서 git stash apply 하면 돌아간다.

그리고 다른 브랜치에서 git stash 하고
원래 브랜치에서 git stash apply를 하면 적용이 된다. 충돌이 날 수도 있지만 해결하면 그만.

development 브랜치에서 했어야 할 작업을 실수로 master 브랜치에서 해버렸을 때
git stash 로 master에서 한 작업을 임시저장한다음 development 브랜치로 가서 git stash apply 하면 적용된다.


### git fetch
pull 이란 명령어가 사실 fetch랑 merge가 합쳐진것이다.

fetch를 하면 비슷한데 문구가 하나가 빠짐.
fetch를 하면 따로 생긴다..
pull을 하면 local까지 바로 바껴버리니깐.
git fetch로 원격 것을 가져와서 비교를 해보고 local것과 merge로 합칠 수 있다.

가져온것을 git merge origin/development 이런식으로하면 원격것과 합칠 수 있다.


### git flow 전략

충돌이 많이 나기 때문에 전략을 제대로 안 짜면 문제가 생길 수 있다. 
항상 실무 위주로 생각을 해야한다.
한 사람이 다른 사람들에 비해 실력이 월등하면
그 사람이 마스터에서 작업하고 다른 사람들이 branch에서 작업해서 합치고..
사실 이런 경우는 잘 없다. 실력이 좋은 사람도 실수를 하기 때문.
master는 보통 대부분 고객들이 보는 제품.
실수를 하면 그 사람의 실수가 바로 고객들에게 공개가 되니깐
master에서는 바로 개발을 하진 않는다.

master에서 initial commit을 하고 dev 브랜치 사람이름 브랜치... 등등을 만든다.
아니면 기능명으로 해서 branch들을 만들어서 각각 개발함.
사람 이름들 브랜치에서 해서 dev브랜치에 합친다. dev브랜치에서 충돌을 해결해서 올바른
커밋으로 만들고 확인한 다음에 확실하면 master에 합친다.
dev에서 테스트를 제대로 했따면 master는 에러가 날 일이 없다.
master가 했던 작업들을 다시 다른 브랜치들이 가지고 가서
dev에 합치고 다시 master에 합치고...
급한 버그가 낫을 때르 위한 hot fix 같은 브랜치를 만들어서 빠르게 fix한다음에 master에 합치고.

master 빼고는 꼬이면 삭제해버리면 된다. master에서 가져와서 하면 되니깐.
master만 깨끗하게 잘 되어있으면 된다!
flow만 제대로 정해두고 그것만 잘지키면 몇가지 명령어로도 잘 할 수 있다.






