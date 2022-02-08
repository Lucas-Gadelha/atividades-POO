//código para ter input

// const readline = require('readline-sync');
// let input = (): string => readline.question();
// let write = (x : any) => process.stdout.write("" + x);

// console.log("digite");
// let nome = readline.question("");
// console.log(nome);


//código cinema
class Cliente {
    //atributos
    nome: string;
    fone: number;
    //constructor
    constructor(nome: string, fone: number){
        this.nome = nome;
        this.fone = fone;
    }
    //mostra as variáveis do objeto da classe
    toString(): string {
        return `cliente: ${this.nome} Tel: ${this.fone}`;
    }
}

class Cinema {
    //esse atributo é uma lista que pode conter clientes ou vazio(null)
    fileira: Array <Cliente | null>
    
    constructor(assentos: number){
        this.fileira = [];
        for (let i=0; i<assentos; i++){
            this.fileira.push(null);
        }
    }

    indexOF(nome: string): number {
        //return this.fileira.findeIndex(c => c != null && c.nome == nome);
        for (let i=0; i < this.fileira.length; i++) {
            if (this.fileira[i] != null && this.fileira[i].nome == nome){
                return i;
            }
        }
        return -1;
    }

    reservar(cliente: Cliente, cadeira: number): Boolean{
        if (cadeira < 0 || cadeira > this.fileira.length) {
            console.log("Esse assento não existe");
            return false
        }
        if (this.fileira[cadeira] != null) {
            console.log("a cadeira já está reservada");
            return false;
        }
        if (this.indexOF(cliente.nome) != -1) {
            console.log("Você já tem uma cadeira reservada!");
            return false;
        }
        this.fileira[cadeira] = cliente;
        return true;
    }

    cancelarCadeira(cadeira: number) {
        if (cadeira < 0 || cadeira > this.fileira.length) {
            console.log("Esse assento não existe");
            return false
        }
        if (this.fileira[cadeira] == null) {
            console.log("não houve reserva para essa cadeira");
            return false;
        }
        this.fileira[cadeira] = null;
        console.log("cadeira " + cadeira + "cancelada com sucesso")
        return true;
    }
    cancelarNome(nome: string) {
        if (this.indexOF(nome) == -1) {
            console.log("Você não reservou nenhuma cadeira");
            return false;
        }
        this.fileira[this.indexOF(nome)] = null;
        return true;
    }
    toString(): string{
        let livres = 0;
        for (let i=0; i < this.fileira.length; i++) {
            if(this.fileira[i] == null){
                console.log("-");
                livres++
            } else {
            console.log(this.fileira[i].nome);
            // ocupados++
            }
        }        
        return "sala com: " + this.fileira.length + " assentos \nlugares livres: " + livres;
    }
}


let lucas = new Cliente("lucas", 999999999);
let lazaro = new Cliente("Lázaro", 888888888);
let lara = new Cliente("Lara", 777777777)
let sala = new Cinema(20);

sala.reservar(lucas,15);
sala.reservar(lazaro,14);
sala.reservar(lara, 8);
console.log(sala.toString());
sala.cancelarCadeira(14);
sala.cancelarNome("lucas");
console.log(sala.toString());




