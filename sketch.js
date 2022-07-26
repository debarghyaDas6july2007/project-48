var score =0;
var sp_ship, en_ship, en_ship2, en_ship3, en_ship4, en_ship5, bg, bullet, bg2

var enemy;

var invisibleWall;

var sp_1, sp_2, meteor, enemy_img, crystal, bulletImg, bg2_img, en_img, en2_img, en3_img, en4_img, en5_img

var enemySpaceGroup, meteorGroup, bulletGroup
var enemy1,enemy2,enemy3,enemy4;

var life =3;

var gameState = 0;

var GameOver;
var Replay;
var Play;
var Title;
var Developer;
var blast;
var enemy1, enemy2, enemy3, enemy4, enemy5;
var bg_sound;
var backgroundMusic;

var GameOver_img;
var Replay_img;
var Play_img;
var Title_img;
var Developer_img;
var blast_img;


function preload(){

 en_img = loadImage("spaceShip1.png")
 en3_img = loadImage("spaceShip3.png")
 en4_img = loadImage("spaceShip4.png")
 bg2_img = loadImage("back2.jpg")
 sp_1 = loadImage("L6.png")
 sp_2 = loadImage("L7.png")
 meteor = loadImage("L4.png")
 enemy_img = loadImage("spaceShip2.png")
 crystal = loadImage("L1.png")
 bulletImg = loadImage("L2.png")

 GameOver_img = loadImage("gameOver.png")
 Replay_img = loadImage("Replay.png")
 Play_img = loadImage("Play.png")
 Title_img = loadImage("Space War.png")
 Developer_img = loadImage("kk.png")
 blast_img = loadImage("blast.png")

 bg_sound = loadSound("SB.mp3.mp3")

}
function setup() {
  createCanvas(800,700);

  
  sp_ship= createSprite(100, height/2, 50,50);
  sp_ship.addImage(sp_1)
  sp_ship.setCollider("circle",0,0,150)
  sp_ship.debug = true;
  sp_ship.scale=0.2

  GameOver = createSprite(400,300)
  GameOver.addImage(GameOver_img)

  Replay = createSprite(400,400)
  Replay.addImage(Replay_img)

  Play = createSprite(400,500,20,20)
  Play.addImage(Play_img)
  Play.scale = 0.7
   
  Title = createSprite(400,300)
  Title.addImage(Title_img)
  Title.scale = 1.1

  Developer = createSprite(400,400)
  Developer.addImage(Developer_img)
  Developer.scale = 0.6

  

  invisibleWall = createSprite(2,400,10,800)
  
  enemySpaceGroup1 = new Group();   
  enemySpaceGroup2 = new Group();   
  enemySpaceGroup3 = new Group();   
  enemySpaceGroup4 = new Group(); 
  enemySpaceGroup5 = new Group();

  meteorGroup = new Group();   
  bulletGroup = new Group();
  
  heading= createElement("h1");
  scoreboard= createElement("h1");
}

function draw() {
  background(bg2_img);
  
  heading.html("Life: "+life)
  heading.style('color:red'); 
  heading.position(150,20)

  scoreboard.html("Score: "+score)
  scoreboard.style('color:red'); 
  scoreboard.position(width-200,20)

  if(!bg_sound.isPlaying()){
    bg_sound.play()
    bg_sound.setVolume(0.8)
  }

  if(gameState === 0){

    Play.visible = true;
    Developer.visible = true;
    GameOver.visible = false;
    Replay.visible = false;
    Title.visible = true;

    if(mousePressedOver(Play)){
      gameState = 1
      score = 0;
      life = 3;
    }

  }

  if(gameState === 1){

   Play.visible = false;
   Developer.visible = false;
   GameOver.visible = false;
   Title.visible = false;

    sp_ship.y=mouseY  


    if(keyDown("space")){
      shootBullet();
    }

    spawnEnemyShips1();
    spawnEnemyShips2();
    spawnEnemyShips3();
    spawnEnemyShips4();
    spawnEnemyShips5();
    
    


    if (bulletGroup.collide( enemySpaceGroup1)){
     handleCollision(enemySpaceGroup1);
   
    }

    if (bulletGroup.collide( enemySpaceGroup2)){
      handleCollision(enemySpaceGroup2);
     
     }
    
     if (bulletGroup.collide( enemySpaceGroup3)){
      handleCollision(enemySpaceGroup3);
      
     }

     if (bulletGroup.collide( enemySpaceGroup4)){
      handleCollision(enemySpaceGroup4);
      
     }

     if (bulletGroup.collide( enemySpaceGroup5)){
      handleCollision(enemySpaceGroup5);
      
     }

     


     if(enemySpaceGroup1.collide(invisibleWall) || enemySpaceGroup1.collide(sp_ship)){
       life = life-1;
       enemySpaceGroup1.destroyEach();
     }

     if(enemySpaceGroup2.collide(invisibleWall) || enemySpaceGroup2.collide(sp_ship)){
      life = life-1;
      enemySpaceGroup2.destroyEach();
    }

    if(enemySpaceGroup3.collide(invisibleWall) || enemySpaceGroup3.collide(sp_ship)){
      life = life-1;
      enemySpaceGroup3.destroyEach();
    }

    if(enemySpaceGroup4.collide(invisibleWall) || enemySpaceGroup4.collide(sp_ship)){
      life = life-1;
      enemySpaceGroup4.destroyEach();
    }

    if(enemySpaceGroup5.collide(invisibleWall) || enemySpaceGroup5.collide(sp_ship)){
      life = life-1;
      enemySpaceGroup5.destroyEach();
    }
  
    
    
     
     GameOver.visible = false;
     Replay.visible = false;
    
     if(life === 0){
      gameState = 2

    }
  }

   if(gameState ===2){
    enemySpaceGroup1.destroyEach()
    enemySpaceGroup2.destroyEach()
    enemySpaceGroup3.destroyEach()
    enemySpaceGroup4.destroyEach()
    enemySpaceGroup5.destroyEach()

    bulletGroup.destroyEach()

    GameOver.visible = true;
    Replay.visible = true;
    

    if(mousePressedOver(Replay)){
      gameState = 1;
      score = 0;
      life = 3;
    }

   }
    drawSprites();
 }
    
  


