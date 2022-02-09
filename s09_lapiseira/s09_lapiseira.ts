class Grafite {
  calibre : number;
  dureza: string;
  tamanho: number;

  constructor (calibre: number, dureza: string, tamanho: number){
    this.calibre = calibre;
    this.dureza = dureza;
    this.tamanho = tamanho;
  }

  consumo(): number{
    if(this.dureza == "HB"){
      return 1;
    }
    if(this.dureza == "2B"){
      return 2;
    }
    if(this.dureza == "4B"){
      return 4;
    }
    if(this.dureza == "6B"){
      return 6;
    }
    return 0;
  }

  toString() {
    return "grafite: " + this.calibre + ":" + this.dureza + ":" + this.tamanho;
  }
}

class Lapiseira {
  calibre: number;
  grafite: Grafite | null;
  extra: Array<Grafite | null>;
  qtd: number;

  constructor (calibre: number, qtd: number){
    this.calibre = calibre;
    this.grafite = null;
    this.qtd = qtd;
    this.extra = [];
    // for (let i=0 ; i < qtd-1 ; i++) {
    //   this.extra.push(null);
    // }
  }

  setGrafite(grafite: Grafite): boolean{
    if(this.grafite != null && this.extra.length < this.qtd){
      this.extra.push(grafite);
      console.log("sua lapiseira possui: " + this.extra.length + " grafites extras");
      return true;
    }
    if(this.grafite != null && this.extra.length >= this.qtd){
      console.log("tambor da lapiseira está cheio!");
      return false;
    }
    if(grafite.calibre != this.calibre){
      console.log("O calibre do grafite é diferente do grafite da lapiseira");
      return false;
    }
    this.grafite = grafite;
    return true;
  }
  removerGrafite(): Grafite | null{
    if(this.grafite == null){
      console.log("A lapiseira não possui grafite");
      return null;
    }
    let grafite = this.grafite;
    this.grafite = null;
    
    if(this.extra != null){
      this.grafite = this.extra[0]
      this.extra.splice(0,1);
    }
    return grafite;
  }

  escrever(folhas: number): boolean{
    if(this.grafite == null){
      console.log("A lapiseira não possui grafite");
      return false;
    }
    
    let gasto = this.grafite.consumo() * folhas;
    let total = this.grafite.tamanho;
    let extras = this.extra.length;
    let escrito = 0;

    if(gasto <= this.grafite.tamanho){
      this.grafite.tamanho -= gasto;
      console.log("vocês escreveu " + folhas + " folhas, e sobrou " + this.grafite.tamanho + " de grafite");
    } else {

      let restante = gasto - total;
      for(let i=0 ; i<extras ; i++){
        total = this.grafite.tamanho / this.grafite.consumo();
        if(restante > total && this.extra != null){
          restante -= total;
          escrito += total;
          this.removerGrafite();
          console.log(escrito, total, restante);
          
        } if(restante <= total) {
          this.grafite.tamanho -= restante;
          console.log("vocês escreveu " + folhas + " folhas, e sobrou " + this.grafite.tamanho + " de grafite");
          return true;
        } 
        
      }
      escrito += this.grafite.tamanho / this.grafite.consumo();
      console.log("você só escreveu "+ escrito + " folhas, e seu grafite acabou");
      this.grafite.tamanho = 0;
      
    }
    if(this.grafite.tamanho == 0){
      this.grafite = null;
    }
    return true;
  }
}

let faber = new Lapiseira(0.5, 3);
let grafite = new Grafite(0.5, "4B", 30);
let graf2 = new Grafite(0.5, "2B", 20);
let graf3 = new Grafite(0.5,"6B", 50);
faber.setGrafite(grafite);
faber.setGrafite(graf2);
faber.setGrafite(graf3);
// faber.removerGrafite();
console.log(faber);
faber.escrever(2);
faber.escrever(10);
console.log(faber);