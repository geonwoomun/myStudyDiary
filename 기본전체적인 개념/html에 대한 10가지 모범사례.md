# 1. 유효하고 읽을 수 있는 DOM 작성
 - 모두 소문자로 써라
 - 들여 쓰기는 가독성의 핵심
 - 닫기 태그 다 쓰거나 안 쓰거나
 - 주석을 과도하게 사용하지마라
 - DOM 구성 - semantic 요소를 잘 써라

# 2. 인라인 스타일과 스크립트를 사용하지마라.

그렇지 않으면 무서가 빠르게 복잡해져 읽을 수 없게 된다. 항상 외부 스타일 시트를 사용하라.

# 3. 인라인 크리티컬 CSS

중요한 CSS를 맨 위에 배치하라. 이렇게 하면 사용자가 페이지의 첫 부분이 더 빨리 렌더링 되는 것을 볼 수 있다.

# 4. 스크립트 태그를 맨 아래에 배치

문서 하단에 스크립트 태그를 배치해라. 공식적으로 스크립트 태그는 헤드 내부에 존재하지만 본문의 닫기 태그 전에 문서의 맨 아래에 배치하면 다운로드가 지연되고 문서가 먼저 DOM에 로드되어 사용자에게 표시되도록 할 수 있다.

html이 먼저 로드되도록 스크립트 태그에 defer를 추가 할 수도 있다.
(엘리님이 이게 더 좋다고 했음)

# 5. 접근성 관리

# 6. 이미지에 alt 태그 사용

alt 태그는 이미지의 대체 텍스트를 지정하므로 어떤 이유로 든 표시 할 수 없는 경우에 텍스트가 대신 표시된다. 검색 엔진은 이미지에 대한 대체 태그가 누락되면 페이지 우선 순위를 낮출 수 있다.

# 7. 페이지 당 하나의 h1

블로그 게시물이나 기사 제목과 같이 페이지의 내용을 설명하는 가장 중요한 텍스트를 페이지당 h1 한개만 사용해라.

페이지당 여러 개의 h1 태그를 사용하는 것은 좋은 생각이 아니며 검색 엔진 결과를 손상 시킬 수 있으므로 권장하지 않는다.

# 8. 제목 및 메타 태그 사용

제목 및 메타 태그는 검색 엔진이 사이트 색인을 생성하는데 사용되므로 유용한 정보를 적어야한다. 기기의 화면 크기에 따라 사이트가 표시되도록 항상 메타 뷰포트 태그를 사용해라.

# 9. 압축

모든 작업을 마치고 사이트를 라이브로 만들 준비가 되면 압축해라. 웹팩 등등.. 문서를 작게 만들어 페이지로드 속도가 빨라진다. 이 단계를 더 진행하려면 서버측에서 brotli 또는 gzip 압축을 활성화 해라.

# 10. HTML 확인

마지막으로 HTML의 유효성을 검사해라. 결함이나 잘못된 코드를 찾아내어 제거해라. 린터를 배치해서 오류를 찾아라.

이 10가지 간단한 단계를 따르면 HTML을 강화하고 사이트 순위를 높이고 더 많은 트래픽을 발생시키는 동시에 최적화 단계에서 더 빠르게 만들어 사용자 상호 작용을 유도할 수 있다.