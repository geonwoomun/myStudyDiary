import { divide, minus, multiple, sum, createId } from './math';

test('ADD 1 + 1 = 2', () => {
    expect(sum(1, 1)).toBe(2)
});

test('minus 2 - 1 = 1', () => {
    expect(minus(2, 1)).toBe(1)
});

test('mul 3 * 3 = 9', () => {
    expect(multiple(3, 3)).toBe(9)
});

test('ADD 2 / 2 = 1', () => {
    expect(divide(2, 2)).toBe(1)
});

test('create id 문건우, 26', () => {
    expect(createId('문건우', 26)).toEqual({name: '문건우', age: 26})
})
