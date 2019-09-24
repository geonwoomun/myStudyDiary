## this 란// this가 어디를 가르키느냐

전역공간에서 : window / global
	브라우저 콘솔에서 : window  node.js 에서 global 이라고 하는 객체가 나옴.
함수 내부에서 : window / global  역시 전역 객체 
함수 내부에서도 window 함수 내부의 내부에서도 window 객체안의 메소드 내부의 함수에서도 window
디폴트값이 윈도우고 바뀔수도 잇음.

메소드 호출시 : 메소드 호출 주체  a 객체안의 b 메소드에서 this를 호출하면 a가 나옴
객체 a 안의 객체 b의 메소드 c에서 this를 호출해도 a.b가 나옴.
메소드 바로 앞의 .까지가 this다.
함수는 (전역객체의) 메소드다 ! global.함수 , window.함수 이기 때문에 함수의 this를 출력하면 global이나 window가 나오는 것이라고 생각하자. 옳다는건 아니지만 이렇게 외우면 편하다.

	var a = 10;
	var obj = {
   	 a: 20,
    	 b: function() {
        	console.log(this.a); // 20이 출력

        	function c () {
            	  console.log(this.a); // 10이 출력 된다고 하는데 
            //undefined가 출력 여기서는 this가 global이 나오는데
            // 밑에 전역에서는 this가 {} 가 나오는??
            //어쨋든 다른 a다
            // 그래서 여기서도 this를 쓰는 방법은?
        	}
        	c();
    		}
	}
	obj.b();


	var a = 10;
	var obj = {
   	 a: 20,
    	 b: function() {
        	var self = this; // 밖에서 this를 self 변수에 넣어두고
        	console.log(this.a);

         function c() { // 함수안에서 self.a를 사용하면 obj를 가르킨 상태로 사용가능
            console.log(self.a);
         }
        c();
    	}
      }
      obj.b();

	var a = 10;
	var obj = {
    		a: 20,
    		b: function() {
       		 console.log(this.a);

        	var c= () => { // 또는 이런식으로 화살표 함수를 사용하면
                    // 자동으로 bind 되어 this 사용 가능.
            		console.log(this.a);
        		}
        	c();
    		}
	    }
	  obj.b();


callback에서
기본적으로는 함수내부와 동일, 간단하게 얘기하기 어려움

call, apply, bind에 대하여
	function a(x, y, z) {
    	console.log(this, x, y, z);
	}

	var b = {
   	 c: 'eee'
	};

	a.call(b,1,2,3);  // a로 실행을 하되 b를 this로 받아 그다음 파라미터를 순서대로 받음
	a.apply(b,[1,2,3]); // a로 실행을 하되 b를 this로 받아 그 다음 파라미터를 배열로 한번에 받음
	// call, apply는 즉시 호출을 하는 명령
	var c = a.bind(b); // bind는 새로운 함수를 생성할뿐 호출을 하지는 않음.
	c(1,2,3);   // c 로 하면 b만 넣었기 때문에 인자 3개를 더 받을 수 있고
            // d로 하면 인자 3개를 더 받을 수 있음.
	var d = a.bind(b,1,2);
	d(3);

	var callback = function() { // 원래 this가 그냥 실행하면 global을 가르키게 되겠지만.
    	console.dir(this);
	};

	var obj = {
  	  a: 1
	};
	setTimeout(callback.bind(obj), 100); // bind를 사용하여 this가 obj가 되게 만들어서 
                                    // 실행결과가 obj에 대한 내용이 나옴.

콜백함수에서의 this는 기본적으로 this와 같다
제어권을 가진 함수가 callback의 this를 명시한 경우 그에 따른다.
개발자가 this를 바인딩한 채로 callback을 넘기면 그에 따른다.

생성자함수에서
인스턴스를 가르킨다.

	function Person(n, a) {  // n 과 a를 받아서 Person의 name에 n Person의 age에 a를 대입
    	this.name = n;
    	this.age = a;
	}

	var gomugom = new Person('고무곰','25');
	console.log(gomugom);
자바할 때 클래스 하는것과 같음.

