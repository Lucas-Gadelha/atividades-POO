class Criança{
    nome:string;
    idade:number;

    constructor(nome:string,idade:number){
        this.nome = nome;
        this.idade=idade;
    }
    public toString(){
        return this.nome;
    }
}

class PulaPula{
    fila :Array<Criança >;
    dentro:Array <Criança >;

    constructor(){
        this.fila=[];
        this.dentro=[];
    }

    entrarFila(child:Criança): boolean{
        if(child.idade < 2 || child.idade >= 15){
            console.log("você não tem idade para brincar!");
            return false
        }
        this.fila.push(child);
        return true;
    }

    entra(): boolean{
        if(this.dentro.length < 3){
            this.dentro.push(this.fila[0])
            console.log(this.fila[0] + " Entrou no Pula-Pula");
            this.fila.shift();
            return true
        }
        console.log("Pula-Pula lotado, espere sua vez");
        return false;
    }

    sair(){
        console.log(this.dentro[0].nome + " Pulou tão alto que saiu do Pula-Pula")
        this.fila.push(this.dentro[0]);
        this.dentro.shift()
    }

    remover(crianca:string){

        for(let i=0; i<this.dentro.length; i++){
            if (this.dentro[i].nome == crianca){
                console.log(this.dentro[i]!.nome + " Sua mãe veio te buscar, Até a próxima")
                delete this.dentro[i]
            }
        }

        for(let i=0; i<this.fila.length; i++){
            if (this.fila[i].nome == crianca){
                console.log(this.fila[i]!.nome+" Sua mãe veio te buscar, Até a próxima")
                delete this.fila[i]
            }
        }
    }

    public tostring(){
        return "na fila: " + this.fila + "\ndentro do brinquedo: " + this.dentro;
    }
}

let pula = new PulaPula();
pula.entrarFila(new Criança("Ana", 17));
pula.entrarFila(new Criança("Mateus", 10));
pula.entrarFila(new Criança("felicia", 8));
pula.entrarFila(new Criança("Clara", 7));
pula.entrarFila(new Criança("Beto", 5));

pula.entra(); 
pula.entra(); 
pula.entra();
pula.entra();
console.log(pula.tostring())
pula.sair();
pula.entra();
pula.remover("Beto");
pula.sair(); 
