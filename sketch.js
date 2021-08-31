var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup;
var ghost, ghostImg;
var invisibleBlockGroup, invisibleBlock;
var gameState = "play"

function preload(){
  towerImg = loadImage("tower.png");
  doorImg = loadImage("door.png");
  climberImg = loadImage("climber.png");
  ghostImg = loadImage("ghost-standing.png");
  spookySound = loadSound("spooky.wav");
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300,300,100,100);
  tower.addImage("tower",towerImg);
  tower.velocityY = 4;
  ghost = createSprite(300,500,20,20)
  ghost.addImage("ghost",ghostImg)
  ghost.scale = 0.4
  doorsGroup = new Group();
  climbersGroup = new Group();
  invisibleBlockGroup = new Group()
  spookySound.loop() 
}

function draw() {
  background(200);
  if (gameState === "play"){
    if(tower.y > 500){
        tower.y = 200
      }
    if (frameCount%60 === 0) {
      doors()
    }
    drawSprites()
    if (keyDown("left")) {
      ghost.x = ghost.x - 5
    }
    if (keyDown("right")) {
      ghost.x = ghost.x + 5
    }
    if (keyDown("space")) {
      ghost.velocityY = -12
    }
    ghost.velocityY = ghost.velocityY + 0.5
    if (climbersGroup.isTouching(ghost)) {
      ghost.velocityY = 0

    }
    if (climbersGroup.isTouching(ghost)|| ghost.y>600) {
      ghost.destroy()
      gameState = "end"

    }
  }
  else if (gameState === "end"){
    textSize(30)
    text("Game Over", 200, 300)

  }
  
}


function doors(){
  door = createSprite(Math.round(random(100,500)),-75,50,10)
  door.velocityY = 4
  door.lifetime = 250
  door.addImage("door",doorImg)
  climber = createSprite(door.x,0,20,10)
  climber.addImage("climber",climberImg)
  climber.velocityY = 4
  climber.lifetime = 250
  door.depth = climber.depth + 1
  ghost.depth = door.depth + 1
  invisibleBlock = createSprite(climber.x,climber.y-10,100,10)
  invisibleBlock.velocityY = 4
  invisibleBlock.visible = false 
  invisibleBlockGroup.add(invisibleBlock)
  climbersGroup.add(climber)
  doorsGroup.add(door)
}
