class Bubble {
  x: number;
  y: number;
  letra: string;
  velocidade: number;
  static raio: number = 20;
  alive: boolean = true;

  constructor(x: number, y: number, letra: string, velocidade: number){
    this.x = x;
    this.y = y;
    this.letra = letra;
    this.velocidade = velocidade;    
  }
  update() {
    this.y += this.velocidade;
  }

  //métodos
  draw(): void {
    fill(255);
    stroke(255);
    circle(this.x, this.y, Bubble.raio);
    fill(0);
    stroke(0);
    textSize(15);
    text(this.letra, this.x -5, this.y +5);

  }
}

class Board {
    bubbles: Bubble[];
    timeout: number = 30;
    timer: number = 0;
    hits: number = 0;
    mistakes: number = 5;

    constructor(){
        this.bubbles = [new Bubble(80,100,"b",1)];

    }

    //métodos
    update() : void {
      this.checkBubbleTime();
      this.markOutsideBubble();
      
      for (let bubble of this.bubbles){
        bubble.update();
      }
      this.removeOutsideBubble();
    }

    removeByHit(code: number) : void {
      for(let bubble of this.bubbles){
        if(bubble.letra[0].toUpperCase().charCodeAt(0) == code){
          bubble.alive = false;
          this.hits++;
          break;
        }
      }
    }

    checkBubbleTime() : void {
      this.timer -= 1;
      if(this.timer <= 0){
        this.addBubble();
        this.timer = this.timeout;
      }
    }

    markOutsideBubble() : void {
      for(bubble of this.bubbles) {
        if(bubble.y + Bubble.raio >= height) {
          bubble.alive = false;
          this.mistakes--;
        }
      }
    }

    removeOutsideBubble() : void {
      /* FUNÇÃO DE FILTRAGEM MANUAL
      let vivas: Bubble[] = [];
      for(let bubble of this.bubbles){
        if(bubble.alive){
          vivas.push(bubble);
        }
      } 
      this.bubbles = vivas; */
      this.bubbles = this.bubbles.filter(b => b.alive);
    }

    addBubble() : void {
      let x = random(0, width - 2 * Bubble.raio);
      let y = -2* Bubble.raio
      let letra = random(["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"]);
      let velocidade = random(1, 5);
      let bubble = new Bubble(x,y,letra,velocidade);
      this.bubbles.push(bubble);
    }
    draw() : void {
      stroke("white");
      fill("white");
      textSize(30);
      text("acertos: " + this.hits + " vidas: " + this.mistakes, 30, 30);

      for (let bubble of this.bubbles){
         bubble.draw();
      }
    }
  }

class Game {
//   activeFunction: () => void;
  board: Board;

  activeState () => void;

  constructor() {
    this.board = new Board();
    this.activeState = this.gamePlay;
  }
  
  gamePlay() : void {
    this.board.update();
    background(50,50,50);
    this.board.draw();
    if(this.board.mistakes <= 0){
      this.activeState = this.gameOver;
    }
  }
  gameOver() : void {
    background(255,0,0);
    fill(0);
    stroke(0);
    textSize(80);
    text("Só lamento, amigo", 50, 300);
    // textSize(40);
    // text("aperte qualquer tecla para recomeçar", 50, 400);
  }
}


let game: Game;

function setup() {
  // game = new Game();
  game = new Game();
  frameRate(30);
  createCanvas(800,600);
  // frameRate(30);
}

function keyPressed() {
  game.board.removeByHit(keyCode);
  // if(game.activeState == this.gameOver){
  //   game.board.mistakes = 5;
  //   game.activeState = game.gamePlay;
  }
}

function draw() {  
  game.activeState();
}