let one = document.querySelector("#one")

let two = document.querySelector("#two");

let btn = document.querySelector("button");
btn.addEventListener("click", () => {
    one = parseInt(one.value);
    two = parseInt(two.value);
    let result = one + two;

    let body = document.querySelector("body");
    
    let res = document.createElement('div');
    res.innerText = result;
    body.appendChild(res);
})


