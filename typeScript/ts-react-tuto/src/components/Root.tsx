import * as React from 'react';
import { useState, useCallback, memo } from 'react';

const Root = () => {
    const [buttons, setButtons] = useState([1, 2]);
  
    const _onButtonClick = useCallback(() => {
      setButtons([1, 2, 3]);
    }, []);
  
    const _onClick = useCallback((button) => (e: React.MouseEvent) => {
        console.log(button)
    }, []);
  
    return (
      <>
        <button onClick={_onButtonClick}>버튼</button>
        {buttons.map((button, index) => (
          <Child key={index} button={button} onClick={_onClick} />
        ))}
      </>
    );
  };
  
interface IChild {
    button: number,
    onClick: (index: number) => (event: React.MouseEvent<HTMLElement>) => void
}  
const Child = memo(({ button, onClick }: IChild) => {
  
    return <button onClick={onClick(button)}>{button}</button>;
  });

export default Root;