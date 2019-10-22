## useNotification

Notification API를 활용할 것임. new Notification('hi') 이런식으로하면 윈도우 기준으로 오른쪽 밑에 알람이 뜬다. 완전 신기!!
무슨 일이 일어났을 때 알람이 뜨게 하면 좋을듯!! 모바일이면 진동이 오게도 가능한듯 !!

    const useNotification = (title, options) => {
        if(!("Notification" in window)){
            return;
        }  // Notification이 없으면 이 기능을 지원하지 않기 때문에 끝, 윈도우가 아니여도 끝

        const fireNotif = () => {
            if(Notification.permission !== "granted"){ // 알람을 허용 한게 아니라면
                Notification.requestPermission().then(permission => { // 알람을 허용하시겠습니까?? 같은 창을 띄워 준다.
                    if(permission === "granted"){  // 허용했으면 알람을
                        new Notification(title, options);
                    }
                    else{  // 아니면 그냥 끝.
                        return;
                    }
                })
            }
            else {
                new Notification(title, options);
            }
        }
        return fireNotif
    }

    const App = () => {
        const triggerNotif = useNotification("제에목", {
            body: "아무거나아"
        }); // 제목이 위에 뜨고 body 부분이 밑에 조그맣게 뜬다. mdn으로 가서 잘 찾아보면 쉽게할 수 있음! 이미지, 아이콘, 방향 ~~~ 등등 전달할 수 있따.

        return (
            <div>
                <button onClick ={triggerNotif}></button>
            </div>
        )
    }


이건 hook 은 아니지만 훌륭한 함수형 프로그래밍이다. 아름답당