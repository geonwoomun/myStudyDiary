import React from 'react';
import TodoApp from './TodoApp';
import { render, fireEvent } from '@testing-library/react';

describe('<TodoApp/>', () => {
    it('renders TodoForm and TodoList', () => {
        const { getByText, getByTestId } = render(<TodoApp/>);
        getByText('등록');
        getByTestId('TodoList');
    });

    it('renders two defaults todos', () => {
        const { getByText } = render(<TodoApp/>);
        getByText('TDD 배우기');
        getByText('react-testing-library 사용하기');
    });
    
    it('creates new todo', () => {
        const { getByPlaceholderText, getByText } = render(<TodoApp/>);

        fireEvent.change(getByPlaceholderText('할 일을 입력하세요'), {
            target : {
                value : '새 항목 추가하기'
            }
        });
        fireEvent.click(getByText('등록'));
        getByText('새 항목 추가하기');
    });
    
    it('toggles todo', () => {
        const { getByText } = render(<TodoApp/>);
        const todoText = getByText('TDD 배우기');
        expect(todoText).toHaveStyle('text-decoration : line-through;');
        fireEvent.click(todoText);
        expect(todoText).not.toHaveStyle('text-decoration : line-through;');
        fireEvent.click(todoText);
        expect(todoText).toHaveStyle('text-decoration : line-through;');
    });

    it('removes todo', () => {
        const {getByText } = render(<TodoApp/>);
        const todoText = getByText('TDD 배우기');
        const removeButton = todoText.nextSibling;
        fireEvent.click(removeButton);
        expecT(todoText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미
    })
});

