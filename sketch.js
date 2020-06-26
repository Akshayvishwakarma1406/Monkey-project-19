var monkey, monkeyImage;
var ground, groundImage, invisibleGround;
var gameState, play, end, gameOver;
var banana, bananaImage;
var Stone, stoneImage;
var survivalTime;
var bananaG, rocksG;

function preload() {
  groundImage = loadImage("Mango.png");
  monkeyImage = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  bananaImage = loadImage("Banana.png");
  StoneImage = loadImage("stone.png");
  gameOver = loadImage("white.png");

}

function setup() {
  createCanvas(500, 380);

  //ground commands
  ground = createSprite(160, 190, 50, 20);
  ground.addImage(groundImage);
  ground.x = ground.width / 3;
  ground.velocityX = -5;
  ground.scale = 0.65;

  //survival time
  survivalTime = 0;

  //invisibleGround commands
  invisibleGround = createSprite(250, 340, 500, 10);
  invisibleGround.visible = false;

  //monkey commands
  monkey = createSprite(100, 335, 10, 10);
  monkey.addAnimation("running", monkeyImage);
  monkey.scale = 0.2;

  //GameOver commands
  GameOver = createSprite(250, 190, 10, 10);
  GameOver.addImage(gameOver);
  GameOver.visible = false;
  GameOver.scale = 0.9;

  //variables
  var banana;
  var stone;

  //new groups
  bananaG = new Group();
  rocksG = new Group();

  //GameStates
  play = 1;
  end = 2;
  gameState = play;
}

function draw() {
  background(2);

  //resettingthe background 
  if (ground.x < 0) {
    ground.x = ground.width / 3;
    ground.velocityX = -5;
    ground.scale = 0.65;
  }

  //jumping
  if (keyDown("space") && monkey.y > 270) {
    monkey.velocityY = -12.5;
    // monkey.debug = true;
  }
  //Adding Gravity
  monkey.velocityY = monkey.velocityY + 0.5;

  //functions
  Bananas();
  Rocks();

  //monkey's collider
  monkey.collide(invisibleGround);
  monkey.setCollider("circle", 0, 0, 250);

  //eating
  if (bananaG.isTouching(monkey)) {
    bananaG.destroyEach();
    survivalTime = survivalTime + 1;
  }

  //colliding
  if (rocksG.isTouching(monkey)) {
    gameState = end;
  }

  //GameState is end
  if (gameState === end) {
    ground.destroy();
    monkey.x = 200;
    monkey.y = 200;
    rocksG.destroyEach();
    bananaG.destroyEach();
    monkey.destroy();
    GameOver.visible = true;
  }

  drawSprites();

  stroke("black");
  fill("black");
  textSize(30);
  text("SurvivalTime:-" + survivalTime, 200, 70);

}

function Bananas() {
  if (frameCount % 130 === 0) {
    banana = createSprite(600, 120, 40, 10);
    banana.addImage(bananaImage);
    banana.scale = 0.05;
    banana.velocityX = -5;
    banana.lifetime = 210;
    banana.setCollider("circle", 0, 0, 300);

    bananaG.add(banana);
  }
}


function Rocks() {
  if (frameCount % 200 === 0) {
    stone = createSprite(600, 290, 10, 10);
    stone.addImage(StoneImage);
    stone.scale = 0.25;
    stone.velocityX = -5;
    stone.lifetime = 210;
    stone.setCollider("circle", 10, 20, 150);
    rocksG.add(stone);

  }
}