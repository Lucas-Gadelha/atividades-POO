const lado = 50;
const NL = 10;
const NC =10;
let snake_x = 1;
let snake_y = 1;
let snake_color;
let cell_color;
let food_color;
let timer = 0;
let snake_vx = 0;
let snake_vy = 0;
let food_x = 0;
let food_y = 0;
let food_count = 0;


function setup() {
  createCanvas((NC*lado)+80,(NL*lado));
  snake_color = color("black");
  cell_color = color("gray");
  food_color = color("red");
  frameRate(50);
}

function food_generate(){
  food_x = parseInt(random(0,NC));
  food_y = parseInt(random(0,NL));
}

function draw_cell(x,y,cor){
  fill(cor);
  square( x*lado+1, y*lado+1, lado-1);
}

function grid(){
  noStroke();
  for(let i=0; i<NC; i++){
    for(let j=0; j<NL; j++){
      draw_cell(i,j,cell_color);
    }    
  }
}

function snake_walk(){
  if(frameCount - timer > 10){
    timer = frameCount;
    snake_x += snake_vx;
    snake_y += snake_vy;
  }
}
function snake_loop(){
  
  if(snake_x == NC){
    snake_x = 0;
  }
  if(snake_y == NL){
    snake_y = 0;
  }
  if(snake_x == -1){
    snake_x = NC-1;
  }
  if(snake_y == -1){
    snake_y = NL-1;
  }
}
function keyPressed(){
  if (keyCode === LEFT_ARROW && snake_vx == 0){
    snake_vx = -1;
    snake_vy = 0;
  }else if(keyCode === RIGHT_ARROW && snake_vx == 0){
    snake_vx = 1;
    snake_vy = 0;
  }else if(keyCode === UP_ARROW&& snake_vy == 0){
    snake_vy = -1;
    snake_vx = 0;
  }else if(keyCode === DOWN_ARROW && snake_vy == 0){
    snake_vy = 1;
    snake_vx = 0;
  }
}

function draw() {
  background(255);
  grid();

  if(snake_x == food_x && snake_y == food_y){
    food_generate();
    food_count +=1;
  }
  snake_walk();
  snake_loop();
  draw_cell(food_x,food_y,food_color);
  draw_cell(snake_x,snake_y,snake_color);
  text("tempo:\n"+frameCount/50,NC*lado+10,20);
  text("pontos:\n"+food_count,NC*lado+10,60);
}