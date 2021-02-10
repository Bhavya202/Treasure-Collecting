var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  //preload the image
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg = loadAnimation("gameOver.png");
}

function setup(){
  //create the canvas
  createCanvas(windowWidth,windowHeight);
  
  //creates the background
  path=createSprite(width/2,200);
  path.addImage(pathImg);
  path.velocityY = 4;


  //creating boy running
  boy = createSprite(width/2,height-20,20,20);
  boy.addAnimation("SahilRunning",boyImg);
  boy.scale=0.08;


  cashG = new Group();
  diamondsG = new Group();
  jwelleryG = new Group();
  swordGroup = new Group();
}

function draw() {
  //things in the PLAY state
  if(gameState===PLAY){
  //background
  background(0);
    
  //makes the boy move in x axis
  boy.x = World.mouseX;
  
  //make the boy collide with edges
  edges= createEdgeSprites();
  boy.collide(edges);
  
  //code to reset the background
  if(path.y > height ){
    path.y = height/2;
  }
  
  //create random treasure and sword
  createCash();
  createDiamonds();
  createJwellery();
  createSword();

  //makes the treasure increase if cash is touched
  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection=treasureCollection + 50;
  }
    
  //makes the treasure increase if diamond is touched
  else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection=treasureCollection + 100;
  }
  
  //makes the treasure increase if jewellery is touched
  else if(jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection= treasureCollection + 150;  
  }
    
  //makes the gamestate to end if sword is touched
  else{
    if(swordGroup.isTouching(boy)) {
      //changes the gamestate to end
      gameState=END;
      
      //display the gameOver image
      boy.addAnimation("SahilRunning",endImg);
      boy.x = width/2;
      boy.y = height/2;
      boy.scale=0.6;
      
      //makes the treasure destroy itself
      cashG.destroyEach();
      diamondsG.destroyEach();
      jwelleryG.destroyEach();
      swordGroup.destroyEach();
        
      //makes the treasure stop there
      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
    }
  }
  
  //makes the sprite visible
  drawSprites();
    
  //display the treasure
  textSize(20);
  fill(255);
  text("Treasure = "+ treasureCollection,width-150,30);
  }
}

//creates cash
function createCash() {
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 3;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

//creates diamonds
function createDiamonds() {
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 3;
  diamonds.lifetime = 180;
  diamondsG.add(diamonds);
  }
}

//creates jewellery
function createJwellery() {
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 3;
  jwellery.lifetime = 180;
  jwelleryG.add(jwellery);
  }
}

//creates sword
function createSword(){
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 3;
  sword.lifetime = 180;
  swordGroup.add(sword);
  }
}