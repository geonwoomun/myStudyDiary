const button = document.querySelector("button");
const result = document.querySelector("#result");
const input = document.querySelector("input");
const key = 'name';
const loadName = () => {
    localStorage.setItem(key, input.value);
    getName();
}
const getName = () => {
    const name = localStorage.getItem(key);
    result.innerHTML = name;
}

button.addEventListener("click", loadName);
// localStorage는 통신이 끊겨도 데이터가 남아있지만, sessionStorage는 없어진다.