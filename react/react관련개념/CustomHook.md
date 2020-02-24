새벽에 오픈 카톡방에서 어떤 분이 hooks에서 Hoc를 쓰고 싶은데 어떡해야 하나요. 에러가 나네요. 이런식으로 글을 올려서 흐음?? 뭐지 나도 궁금하다 싶어서 찾아보았더니 커스텀훅을 만들어서 비슷하게 사용한다 라고 하는 것 같았다. 이미 커스텀 훅을 몇번 만들어 써보고 있었지만 HOC를 대체?? 하기 위한 것이란건 잘 몰랐기에 좋은 시간이었다. 밑은 그 분이 올려주신 코드를 나 혼자 custom hook으로 만들어 본 것이다.
    
    import React, {useState} from 'react';
    import axios from 'axios';

    export const withRequest = (url) => {
        const [posts, setPost] = useState();

        const getPosts = async () => {
            try {
                const res = await axios.get(url);
                setPosts(res.data);
            } catch(e) {
                console.log(e);
            }
        }
        return [ posts, getPosts];
    }


그러면 이제 다른 함수 컴포넌트에서 이렇게 가져와서 사용하면 된다.
    
    const [posts, getPosts] = withRequest(url);

    useEffect(() => {
        getPosts();
    }, []);

한번 더 공부해서 커스텀 훅을 더 잘 만들어 사용할 수 있을 것 같다!!