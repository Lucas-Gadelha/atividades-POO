class entity {
  //atributos
  x: number;
  y: number;
  step: number;
  image: p5.Image
  //parametros
  constructor(x: number, y:number,step: number,image: p5.Image){
    this.x = x;
    this.y = y;
    this.step = step;
    this.image = image;
  }
  //métodos
  draw(): void {
    image(this.image, this.x * this.step, this.y * this.step, this.step, this.step);
  }
}
class board {
  nl: number;
  nc: number;
  step: number;
  background: p5.Image;

  constructor(nl: number, nc: number, step: number, background: p5.Image){
    this.nl = nl;
    this.nc = nc;
    this.step = step;
    this.background = background;
  }
  draw(): void{
    image(this.background, 0, 0, this.nc * this.step, this.nl * this.step);
    for(let x = 0; x < this.nc; x++){
      for(let y = 0; y < this.nl; y++){
        noFill();
        stroke(0);
        strokeWeight(2);
        rect(x * this.step, y * this.step, this.step, this.step);
      }
    }
  }
}


let poro_img: p5.Image;
let tresh_img: p5.Image;
let Board_img: p5.Image;
let poro: entity;
let tresh: entity;
let Board: board;
let POWUP: boolean = false;
let power_time: number;
let death: number = 0;
let point: number = 0;

function loadImg(path: string): p5.Image {
  return loadImage(path,
    () => {console.log("loading" + path + "deu certo")},
    () => {console.log("loading" + path + "deu errado")}
  )
}

function preload() {
  poro_right = loadImg('../sketch/poro_right.png');
  poro_left = loadImg('../sketch/poro_left.png');
  poro_bigode_right = loadImg('../sketch/poro_bigode_right.png');
  poro_bigode_left = loadImg('../sketch/poro_bigode_left.png');
   
  tresh_right = loadImg('../sketch/tresh_right.png');
  tresh_left = loadImg('../sketch/tresh_left.png');

  Board_img = loadImg('../sketch/mapa_sr.png');

  braum_img = loadImg('../sketch/braum.png');
}

function setup() {
  
  frameRate(30);

  let size = 100;
  poro = new entity(2, 2, size, poro_right);
  tresh = new entity(1, 1, size, tresh_right);
  
  Board = new board(7, 8, size, Board_img);
  braum = new entity(Math. round(random(Board.nc-1)), Math. round(random(Board.nl-1)), size, braum_img);
  createCanvas(Board.nc * size +100, Board.nl * size +100);
  
}

function keyPressed() {
  if (keyCode === LEFT_ARROW && poro.x > 0){
    poro.x--;
    if(POWUP == true){
      poro.image = poro_bigode_left;
    }else{
      poro.image = poro_left;
    }    
  }else  if (keyCode === RIGHT_ARROW && poro.x < Board.nc-1){
    poro.x++;
    if(POWUP == true){
      poro.image = poro_bigode_right;
    }else{
      poro.image = poro_right;
    } 
  }else  if (keyCode === UP_ARROW && poro.y > 0){
    poro.y--;
  }else  if (keyCode === DOWN_ARROW && poro.y < Board.nl-1){
    poro.y++;
  }

  if (keyCode === "A".charCodeAt(0)){
    tresh.x--;
    tresh.image = tresh_left;
  }else  if (keyCode === "D".charCodeAt(0)){
    tresh.x++;
    tresh.image = tresh_right;
  }else  if (keyCode === "W".charCodeAt(0)){
    tresh.y--;
  }else  if (keyCode === "S".charCodeAt(0)){
    tresh.y++;
  } 
}  

function collision(){
  if(tresh.x == poro.x && tresh.y == poro.y){
    if(POWUP == true){
      point += 1;
      return point;
    }else{
      death += 1;
      return death;
    }
  }
}

function powerup(){
  if(poro.x == braum.x && poro.y == braum.y){
    power_time = frameCount;
    poro.image = poro_bigode_right;
    POWUP = true;
    
  }if(frameCount - power_time > 120){
    POWUP = false;
  }
}

function draw() {
  background(255);
  text("tempo: " + frameCount/30, 820, 100);
  
  Board.draw();
  tresh.draw();
  braum.draw();
  poro.draw();
  powerup();
  collision();
  text("mortes: " + death + "\n pontos: " + point, 800, 150);
}