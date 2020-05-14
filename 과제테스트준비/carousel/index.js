const SHOWING_CLASS = 'showing';
const firstItem = document.querySelector('.carousel-item:first-child');
const lastItem = document.querySelector('.carousel-item:last-child');

function slide(e) {
    const currentItems = document.querySelector('.showing');
    if(currentItems) {
        if (e.target.className === 'btn-box') return;

        currentItems.classList.remove(SHOWING_CLASS);
        if (e.target.className === 'previous') {
            const previousItem = currentItems.previousElementSibling;
            if(previousItem) {
                previousItem.classList.add(SHOWING_CLASS);
            }
            else {
                lastItem.classList.add(SHOWING_CLASS);
            }
        }
        if (e.target.className === 'next') {
            const nextItem = currentItems.nextElementSibling;
            if(nextItem) {
                nextItem.classList.add(SHOWING_CLASS);
            }
            else {
                firstItem.classList.add(SHOWING_CLASS);
            }
        } 
    }
    else {
        firstItem.classList.add(SHOWING_CLASS);
    }
}
const btnBox = document.querySelector('.btn-box');
btnBox.addEventListener('click', slide);
slide();
// console.log(firstItems);