function shootBullet(){
  bullet= createSprite(150, width/2, 50,20)
  bullet.y= sp_ship.y-20
  bullet.addImage(bulletImg)
  bullet.scale=0.12
  bullet.velocityX= 7
  bulletGroup.add(bullet)
}

function handleCollision(enemyGroup){
  console.log(life)
    if (life > 0) {
       score=score+10;
    }
    blast = createSprite(bullet.x,bullet.y)
    blast.addImage(blast_img)
    blast.scale = 0.2
    blast.life = 20
  
    enemyGroup.destroyEach()
    bulletGroup.destroyEach()
   
  }
  
 function spawnEnemyShips1(){
   if(frameCount % 80 === 0){
     var y= Math.round(random(100,700))
      enemy1 = createSprite(800,y,10,40)
     enemy1.addImage(en3_img)
     
     enemy1.velocity.x = -10;

     enemy1.velocityX = -(6 + 6*score/100);
    
     enemy1.scale = 0.2;
     enemy1.lifetime = 800;
     enemySpaceGroup1.add(enemy1);

   }
 }

 function spawnEnemyShips2(){
  if(frameCount % 90 === 0){
    var y= Math.round(random(100,700))
     enemy2 = createSprite(800,y,10,40)
    enemy2.addImage(en_img)
    
    enemy2.velocity.x = -10;

    enemy2.velocityX = -(6 + 6*score/100);
   
    enemy2.scale = 0.2;
    enemy2.lifetime = 800;
    enemySpaceGroup2.add(enemy2);

  }
}

function spawnEnemyShips3(){
  if(frameCount % 110 === 0){
    var y= Math.round(random(100,700))
     enemy3 = createSprite(800,y,10,40)
    enemy3.addImage(enemy_img)
    
    enemy3.velocity.x = -10;

    enemy3.velocityX = -(6 + 6*score/100);
   
    enemy3.scale = 0.2;
    enemy3.lifetime = 800;
    enemySpaceGroup3.add(enemy3);

  }
}

function spawnEnemyShips4(){
  if(frameCount % 85 === 0){
    var y= Math.round(random(100,700))
     enemy4 = createSprite(800,y,10,40)
    enemy4.addImage(en4_img)
    
    enemy4.velocity.x = -10;

    enemy4.velocityX = -(6 + 6*score/100);
   
    enemy4.scale = 0.2;
    enemy4.lifetime = 800;
    enemySpaceGroup2.add(enemy4);

  }
}

function spawnEnemyShips5(){
  if(frameCount % 95 === 0){
    var y= Math.round(random(100,700))
     enemy5 = createSprite(800,y,10,40)
    enemy5.addImage(sp_2)
    
    enemy5.velocity.x = -10;

    enemy5.velocityX = -(6 + 6*score/100);
   
    enemy5.scale = 0.2;
    enemy5.lifetime = 800;
    enemySpaceGroup2.add(enemy5);

  }
}



 //(function handleGameover(bubbleGroup){
  
  //  life=life-1;
  //  bubbleGroup.destroyEach();
    

 //   if (life === 0) {
  //    gameState=2
      
  //    swal({
  //      title: `Game Over`,
  //      text: "Oops you lost the game....!!!",
   //     text: "Your Score is " + score,
    //    imageUrl:
    //      "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
   //     imageSize: "100x100",
   //     confirmButtonText: "Thanks For Playing"
  //    });
  //  }
//}