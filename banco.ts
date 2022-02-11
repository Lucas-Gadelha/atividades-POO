const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

class Pessoa {
  nome: string;
  constructor(nome: string) {
      this.nome = nome;
  }
  public toString() {
      return this.nome;
  }
}

class Banco {
  caixas: Array<Pessoa | null>;
  espera: Array<Pessoa>;

  constructor(qtdCaixas: number) {
      this.caixas = []; //length 0
      for (let i = 0; i < qtdCaixas; i++) {
          this.caixas.push(null);
      }
      this.espera = [];
  }

  //coloca a pessoa na fila de espera
  chegarPessoa(pessoa: Pessoa): void {
    this.espera.push(pessoa);
  }

  //retorna erro se for maior do que o número de caixas existente, se já houver alguém no caixa e se não houver ninguém na fila
  chamarNoCaixa(caixa: number): boolean {
      if (caixa > this.caixas.length){
          console.log("esse caixa não existe!");
          return false;
      } if (this.caixas[caixa] != null) {
          console.log("caixa ocupado no momento, continue na fila " + this.espera[0]);
          return false;
      } if (this.espera.length == 0) {
          console.log("fila vazia, não há clientes para esse caixa");
          return false;
      } else {
        this.caixas[caixa] = this.espera[0]
        this.espera.shift();
        return true;
    }
      return false;
  }

//   saiu(nome: string): boolean {
//   }

  //se o caixa estiver ocupado, retira a pessoa do caixa
  finalizarAtendimento(caixa: number): boolean {
      if(this.caixas[caixa] == null) {
          console.log("não há ninguém sendo atendido nesse caixa");
          return false
      } else {
          console.log("O atendimento do cliente " + this.caixas[caixa]!.nome + " foi finalizado, caixa livre");
          this.caixas[caixa] = null;
          return true
    }
  }

  public toString() {
      let str = "caixas: | ";
      for (let i = 0; i < this.caixas.length; i++) {
          let pessoa = this.caixas[i];
          str += i + ": ";
          //str += pessoa !== null ? pessoa.toString : "----";
          if (pessoa == null) {
              str += "vazio";
          } else {
              str += pessoa.toString();
          }
          str += " |";
      }
      str += "\nespera: ";
      for (let pessoa of this.espera) {
          str += pessoa.toString() + " ";
      }
      return str;
  }
}

class IO {
    create_pessoa(): Pessoa {
        write("Digite seu nome: ");
        let nome = input();
        let pessoa = new Pessoa(nome);
        return pessoa
    }

    mostrar_help() {
        write("Comandos:\n");
        write("  help: mostra os comandos novamente\n")
        write("  banco <número de caixas>: cria um novo banco com caixas vazios\n");
        write("  pessoa: para adicionar uma pessoa no fim da fila\n");
        write("  show: mostra os caixas e a fila\n");
        write("  prox <x>: chamar próximo da fila para o caixa número x\n");
        write("  finalizar <x>: finaliza o atendimento do caixa x\n");
        write("  saiu <nome>: retira a pessoa do caixa e da fila\n"); 
        write("  end: sai do programa\n");              
    }

    shell() {
        let banco = new Banco(0);
        let pessoa = new Pessoa("");
        this.mostrar_help();
        while (true) {
            write("$ ");
            let line = input();
            let words = line.split(" ");
            if (words[0] == "end") {
                break;
            } else if (words[0] == "help") {
                this.mostrar_help();
            } else if (words[0] == "show") {
                write("" + banco + "\n");
            } else if (words[0] == "prox") {
                let caixa = +words[1];
                banco.chamarNoCaixa(caixa);
            } else if (words[0] == "banco") {
                let caixas = +words[1];
                banco = new Banco(caixas);
            } else if (words[0] == "pessoa") {
                let nome = words[1];
                pessoa = new Pessoa(nome);
                banco.chegarPessoa(pessoa);
            } else if (words[0] == "prox") {
                let caixa = +words[1];
                banco.chamarNoCaixa(caixa);
            } else if (words[0] == "finalizar") {
                let caixa = +words[1];
                banco.finalizarAtendimento(caixa);
            } 
            // else if (words[0] == "saiu") {
                // let nome = words[1];
                // banco.saiu(nome);
            // }
            else {
                console.log("Comando inválido");
            }
        }
    }
}

let io = new IO();
io.shell();