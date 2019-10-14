# Git 이란?

git과 github

git은 버전관리 시스템이라고 불린다. git 말고도 다른 버전관리 프로그램들도 있다.

Git을 왜 배워야 하는가? 

 1. 버전관리
  - 파일의 버전을 v0.0.1, v0.0.2 등으로 만들어 놓으면 문제가 발견 되었을 때 되돌리기 쉽다. 예를 들어 워드의 경우 파일을 두개를 만들어 놓아야 되는데 파일을 한개로 버전 관리 가능.
  예전 버전으로 돌아가고, 새로운 버전 만들고... 한 파일로 버전관리 할 때. 

 2. 협업
  - 이게 중요. 여러 사람이 한 파일을 수정할 수 있고, 여러 사람의 변경 사항들을 반영 할 수 있다.

  ------------------------------------------------------------------------------

### git status, git add

cmd에서 관리하고자 하는 폴더로 가서 git init을 입력하면 .git이라는 폴더가 생기고(숨김 되어있어서 보이지 않음) git이 해당 폴더의 변경사항들을 관리한다.


git status :

 - on branch master 라고 뜬다. master라는 branch가 있구나~
 - git이 관리를 하지 않았다는 뜻으로 Untracked files로 빨간글씨로 나온다.
 - git add <file>로 git에 추가하라고 한다.
 - git이 관리를 안 해줘도 되는 파일을 설정할 수도 있다. ex) 비밀번호가 있는 파일이라던지... 보안에 위협되는 파일들.
 
git add 파일명 명령으로 git에 추가 할 수 있다.

git add가 제대로 됐는지 확인하려면 git status를 사용하면 관리를 해주는 파일을 볼 수 있다. 초록색 글자로 나옴.

git rm --cached code1.txt를 사용하면 다시 git이 관리 안 하게 할 수 있음. cached를 붙이지 않으면 파일 자체가 삭제될 수도 있으니 조심.

git add . 을 하면 현재 폴더의 모든 파일들이 추가 된다.

git rm -rf 폴더명 으로 폴더를 git에서 삭제 할 수 있다.
git으로 관리할 필요가 없는 파일을 귀찮게 계속 지웠다 넣었따 안 하려면 .gitignore 파일을 만들어서 파일 상대경로를 추가해주면 된다.

----------------------------------------------------------------
### git commit

git 한테 기억해달라고 하는데 어떤 상태인지 메모를 남기는 것.
commit은 git 한테 기억해달라고 부탁하는 단위.
관용적으로 첫번째 commit은 initial commit을 많이 적음.
git commit -m "Inital commit" 이런식으로 하면 메모를 남길 수 있음.

처음에 branch master에 있고 commit 번호가 나온다..(식별자 라고 보면 될듯?)

git log를 치면 commit에 대한 정보를 볼 수 있다.
누가, 언제, 메시지, 등.

git commit하다가 에러날 때도 있는데 왜 그렇냐면
미리 git 정보를 등록해두어야 한다.

git config --global user.email "내 이메일" 
git config --global user.name "내이름"
한 후 commit을 날려야 정상적으로 된다.


파일을 변경한 후 git status를 하면 그 파일이 바꼇다는 정보를 보여준다.

git checkout -- 파일이름 하면  (checkout은 용도가 2개가 있다.) 수정된 거를 되돌릴 때.
해당 파일의 수정 사항이 되돌아간다.

git commit -am "메시지" 하면 add와 메시지까지 같이 할 수 있다. -a(all 축약)가 git add . 역할을 한다.
git commit . 역할을 하는듯. commit 메시지를 최대한 자세하게 적어야 나중에 편하다.
commit 메시지는 미래의 우리를 위한 것임.

--------------------------------------------------------------------------

### github (또는 gitlab 빗버킷?)

new repository로 저장소를 만든다~
다른 사람과 공유할 수 있게 한다. 충돌이 날 수도 있음!
private은 비공개 public은 모든 사람이 다 볼 수 있는 repository
중요한 문서는 private 아니면 public

그리고 create repository를 누르면 된다.
그러면 여러 명령어가 나온다~

### git remote 

git remote add <name> <url> 

원격 github 주소를 origin이라는 이름으로 추가를 해두겠다.라는 뜻.

확인은 git remote get-url origin으로 보면 제대로 등록이 되었는지 볼 수 있음.

git push origin master 명령어로 우리의 코드를 github에게 보낼 수 있음.


### git push, git pull

git push origin master // origin 은 원격 주소고 master는 branch 이름.
원격 origin에다가 master브랜치에 있는걸 보내겠다.

git push origin master를 안 하면 원격 서버랑 내 로컬 서버랑 commit이 달라지게 되는데
이게 분기가 생긴것이다. 잘 관리하여야 된다. 충돌이 안 일어나게끔

github에서도 연필모양 눌려서 내용을 바꿀 수 있음.
commit 명 적고 commit을 할 수 있다.
그러면 이제 원격 서버에 commit이 더 많아진다.
이게 다른 사람이 원격서버에 commit을 push 한 상황과 비슷하다.

git pull은 서버로부터 가져오는 것이다.
git pull origin master 이런식으로. 서버쪽에서 남이 작업한거든 무엇이든 origin master에 있는걸 가져온다.




