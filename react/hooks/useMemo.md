# useMemo 란

퍼포먼스 최적화와 가독성에 도움을 주는 hook


    import React, { useMemo, useState } from 'react;

    const User = () => {
        const [nickname, setNickname] = useState('');
        const nicknameLength = useMemo(() =>  nickname.length, [nickname]);
        ...
    }

이런식으로 useMemo를 하면 2번째 인자로 들어간 [] 안의 state값이 변경 될때만 1번째 인자의 함수가 재실행되어 퍼포먼스 최적화에 도움을 줄 수 있다.