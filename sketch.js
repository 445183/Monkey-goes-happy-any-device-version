var monkey , monkey_running,backgroundImage,monkeyImage;
var banana ,bananaImage, obstacle, obstacleImage
var foodGroup, obstacleGroup,invisibleGround;
var score,highscore,gameOverImage;
var gameState=PLAY;
var PLAY=1;
var END=0;

function preload(){
  monkey_running =                  loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  monkeyImage=loadAnimation("sprite_4.png")
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
  backgroundImage = loadImage("e32357043fb801a3dd875a1a1bc632d5.jpg")
  gameOverImage=loadImage("download.png")
}

function setup() {
  createCanvas(windowWidth,windowHeight);
  ground = createSprite(width/8,height/150,1,1);
  ground.addImage("ground",backgroundImage);
  ground.scale=2.5;
  ground1 = createSprite(width/2,height/2,width,height);
  ground1.addImage("gameOver",gameOverImage);
  ground1.visible=false;
  ground1.scale=3;
  
  monkey = createSprite(width/6,height/3,1,1);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.145;
  
  invisibleGround = createSprite(width/2,height*1.49,width,height);
  invisibleGround.visible=false;
  
  obstacleGroup=new Group();
  foodGroup=new Group();
  //monkey.debug=true;
  score=0;  
  gameState=PLAY;
  
  highscore=0;
}


function draw() {
  drawSprites();
    
  if(gameState===PLAY){
    stroke("white")
    fill("red")
    textSize(20)
    text("Score: "+ score,width/1.25,height/10)
    text("High score: "+ highscore,width/10,height/10);    
    ground.velocityX=-2.5;
    if(ground.x<150){
      ground.x=ground.width/2;
    }
        banana();
        obstacles();
    
        score=Math.round(frameCount/10);
           
        monkey.collide(invisibleGround);
        monkey.velocityY=monkey.velocityY+0.8;

        if(touches.length>0 || keyDown("space")&& monkey.y>330){
          monkey.velocityY=-20;
          touches=[];
        }
        if(obstacleGroup.isTouching(monkey)){
          gameState=END
          ground.visible=false;
        }
        if(foodGroup.isTouching(monkey)){
          foodGroup.destroyEach();
        }
        
  }
  
  if(gameState===END){
    monkey.changeAnimation("monkey",monkeyImage)
    ground.depth=0;
    ground.velocityX=0;
    obstacleGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    foodGroup.setVelocityXEach(0);
    foodGroup.setLifetimeEach(-1);
    ground1.depth=ground.depth+50;
    obstacleGroup.visible=false;
    foodGroup.visible=false;
    ground1.visible=true;
    monkey.velocityY=0;
    if(keyDown("r")||touches.length>0){
      frameCount=0;
      gameState=PLAY;
      obstacleGroup.destroyEach();
      foodGroup.destroyEach();
      ground1.visible=false;
      foodGroup.visible=true;
      ground.visible=true;
      if(score>highscore){
        highscore=score;
      }
      obstacleGroup.visible=true;
      touches=[];
    }    
    fill("red");
    textSize(25);
    text("Press R to Restart",width/2-100,height/1.25);
    
    
  }
   
  
}
function obstacles(){
  if(frameCount%75===0 && frameCount>0){
    obstacle = createSprite(width/1.25,height/1.125,1,1)
    obstacle.addImage("obstacle",obstacleImage)
    obstacle.scale=0.25;
    obstacle.velocityX=-5;
    obstacle.lifetime=150;
    //obstacle.debug=true;
    obstacle.setCollider("circle",0,0,150)
    obstacleGroup.add(obstacle);
  }
  
}
function banana(){
  if(frameCount%100===0 && frameCount>0){
   var banana = createSprite(450,350,1,1);
   banana.addImage("banana",bananaImage)
   banana.scale=0.075;
   banana.velocityX=-3;
   var selectPos=Math.round(random(1,5)) 
   switch(selectPos){
     case 1:banana.y=height/1.15;
       break;
     case 2:banana.y=height/1.5;
       break;
     case 3:banana.y=height/1.75;
       break;
     case 4:banana.y=height/2;
       break;
     case 5:banana.y=height/2.1;
   }
   new Group(foodGroup); 
   foodGroup.add(banana); 
  }
}