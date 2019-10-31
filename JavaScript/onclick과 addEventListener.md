# onclick으로 click 이벤트를 넣는 것과 addEventListener로 click 이벤트를 넣는 것.. 무슨 차이가 있을까??

동아리원들에게 js를 가르쳐주려고 공부하다가 문득 든 생각 onclick으로 click 이벤트를 넣는 것과 addEventListener로 click이벤트를 넣는 방법이 있는데 무슨 차이가 있을까?? 그래서 블로그 같은 곳을 찾아보았다.


    document.getElementById('trigger').onclick = () => {
        alert('hello!');
    }

이런식으로 trigger라는 아이디를 가진 객체를 찾아 클릭시 이벤트를 발생 시키는 방식. 또는

    document.getElementById('trigger').addEventListener('click', () => {
        alert('hello!');
    });

addEventListener() 또한 위 메서드와 비슷하게 어떤 이벤트가 있으면 어떤 행동을 취할지 함수를 작성하게 된다. 둘 다 비슷하게 동작하는데 왜 addEventListener()로 작성하는 방식이 모던한 방식일까

  1. 여러 개의 이벤트를 overwrite할 수 있다.
   - onclick 으로 넣는 것은 덮어쓰기가 되서 앞의 것이 사라지는데, addEventListener는 2개를 따로 넣을 수 있다.
   - 물론 한번에 내용을 다 적으면 상관 없을거 같긴하다.

  2. 작성 중에 bubbling, capturing을 설정할 수 있다.
   - 클릭시 이 함수가 버블링으로 작동할지 캡처링으로 작동할지 작성시 판단할 수 있다. 메서드를 잘 보게 되면 addEventListener("type", 리스너(작동될 함수), 캡쳐링으로 쓸지) 가 들어가게 된다. 세번쨰 parameter가 true일 경우 캡처링이 된다. false일 경우 버블링을 쓴다. default는 false
   
   - 이벤트 버블링은 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미한다.

   - 이벤트 캡쳐는 이벤트 버블링과 반대 방향으로 진행되는 이벤트 전파 방식.

  3. 여러개의 이벤트 타입들을 쉽게 바인딩 할 수 있다.
   - 만약 버튼을 누르거나 버튼에 마우스를 올릴 때 모두 함수를 동작하게 하고 싶다면 코드를 이렇게 작성해야한다.

    obj.onclick = do1;
    obj.onmouseover = do1;

    ['mouseover', 'click'].map(function(e){
        obj.addEventListener(e, do1);
    })

   - 이런식으로 차이가 난다. 많아질 수록 addEventListener가 편할 수 있다. 한 배열 객체에서 이벤트 발생 type들을 관리할 수 있다.

### onclick을 사용하면서 얻을 수 있는 장점?

 addEventListener는 IE 6,7,8 버전을 지원하지 않는다. onclick은 모든 버전을 지원.
