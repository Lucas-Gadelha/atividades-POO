const readline = require('readline-sync');
let input = (): string => readline.question();
let write = (x : any) => process.stdout.write("" + x);

class Pet {
	private nome: string = "";
	private saciedade: number;
    private limpeza: number;
    private limpezaMax: number;
    private energia: number;
    private energiaMax: number;
	private saciedadeMax: number;
    private isAlive: boolean = true;
    idade: number;
    diamantes: number;

	constructor(nome: string, saciedadeMax: number, limpezaMax: number, energiaMax: number){
		this.setNome(nome);
		this.saciedade = saciedadeMax;
		this.saciedadeMax = saciedadeMax;
        this.limpeza = limpezaMax;
		this.limpezaMax = limpezaMax;
        this.energia = energiaMax;
		this.energiaMax = energiaMax;
        this.idade = 0;
        this.diamantes = 0;
	}

    public setNome(nome: string) {
        if (nome.length == 0) {
            this.nome = "bichinho";
        } else {
            this.nome = nome;
        }
    }

    public getNome(): string {
        return this.nome;
    }

    public getSaciedade(): number {
        return this.saciedade;
    }

    public getLimpeza(): number {
        return this.limpeza;
    }

    public getEnergia(): number {
        return this.energia;
    }

    public getDiamantes(): number {
        return this.diamantes;
    }

    public getIdade(): number {
        return this.idade;
    }

    public setSaciedade(saciedade: number) {
        if (saciedade < 0) {
            this.saciedade = 0;
            this.isAlive = false;
            write("passou fome até morrer\n");
        } else if (saciedade > this.saciedadeMax) {
            this.saciedade = this.saciedadeMax;
            this.isAlive = false;
            write("comeu até explodir!\n");
        } else {
            this.saciedade = saciedade;
        }
    }

    public setLimpeza(limpeza: number) {
        if (limpeza < 0) {
            this.limpeza = 0;
            this.isAlive = false;
            write("morreu de sujismundo\n");
        } else if (limpeza > this.limpezaMax) {
            this.limpeza = this.limpezaMax;
            this.isAlive = false;
            write("morreu tinindo!\n");
        } else {
            this.limpeza = limpeza;
        }
    }

    public setEnergia(energia: number) {
        if (energia < 0) {
            this.energia = 0;
            this.isAlive = false;
            write("morreu de cansaço\n");
        } else if (energia > this.energiaMax) {
            this.energia = this.energiaMax;
            this.isAlive = false;
            write("morreu dormindo!\n");
        } else {
            this.energia = energia;
        }
    }

    public brincar(): void {
        if(!this.isAlive) {
            write("Pet morto não brinca\n");
            return;
        }
        this.setSaciedade(this.saciedade - 1);
        this.setEnergia(this.energia - 1);
        this.setLimpeza(this.limpeza - 1);
        this.idade += 1;
        this.diamantes += 1;
    }

    public comer(): void {
        if(!this.isAlive) {
            write("Pet morto não come\n");
            return;
        }
        this.setSaciedade(this.saciedade + 1);
        this.idade += 1;
    }

    public dormir(): void {
        if(!this.isAlive) {
            write("já está no sono eterno\n");
            return;
        }
        this.setEnergia(this.energia + 1);
        this.idade += 1;
    }

    public banho(): void {
        if(!this.isAlive) {
            write("Banho não adianta pra tirar o cheiro de defunto\n");
            return;
        }
        this.setLimpeza(this.limpeza + 1);
        this.idade += 1;
    }

	public toString() {
		if (this.isAlive)
            return this.nome + "\nsaciedade:" + this.saciedade + "/" + this.saciedadeMax + "\nlimpeza:" + this.limpeza + "/" + this.limpezaMax +"\nenergia:" + this.energia + "/" + this.energiaMax + "\nidade: " + this.idade + " / diamantes: " + this.diamantes;
        return "RIP";
	}
}

class IO {
    create_pet(): Pet {
        write("Digite o nome do seu pet: ");
        let nome = input();
        write("Digite o max de saciedade: ");
        let saciedadeMax = +input();
        write("Digite o max de limpeza: ");
        let limpezaMax = +input();
        write("Digite o max de energia: ");
        let energiaMax = +input();
        let pet = new Pet(nome, saciedadeMax, limpezaMax, energiaMax);
        return pet
    }

    mostrar_help() {
        write("Comandos:\n");
        write("  init <nome> <maxsaciedade> <maxlimpeza> <maxenergia>: cria um novo pet\n");
        write("  show: mostra o pet\n");
        write("  play: faz o pet brincar\n");
        write("  eat: faz o pet comer\n");
        write("  bath: faz o pet tomar banho\n");
        write("  sleep: faz o pet dormir\n");
        write("  end: sai do programa\n");
    }

    shell() {
        let pet = new Pet("", 0, 0, 0);//this.create_pet();
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
                write("" + pet + "\n");
            } else if (words[0] == "eat") {
                pet.comer();
            } else if (words[0] == "play") {
                pet.brincar();
            } else if (words[0] == "bath") {
                pet.banho();
            } else if (words[0] == "sleep") {
                pet.dormir();
            } else if (words[0] == "init") {
                let nome = words[1];
                let sacMax = +words[2];
                let limpMax = +words[3];
                let eneMax = +words[4];
                pet = new Pet(nome, sacMax, limpMax, eneMax);
            } else {
                console.log("Comando inválido");
            }
        }
    }
}

let io = new IO();
io.shell();