export default class Todo {
    todo = [{id: 1, todo: '공부하기'}, {id: 2, todo: '열심히하기'}];
    nextId = 3;

    constructor($target) {
        this.init($target);
    }

    addTodo(event) {
        event.preventDefault();
        const input = document.querySelector('input');
        const value = input.value;
        const ul = document.querySelector('ul');
        this.renderLi(ul, {id: this.nextId, todo: value});
        this.todo.push({id: this.nextId, todo: value});
        input.value = '';
        this.nextId++;
    }
    
    renderForm(section) {
        const form = document.createElement('form');
        const input = document.createElement('input');
        const button = document.createElement('button');
        input.placeholder = '할 일을 입력하세요';
        button.innerText = '추가';
        button.type = 'submit';
        form.addEventListener('submit', this.addTodo.bind(this));
        form.appendChild(input);
        form.appendChild(button)
        section.appendChild(form);
    }

    delTodo (e) {
        const btn = e.target;
        const li = btn.parentNode;
        const ul = li.parentNode;
        const id = li.dataset.value;
        ul.removeChild(li);
        this.todo = this.todo.filter(v => v.id !== parseInt(id));
    }

    renderLi(ul, value) {
        const li = document.createElement('li');
        li.innerText = value.todo;
        li.dataset.value = value.id;
        const button = document.createElement('button');
        button.innerText = 'X';
        button.addEventListener('click', this.delTodo.bind(this));  
        li.appendChild(button);
        ul.appendChild(li);
    }

    renderTodo(ul) {
        this.todo.forEach((value) => {
            this.renderLi(ul, value);
        });
    }


    init($target) {
        const section = document.createElement('section');
        this.renderForm(section);
        const ul = document.createElement('ul');
        this.renderTodo(ul);
        section.appendChild(ul);
        $target.appendChild(section);
    }
}