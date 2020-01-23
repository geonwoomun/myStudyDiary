// generics 제네릭은 타입스크립트에서 함수, 클래스, interface, type을 사용하게 될때 여러 종류의 타입에 대하여 호환을 맞춰야 
//하는 상황에서 사용하는 문법 

interface Items<T> {
    list: T[];
};

const items: Items<number> = {
    list : [1,2,3,4,5]
};