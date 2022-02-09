let x_bola = 50;
let y_bola = 50;
let x_vel = 4;
let y_vel = 4;
let diam = 50;
let raio = diam/2;

function setup() {
  createCanvas(windowWidth,windowHeight);
}

function draw() {
  background(220);
  x_bola += x_vel;
  y_bola += y_vel;
  if(x_bola+raio >= width){
    // x_bola = 0;
    x_vel *= -1
  };
  if(y_bola+raio >= height){
    // y_bola = 0;
    y_vel *=-1
  };
  if(x_bola-raio <= 0){
    // x_bola = width;
    x_vel *= -1
  };
  if(y_bola-raio <= 0){
    // y_bola = height;
    y_vel *= -1
  };
  circle(x_bola, y_bola, diam);
}