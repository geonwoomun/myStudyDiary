## flexbox로 만들 수 있는 10가지 레이아웃을 보며 정리 및 공부.

출처: https://d2.naver.com/helloworld/8540176

flex box를 쓰고 있었는데 왜 쓰는지 자세하게 무엇인지 제대로 몰라서 찾아서 공부하게 되었다. html, css 강의를 듣는데 flex로 하면 옆으로 촤라락 됐었는데 왜 안 쓰고 position, inline, inline-block 등으로 배치하지? 하고 궁금해져서 찾아보게돼었다.

------------------------------------------------------------------

구현이 어려운 레이아웃을 간단하게 구현할 수 있게 CSS3에 추가된 레이아웃 방식이 flexbox이다. flexbox를 사용하면 요소의 크기와 순서를 유연하게 배치할 수 있다.

### flexbox란 ?

flexbox는 뷰포트나 요소의 크기가 불명확하거나 동적으로 변할 때에도 효율적으로 요소를 배치, 정렬, 분산할 수 있는 방법을 제공하는 CSS3의 새로운 레이아웃 방식이다.
flexbox의 장점을 한 마디로 표현하면 '복잡한 계산 없이 요소의 크기와 순서를 유연하게 배치할 수 있다.'라고 할 수 있다. 
정렬, 방향, 순서, 크기 등을 유연하게 조절할 수 있기 때문에 별도의 분기 처리를 줄일 수 있고, CSS만으로 다양한 레이아웃을 구현할 수 있다.

flexbox의 구성

flexbox는 복수의 자식요소인 flex item과 그 상위 부모 요소인 flex container로 구성된다.

flexbox를 만드는 방법은 간단하다. 정렬하려는 요소의 부모 요소에 다음과 같이 
display: flex 속성을 넣어주면 된다.

그럼 속성이 적용된 요소는 flex container가 되고, 자식요소는 flex item이 된다.

display : flex를 설정하면 자식 요소들은 옆으로 촤라락~

flex item은 주축에 따라 정렬되는데 주축의 방향은 flex container의 flex-direction 속성으로 결정한다. flex-direction 속성을 따로 지정하지 않으면 기본값이 row(행) 가로로 촤악~~ 왼쪽에서 오른쪽 방향으로
flex-direction의 다른 속성값이 column은 주축의 방향을 위에서 아래로 흐르게 한다.


### 부모 요소와 자식 요소에 정의하는 속성 구분.

전체적인 정렬이나 흐름에 관련된 속성은 flex container에 정의하고, 자식 요소의 크기나 순서에 관련된 속성은 flex item에 정의한다. 이를 분리해 적용하는 것이 중요하다.

flex container 속성: flex-direction, flex-wrap, justify-content, align-items, align-content

flex item 속성 : flex, flex-grow, flex-shrink, flex-basis, order


### flex box 지원 범위 

IE 10 이상이 지원하는데 10이상이 완전히 지원하지는 않아서 PC용 서비스에 flex box를 완전히 적용하기에는 아직 어려움이 있다.
ie 를 지원하지 않는 서비스를 운영한다면 flex box를 적용해봐도 좋다.

모바일 브라우저는 거의 대부분이 지원한다.


### flexbox를 활용한 10가지 레이아웃 사례

실무에서 많이 사용하는 10가지 레이아웃을 flexbox로 구현하는 방법 소개.
기존 display나 float, position 속성 등으로는 구현이 어렵거나 구현이 불가능.
flexbox를 사용하면 쉽게 구현 가능.

10가지를 다 정리하진 않을꺼고 몇개만 해보도록 할거임...
10가지를 보면서 안에 중요한 정의 내용들을 정리하겠음..


flex : 1 속성으로 자식 요소의 크기 확장 

flex 속성은 flex item의 크기와 관련된 속성이며 다음과 같이 flex-grow, flex-shrink, flex-basis 속성을 축약한 표현임.

    .child {
        flex : 1 1 0
    }
