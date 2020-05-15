import Person from './Person';

describe('한꺼번에 테스트', () => {
    test('사람 생성!', () => {
        const person = new Person('정은', '최');
        expect(person).toEqual({firstName:'정은', lastName: '최'});
    });
    
    test('사람 함수 테스트', () => {
        const person = new Person('정은', '최');
        expect(person.fullName()).toBe('정은 최');
    });
});
