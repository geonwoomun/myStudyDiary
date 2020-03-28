function add(a, b) {
  if (typeof a === 'number' && typeof b === 'number') {
    return a + b;
  } else {
    return +a + +b;
  }
}

console.log(add("5", "16"));

const a = [1,2,3,4];