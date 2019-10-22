# this 한번더!

javascript에서 함수의 this 키워드는 다른 언어들과 비교하여 조금 다르게 동작한다. 또한 strict mode와 non-strict mode사이에서도 조금 다르다.

대부분의 경우, this의 값은 함수를 호출하는 방법에 의해 결정된다.
ES5는 함수의 this 값이 함수가 어떻게 호출되었는지 개의치 않고 설정할 수 있는 bind 메소드를 소개했다.

    var someone = {
        name : 'codejong',
        whoAmI : function() {
            console.log(this);
        }
    };

    someone.whoAmI();

    var myWhoAmI = someone.whoAmI;
    myWhoAmI();

하면 this가 두개가 다르게 찍힌다. 그 이유는 무엇인가! 하면
함수를 호출하는 방법이 다르기 때문이다.

someone.whoAmI 로 someone이 함수를 사용햇으니 위에 것은 someone이 찍히고 밑에 것은 myWhoAmI() 이렇게 되니깐 window가 호출한 것이라 window가 출력이 된다. 코드를 실행 하는 자체가 global이고 global은 window이기 때문에~

id가 btn인 button을 만들어놓았다고 생각하고 예제 코드를 짜본다.

    var btn = document.getElementById('btn');
    btn.addEventListener('click', someone.whoAmI);

를 하고 버튼을 클릭하면 <button> ~~ 이 나온다. 왜냐 함수만 넘겨준 것이기 때문에 함수를 호출한 것이 아니기 때문이다. 함수를 호출한 녀석은 btn 즉 button이다. 그래서 this가 button이 되는 것이다. 중요한 것은 호출한 놈, 호출한 객체인것이다.

예외로 호출한 놈이 this가 되지 않기 위해서는 bind를 해주는 방법이 있다.

    var bindedWhoAmI = myWhoamI.bind(somone);
    bindedWhoAmI();
    var btn = document.getElementById('btn');
    btn.addEventListener('click', bindedWhoAmI);

이렇게 하면 this가 someone으로 고정되어서 어떤 경우라도 someone이 this로 나오게 된다.

정리하면 this는 호출할 때 결정이 되는데 호출한 객체가 this가 된다. 하지만 예외적으로 call, apply, bind 등을 활용 하면 this를 변경 시킬 수 있다.