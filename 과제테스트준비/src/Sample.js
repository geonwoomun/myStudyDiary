export default class Sample {

    $target = null

    constructor($target) {
        this.$target = $target
        this.init($target);
    }
    init($target) {
        const $h1 = document.createElement('h1')
        $h1.innerText = '샘플 프로젝트 연습'
        
        const $h2 = document.createElement('h2');
        $h2.innerText = '하이연';
        $target.appendChild($h1)
        $target.appendChild($h2);

        const $input = document.createElement('input');
        $input.placeholder = '연습용입니다.';
        $target.appendChild($input);
        this.renderList($target);
    }
    sampleFunction() {
        alert('테스트');
    }

    async renderList($target) {
        const ul = document.createElement('ul');
        const data = await this.sampleFunction2();
        data.forEach(value => {
            const li = document.createElement('li');
            const {brand, size, kind} = value;
            li.innerText = `${brand}, ${size}, ${kind}`;
            ul.appendChild(li);
        });
        $target.appendChild(ul);
        this.addDeleteButton($target);
    }

    async sampleFunction2() {
        const data = await fetch('./database/data.json');
        const result = await data.json();
        return result.dresses;
    }

    addDeleteButton($target) {
        const delBtn = document.createElement('button');
        delBtn.innerText = '삭제';
        delBtn.addEventListener('click', () => {
            const ul = document.querySelector('ul');
            ul.innerText = '';
        });
        $target.appendChild(delBtn);
    }


}