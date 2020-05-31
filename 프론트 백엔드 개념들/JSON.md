XMLHttpRequest, fetch를 사용하면 서버와 손 쉽게 주고 받을 수 있다.
fetch는 ie에서 지원 되지 않기 때문에 유의해서 사용해야한다.

AJAX, XHR 들에서 계속 XML이 등장하는데 XML이란 태그들을 이용해 데이터를 나타낸다. HTML와 마찬가지로 데이터를 표현할 수 있는 한가지 방법.

서버와 데이터를 주고 받을 때는 XML 뿐만 아니라 굉장히 다양한 파일 포멧을 주고 받을 수 있는데 요즘에 JSON을 많이 쓰고있다.

XML이라고 이름 앞에 지은 것은 굉장히 큰 실수 같은데 이것을 통해서 함수, 등 변수의 이름을 정할 때 명료하게 잘 지어야한다는 것을 알 수 잇다.

브라우저에서 서버와 통신을 할때는 XMLHttpRequest, fetch 등을 이용해서 서버와 통신할 수 있다. xml을 사용하면 가독성도 좋지 않고... 요즘엔 json을 많이 사용한다.

JSON은 JavaScript Object Notation 이다. 1999년도 ecma 3버전에서 object에서 영감을 받아 key value로 이루어져있게 만들었다.
모바일이나 localstorage 등에 저장할 때도 많이 사용한다.

object는 어떻게 serialize해서 json으로 변환할지
다른 하나는 직렬화 된 json을 어떻게 deserialize해서 object로 변환할건지.

JSON.parse 와 JSON.stringify를 통해 살 수 있다.

stringify를 사용하면 JSON으로 바꿀 수 있다. ""으로 들어가고, string으로 바꿔준다.
json에 메소드는 포함되지 않는다. object에 포함되는 데이터가 아니기 때문에 js에만 있는 특별한 데이터도 json에 포함되지 않는다. (symbol 같은 것)

json으로 변환 되는 것을 좀더 통제하고 싶다면, replacer라는 콜백함수를 넣어주면된다. 함수나 배열형태로.. 프로퍼티 이름만 전달하게 되면 해당 프로퍼티만 해준다. ['name', 'color'] 이런식으로...
콜백함수를 이용해서 (key, value) => {} return으로 정할 value를 해주면된다. key에 따라 다른 value를 보이게 할 수 있다.

JSON.parse(json) json을 주면 obejct로 해준다. 변환한 object는 역시 함수는 포함되어 있지 않다. 유의 해서 코딩.

date -> string으로 바뀌었다가 parse해도 string이 되기 때문에
json으로 만든 것은 date 함수 등이 안 먹힐 수 있다.
reviver라는 콜백함수를 이용해서 다시 살릴 수 있다.
(key, value) => key === 'birthDate' ? new Date(value) : value;
이런식으로 하면 살아난다!!
