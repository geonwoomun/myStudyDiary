function zz () {
    console.log(this);
}

let a = {

}
b = zz.bind(a);

b()