순서대로 felx-grow, flex-shrink, flex-basis
따로따로 줄 수도 있음
flex : 1은 flex : 1 1 0을 의미한다.

#### flex-grow 속성

flex-grow 속성은 flex item의 확장에 관련된 속성이다. 0과 양의 정수를 속성값에 사용한다. 속성값이 0이면 flex container의 크기가 커져도 flex item의 크기가 커지지 않고 원래 크기로 유지. flex container의 크기가 커질 때 flex item의 크기도 커지게 하려면 1이상의 값을 속성값으로 설정한다. 
속성값이 1 이상이면 flex item의 원래 크기에 상관없이 flex container를 채우도록 flex item의 크기가 커진다.

### flex-shrink 속성

flex-shrink 속성은 flex item의 축소에 관련된 속성이다. 0과 양의 정수를 속성값에 사용한다. 기본값은 1이다.

속성 값이 0이면 flex container의 크기가 flex item의 크기보다 작아져도 flex item의 크기가 줄어들지 않고 원래 크기로 유지된다. 속성값이 1 이상이면 flex container의 크기가 flex item 보다 작아질 때 flex item의 크기가 flex container의 크기에 맞추어 줄어든다.

### flex-basis 속성

flex-basis 속성은 flex item의 기본 크기를 결정하는 속성이다. 기본값은 auto다.

width 속성에서 사용하는 모든 단위 (px, %, em, rem 등)를 속성값에 사용할 수 있다. flex-basis 속성의 값을 30px이나 30%와 같이 설정하면 flex item의 크기가 고정된다.

flex-basis 속성에서 auto와 함께 자주 사용하는 속성값이 0이다. flex-basis 속성의 값을 0으로 설정하면 flex item은 절대적 flex item이 되어 flex container를 기준으로 크기가 결정. 0px, 0%와 같이 단위도 함께 설정헤야함.

flex-basis가 0이면 크기가 다 같아지고, auto를 하면 안에 든 콘텐츠의 크기를 기준으로 크기가 결정.


### flex : 1 의 의미

flex : 1 은 flex : 1 1 0 을 의미한다. grow 속성값이 1이 되고
나머지는 기본값이 설정 되는 것이다.


flex item의 크기를 고정하려면 flex : none을 설정해주어야한다.

flex : initial(기본값)   = flex : 0 1 auto 크기는 줄어들기만하고 크기 다양
flex : none =  flex : 0 0 auto 크기가 그대로고 아이템 크기 다양
flex  : auto  = 1 1 auto  크키가 늘거나 줄어들고 아이템 크기 다양
flex :1   = 1 1 0 크기가 늘거나 줄어들고 아이템 크기 일정


### margin-left auto 속성으로 자식 요소를 오른쪽에 배치

flex item을 수평으로 배치할 때 다음과 같이 auto 속성 값을 사용할 수 있다.

margin-right: auto 바깥 여백이 오른쪽의 모든 공간을 차지하기 위해 flex-item을 오른쪽에서 왼쪽으로 미단. 즉 왼쪽에 위치하게 됨

margin: 0 auto 바깥 여백이 flex item을 양쪽에서 밀기 때문에 flex item이 수평 중앙에 위치한다.

margin-left : auto   오른쪽에 위치.

수직은 top, bottom에 auto , margin: auto 0 ...

flexbox에서 margin : auto 속성으로 레이아웃을 구현하는 방법이 핵이라고 생각하거나 버그를 일으키는 요인이 될 수도 있다고 생각할 수 있다. 하지만 margin : auto 속성은 오히려 flexbox 명세에서 권장하는 방법.


#### justify-content : space-between 속성으로 자식 요소를 일정한 간격으로 정렬

justify-content 속성은 주축을 기준으로 flex item을 수평으로 정렬한다. 다음과 같은 5개의 속성 값으로 다양한 수평 정렬 레이아웃을 만들 수 있다.

