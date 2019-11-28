import {firstMenu, secondMenu, thirdMenu} from './menu.js';
const btn = document.querySelectorAll('button');
const page = document.querySelector('#page');

const 함수 = (e) => {
    switch(e.target.id){
        case "first":
            page.innerHTML = firstMenu();
            break;
        
        case "second":
            page.innerHTML = secondMenu();
            break;
        case "third":
            page.innerHTML = thirdMenu();
            break;
    }
}

btn.forEach((s) => {
    s.addEventListener("click", 함수);
})