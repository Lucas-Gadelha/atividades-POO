//função padrão js
function mult(a:number, b:number):number{
    return a*b;
};
console.log(mult(2,2));

//variável que executa função
let mult1 = function (a:number, b:number):number{
    return a*b;
};
console.log(mult1(3,4));

//função front arrow
let mult2 = (a:number, b:number):number => {
    return a*b;
};
console.log(mult2 (5,6));

//função front arrow com poucas linhas
let mult3 = (a:number, b:number):number => (a*b);
console.log(mult3 (7,8));
