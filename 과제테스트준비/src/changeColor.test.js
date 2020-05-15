import { changeColor } from './changeColor';

test('컬러 체인지 테스트', () => {
    const li = document.createElement('li');
    const color = "blue";
    changeColor(li, color);
    expect(li.style.backgroundColor).toBe('blue');
})