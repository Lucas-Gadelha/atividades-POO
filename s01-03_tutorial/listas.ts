//lista js
let l = [0,1,2,3,4];
console.log(l);

//lista tipada ts
let l1:number[] = [2,4,6,8,10,12];
let l2:string[] = ["lucas","ovo","pão","bolacha","biscoito","arroz"];
console.log(l1, l2);

//iteração js
for(let i=0; i<l1.length;i++){
    console.log(i,l1[i],l2[i]);
}

//for in, utiliza índices da lista(não pode ser tipado)
for(let i in l1){
    console.log(i,l1[i]);
}

//for of, utiliza valores da lista(não pode ser tipado)
for(let element of l1){
    console.log(element);
}

//adicionar elementos na lista
l.push(50);
console.log(l);

//tirar elementos da lista
l.splice(5,1);
console.log(l);