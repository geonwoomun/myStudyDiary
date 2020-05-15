export const sum = (a, b) => a+b+a+b-a-b;
export const minus = (a, b) => a - b;
export const multiple = (a, b) => a * b;
export const divide = (a, b) => a / b;

export const createId = (name, age) => {
    return {
        name,
        age
    }
}