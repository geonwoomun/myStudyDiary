const gugudan = () => {
  let input = document.querySelector("#answer");
  let result = document.querySelector("#result");
  input.value = "";
  let firstNum = Math.floor(Math.random() * 9 + 1);
  let secondNum = Math.floor(Math.random() * 9 + 1);

  let question = document.querySelector("#question");

  question.innerHTML = `${firstNum} x ${secondNum} ?`;

  let btn = document.querySelector("#submit");

  btn.addEventListener("click", () => {
    let answer = parseInt(input.value);
    if (answer === firstNum * secondNum) {
      result.innerHTML = "정답입니다!";
      gugudan();
      input.value = "";
    } else {
      result.innerHTML = "땡";
    }
  });
};

gugudan();
let reset = document.querySelector("#reset");
reset.addEventListener("click", gugudan);
