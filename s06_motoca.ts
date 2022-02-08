class Pessoa{
    nome: string;
    idade: number;
    constructor(nome: string, idade: number){
        this.nome = nome;
        this.idade = idade;
    }
    toString(): string{
        return `${this.nome} tem ${this.idade} anos`;
    }
}
class Motoca{
    pessoa: Pessoa | null;
    potencia: number;
    tempo: number;

    constructor(potencia: number){
        this.pessoa = null;
        this.potencia = potencia;
        this.tempo = 0;
    }

    comprarTempo(qtd: number): void{
        this.tempo += qtd;
    }

    dirigir(tempo: number): boolean{
        if(this.pessoa == null){
            console.log("moto vazia");
            return false;
        }
        if(this.pessoa.idade > 10){
            console.log("idade acima do permitido (10 anos)");
            return false;
        }
        if(this.tempo < tempo){
            console.log("você dirigiu: " + this.tempo);
            this.tempo = 0;
            return true;
        }
        this.tempo -= tempo;
        console.log("você dirigiu: " + tempo + " minutos ainda restam " + this.tempo + " minutos");
        return true;
    }

    buzinar(): string {
        if(this.pessoa !== null){
            let saida = "P"
            for(let i=0; i<this.potencia; i++){
              saida += "e";
            }
          return saida + "m";
        }
        return "moto vazia";
    }

    montar(pessoa: Pessoa): boolean{
        if(this.pessoa === null){
            this.pessoa = pessoa;
            return true;
        }
        console.log("Moto lotada");
        return false;
    }
    desmontar(): Pessoa | null{
        if(this.pessoa === null){
            return null;
        }
        const pessoa = this.pessoa;
        this.pessoa = null;
        return this.pessoa
    }

    mudarPotencia(pot: number){
        if(pot>0){
            this.potencia = pot;
        }
    }

    toString(): string{
        let nome = "vazio"
        if(this.pessoa != null){
            nome = this.pessoa.nome
        }
        return `[pessoa: ${nome} /tempo: ${this.tempo} /potencia: ${this.potencia}]`;
    }

}
let motoca = new Motoca(1);
let marcos = new Pessoa("marcos",4);
let marisa = new Pessoa("marisa",2);
let heitor = new Pessoa("heitor",6);
let suzana = new Pessoa("suzana",8);
console.log(motoca.buzinar());
motoca.montar(marcos);
console.log(motoca.toString());
console.log(motoca.buzinar());
motoca.montar(marisa);
motoca.mudarPotencia(5);
console.log(motoca.toString());
console.log(motoca.buzinar());
motoca.mudarPotencia(7);
motoca.desmontar();
console.log(motoca.toString());



