var gamestate="PLAY";

var ghost,ghostImage,tower,towerImage;

var doors,doorImage,doorsGroup;
var climber,climberImage,climbersGroup;

var invisibleBlock,invisibleBlockGroup;

function preload(){
  ghostImage = loadImage("ghost-standing.png")
  towerImage = loadImage("tower.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
}

function setup(){
  createCanvas(600,600)
  
  tower=createSprite(200,200)
  tower.addImage(towerImage)
  tower.velocityY=1;
  
  ghost=createSprite(200,200,40,40)
  ghost.addImage("ghost",ghostImage)
  ghost.scale=0.4;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group();
}

function draw(){
  background("black")
  if(gamestate === "PLAY"){
    
  
  if(tower.y>400){
    tower.y=300;
  }
  if(keyDown("LEFT_ARROW")){
    ghost.x=ghost.x-3;
  }
 if(keyDown("RIGHT_ARROW")){
  ghost.x=ghost.x+3;
 }
  if(keyDown("space")){
    ghost.velocityY=-2;
  }
  ghost.velocityY+=0.4;
  if(climbersGroup.isTouching(ghost)){
    ghost.velocityY=0;
  }
  if(invisibleBlockGroup.isTouching(ghost)||ghost.y>600){
    ghost.destroy();
    gamestate = "END"
  }
  
  
  spawnDoors();
  
  drawSprites();
}
  if(gamestate === "END"){
    stroke("yellow")
    fill("yellow")
    textSize(30)
    text("GAME OVER",230,250)
  }
}
function spawnDoors(){
  if(frameCount%200 === 0){
    var door =createSprite(200,-50)
    door.addImage(doorImage)
    var climber=createSprite(200,10)
    climber.addImage(climberImage)
    invisibleBlock=createSprite(200,15)
    invisibleBlock.width=climber.width;
    door.x=Math.round(random(120,400))
    door.velocityY=1;
    invisibleBlock.x=door.x;
    invisibleBlock.velocityY=1;
    door.lifetime=700;
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=700;
    invisibleBlock.lifetime=700;
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    doorsGroup.add(door)
    climbersGroup.add(climber)
    invisibleBlock.debug=false;
    invisibleBlockGroup.add(invisibleBlock)
    invisibleBlock.visible=false;
  }
}