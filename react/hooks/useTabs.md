### useTabs custom hook with Nomad Coders

    const useTabs = (initialTab, allTabs) => {
        if(!allTabs || !Array.isArray(allTabs)) {
            return;
        }

        const [currentIndex, setCurrentIndex ] = useState(initialTab);
        return {
            currentItem : allTabs[cureentIndex],
            changeItem : setCurrentIndex
        };
    };

이런식으로 선언 해서 사용하였고 initialTab이라는 초기값과 allTabs라는 tab들이 있는 배열을 받아서 사용하는데
allTabs가 없거나 배열이 아니라면 그냥 바로 리턴을 해버리고

const [currentIndex, setCurrentIndex] = useState(initialTab);으로 
state값들을 초기화하고

currentItem 으로 현재 tab을 반환하고 changeItem으로 state를 바꿀 수 있는 setCurrentIndex를 반환한다.

그것을 밑의 App 함수형 컴포넌트에서 받아서 사용한다.

hook을 사용할 때도 클래스형 컴포넌트와 마찬가지로 state 값이 바뀌면 리렌더링이 된다는 것을 알 수 있었따. hook에는 render()가 없지만 state 값이 바뀌면 리렌더링 된다.
클래스형 컴포넌트는 state값이 바뀌면 render 밑의 부분만 리렌더링 됐었는데 hooks는 App전체가 리렌더링 되어서 이 부분에서는 좀 비효율적일지도 모른다. 하지만 memo와 같은 기능을 사용하면 아마 더 효율적으로 사용 할 수 있을 것이다.