flex-start : 주축의 시작 부분을 기준으로 flex item을 정럴
center: 주축의 중앙을 기준으로 flex item을 정렬
flex-end: 주축의 끝부분을 기준으로 flex item을 정렬
space-around : 주축을 기준으로 flex item을 일정한 간격으로 정렬
space-between : 첫번째와 마지막 flex item은 주축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬.


#### align-items : center 속성으로 자식 요소를 교차축의 중앙에 정렬

align-items 속성은 주축을 기준으로 flex item을 수직으로 정렬한다. 다음과 같은 5개의 속성 값으로 다양한 수직 정렬 레이아웃을 만들 수 있다.

stretch(기본값): flex item의 높이를 늘려 flex container의 전체 높이를 채운다.
flex-start : 교차축의 시작 부분을 기준으로 flex item을 정렬한다.
center: 교차축의 주앙을 기준으로 flex item을 정렬한다.
baseline 글꼴을 기준선인 baseline을 기준으로 flex item을 정렬한다.
flex-end : 교차축의 끝부분을 기준으로 flex item을 정렬한다.


자식요소가 가운데 오게 하려면

부모요소에 align-items: center; justify-content: center;를 하면 된다.
또는 자식요소에 margin : auto를 하면 된다.

### 말줄임과 아이콘..

    .flex_container {
      display: inline-flex;
      max-width: 100%;
    }

    .text {
      /*flex: 0 1 auto*/
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

하면 text를 다 담을 수 없을때 텍스트에 ... 이 생김.


#### display : inline-flex 속성으로 부모 요소를 인라인 블록 요소로 만들기

display : inline-flex 속성은 flex-container를 인라인 블록 요소로 만드는 속성.
display : flex 속성을 적용한 flex container는 블록 요소다.
블록 요소는 브라우저 화면이 한줄 전체를 차지하지만, 인라인 블록요소는 한줄의 일부 영역만 차지한다.
flex container에 적용한 max-width : 100% 속성은 flex item인 텍스트 영역의 길이가 유동적으로 변할 수 있게 해준다.
그래서 텍스트가 아이콘을 제외한 나머지 공간을 가득채운다. 텍스트 영역이 줄어들 때 나타나는 줄임표는 text-overflow: ellipsis 속성으로 구현.


#### flex-wrap: wrap 속성으로 줄 바꾸기

flex-wrap은 flex item이 flex container를 벗어났을 때 줄을 바꾸는 속성이다. white-space 속성과 동일하게 작동한다. 속성의 기본 값인 nowrap은 flex item의 전체 크기가 flex container 보다 커져도 줄을 바꾸지 않고 한줄로 flex item을 배치한다.

위아래로 흐르는 목록을 구현하려면 flex-wrap : wrap으로 한다.
flex item의 전체 크기가 flex container 보다 크면 여러 줄로 flex item을 배치한다.


#### align-content 속성

align-content 속성은 flex item이 여러 줄로 나열되어 있을 때 주축을 기준으로 수직 정렬 방법을 설정하는 속성. align-content 속성에 사용할 수 있는 속성값은 다음과 같다.

stretch(기본값) : flex-item의 높이를 늘려 flex container의 전체 높이를 채운다.
flex-start: 교차축의 시작 부분을 기준으로 정렬한다.
center : 교차축의 중앙을 기준으로 정렬한다.
flex-end 교차축의 끝부분을 기준으로 정렬한다.
space-around: 교차축을 기준으로 flex-item을 일정한 간격으로 정렬한다.
space-between : 첫번째와 마지막 flex item은 교차축의 시작 부분과 끝부분에 정렬하고 나머지 flex item을 일정한 간격으로 정렬한다.

주의 해야할 부분은 flex-direction : column 속성으로 주축의 방향이 전환되면 정렬 기준도 전환된다는 점.
수평이 align-content가 되고 수직이 justify-content가 된다.

#### flex-basis : 33.3% 속성으로 자식 요소의 비율 고정.

목록을 이루는 항목 요소가 일정한 비율로 유지되게 한다.

이미지 박스는 유동적으로 반응할 수 있도록 flex : auto 속성을 적용하는게 좋음.
