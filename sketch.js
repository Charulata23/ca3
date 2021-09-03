var bg1,bg1Img;
var start,startImg,startMusic;
var path,pathImg;
var boy,boyImg;
var jump,jumpImg;
var playMusic;
var invisibleGround;
var ob1,ob2,ob3,ob4,ob5,obstacle,oGroup;
var jin,jinImg,jGroup;
var rndm;
var finalMusic;
var diamond,diamondImg,dGroup;
var gold,goldImg;
var bg2,bg2Img;
var diamonds = 0 ;
var score = 0 ;
var gameState = "STORY";

function preload(){
  bg1Img = loadImage("./assets/bg1.png");
  startImg = loadImage("./assets/start.png");
  startMusic = loadSound("./assets/StartM.mp3");
  pathImg = loadImage("./assets/path.jpg");
  boyImg = loadImage("./assets/boy.png");
  jumpImg = loadImage("./assets/jump.png");
  playMusic = loadSound("./assets/PlayM.mp3");
  ob1 = loadImage("./assets/egypt.png");
  ob2 = loadImage("./assets/jin.png");
  ob3 = loadImage("./assets/mummy.png");
  ob4 = loadImage("./assets/scorpion.png");
  ob5 - loadImage("./assets/snake.png");
  jinImg = loadImage("./assets/jin.png");
  finalMusic = loadSound("./assets/Final.mp3");
  diamondImg = loadImage("./assets/diamond.png");
  goldImg = loadImage("./assets/Gold.jpg");
  bg2Img = loadImage("./assets/bg2.png");
}

function setup(){
  createCanvas(windowWidth,windowHeight);
  startMusic.loop();
  bg1 = createSprite(windowWidth/2,windowHeight/2+50,1,1);
  bg1.scale = 1.2;
  start= createSprite(windowWidth/2,windowHeight-100,1,1);
  start.scale = 0.4;
  path = createSprite(windowWidth/2,windowHeight/2+50,1,1);
  path.scale = 2;
  boy = createSprite(windowWidth/2-700,windowHeight-150,1,1);
  boy.scale = 0.5;
  boy.setCollider("rectangle",0,0,150,450);
  boy.debug = false;
  jump = createSprite(windowWidth-70,windowHeight-70,1,1);
  jump.scale = 0.5;
  invisibleGround = createSprite(windowWidth/2,windowHeight-10,1600,5);
  invisibleGround.visible = false;
  diamond = createSprite(windowWidth/2,windowHeight/2,1,1);
  diamond.scale = 0.1;
  gold = createSprite(windowWidth/2-1,windowHeight/2-1,1,1);
  bg2 = createSprite(windowWidth/2+1,windowHeight/2-20,1,1);
  bg2.scale = 2;
  oGroup = new Group();
  jGroup = new Group();
  dGroup = new Group();

}

function draw(){
  background(0);
  if(gameState === "STORY"){
    bg1.addImage("Story",bg1Img);
    start.addImage("Start",startImg);
    drawSprites(); 
  } 
  if(mousePressedOver(start) || touches.length>0){
    gameState = "JOURNEY";
  }
  if(gameState === "JOURNEY"){
    score = score + 2*frameCount/1000;
    path.addImage("path",pathImg);
    path.visible = true;
    path.velocityX = -2;
    boy.addImage("Player",boyImg);
    boy.visible = true;

    jump.addImage("JumpButtton",jumpImg);
    jump.visible = true;
    if((keyDown("space") || 
        mousePressedOver(jump) || 
        touches.length > 0) &&
        boy.y >400){
      boy.velocityY = -12;
    }     
    boy.velocityY = boy.velocityY+0.8;
    if(frameCount%300 === 0){
      obstacle = createSprite(windowWidth,windowHeight-80,1,1);
      obstacle.scale = 0.2;
      obstacle.velocityX = -2;
      rndm = Math.round(random(1,4));
      switch(rndm){
        case 1 : obstacle.addImage("obs1",ob1);
        break;
        case 2 : obstacle.addImage("obs3",ob3);
        break;
        case 3 : obstacle.addImage("obs4",ob4);
        break;
        case 4 : obstacle.addImage("obs5",ob5);
        break;
        //case 5 : obstacle.addImage("obs5",ob5);
        //break;
        default : break;
      }
      oGroup.add(obstacle);
      obstacle.lifetime = 800;
      jump.depth = obstacle.depth;
      jump.depth+=1;
    }
    if(frameCount%450===0){
      jin = createSprite(windowWidth,200,1,1);
      jin.addImage("jin",jinImg);
      jin.velocityX = -2;
      jin.scale = 0.5;
      jGroup.add(jin);
      jin.lifetime = 800;
    }

    if(frameCount%300 === 0){
      diamond.addImage("diamonds",diamondImg);
      diamond.velocityX = -2;
      dGroup.add(diamond);
      diamond.lifetime = 800;
         
    }
    
    if(dGroup.isTouching(boy)){
      diamond.destroy();
      diamonds = diamonds+1;
    }

    if(frameCount%3000 === 0){
      gold.addImage("treasure",goldImg);
      gold.scale = 1.5;
      gold.velocityX = -2;
    }

    if(boy.isTouching(gold)){
      gameState = "WIN";
    }

    if(jGroup.isTouching(boy)|| oGroup.isTouching(boy)){
      gameState = "STORY";
      jGroup.setLifetimeEach(0);
      oGroup.setLifetimeEach(0);
      dGroup.setLifetimeEach(0);
      path.visible = false;
      boy.visible = false;
      jump.visible = false;
      console.log(gameState);
    }
    drawSprites();
    textStyle(BOLDITALIC)
    textSize(20);
    fill("red");
    text("Diamonds : " + diamonds,windowWidth-200,windowHeight/2);
    text("Score : " + Math.round(score),windowWidth-200,windowHeight/2-100);
  }
   
  if(gameState === "WIN"){
    jGroup.setLifetimeEach(0);
    oGroup.setLifetimeEach(0);
    dGroup.setLifetimeEach(0);
    path.visible = false;
    boy.visible = false;
    jump.visible = false;
    bg2.addImage("ending",bg2Img);
    finalMusic.play();
    startMusic.stop();
    drawSprites();
  } 

  boy.collide(invisibleGround);
  
  
}





