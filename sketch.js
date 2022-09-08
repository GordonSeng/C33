const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

let engine;
let world;
var ground;
var fruit,rope, rope2, rope3
var fruit_con, fruit_con2, fruit_con3
var bgImage, fruitImage, bunnyImage
var bunny
var button, button2, button3
var blink, eat, sad
var bgSound, sadSound, cutSound, eatSound, airSound
var muteButton
var canvasW, canvasH

function preload(){
  bgImage = loadImage("background.png")
  fruitImage = loadImage("melon.png")
  bunnyImage = loadImage("Rabbit-01.png")
  blink = loadAnimation("blink_1.png","blink_2.png","blink_3.png")
  eat = loadAnimation("eat_0.png","eat_1.png","eat_2.png","eat_3.png","eat_4.png")
  sad = loadAnimation("sad_1.png","sad_2.png","sad_3.png")

  bgSound = loadSound("sound1.mp3")
  sadSound = loadSound("sad.wav")
  cutSound = loadSound("rope_cut.mp3")
  eatSound = loadSound("eating_sound.mp3")
  airSound = loadSound("air.wav")

  eat.playing = true
  blink.playing = true
  sad.playing = true

  sad.looping = false
  eat.looping = false

}

function setup() 
{ 
  var isMobile = /iPhone|iPad|iPod|Andriod/i.test(navigator.userAgent)
  if(isMobile){
    canvasW = displayWidth
    canvasH = displayHeight
    createCanvas(canvasW,canvasH)
  }
  else{
    canvasW = windowWidth
    canvasH = windowHeight
    createCanvas(canvasW,canvasH)
  }

  frameRate(80);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(200,canvasH,600,20);

  rope = new Rope(8,{x:40,y:30});
  rope2 = new Rope(7,{x:370,y:40})
  rope3 = new Rope(4,{x:400,y:225})


  fruit = Bodies.circle(300,300,20);
  Matter.Composite.add(rope.body,fruit);

  fruit_con = new Link(rope,fruit);
  fruit_con2 = new Link(rope2,fruit)
  fruit_con3 = new Link(rope3,fruit)

  blink.frameDelay = 15
  eat.frameDelay = 15
  sad.frameDelay = 15

  bunny = createSprite(170,canvasH- 80,100,100)
  bunny.addAnimation("blinking",blink)
  bunny.addAnimation("crying",sad)
  bunny.addAnimation("eating",eat)
  bunny.addAnimation("blinking",blink)
  bunny.scale = 0.2

  button = createImg("cut_btn.png")
  button.position(20,30)
  button.size(50,50)
  button.mouseClicked(drop)

  button2 = createImg("cut_btn.png")
  button2.position(330,35)
  button2.size(50,50)
  button2.mouseClicked(drop2)

  button3 = createImg("cut_btn.png")
  button3.position(360,200)
  button3.size(60,60)
  button3.mouseClicked(drop3)

  muteButton = createImg("mute.png")
  muteButton.position(450,20)
  muteButton.size(50,50)
  muteButton.mouseClicked(mute)

  bgSound.play()
  bgSound.setVolume(0.5)

  rectMode(CENTER);
  ellipseMode(RADIUS);
  textSize(50)
  
}

function draw() 
{
  background(51);
  image(bgImage,0,0,width,height)
  rope.show();
  rope2.show()
  rope3.show()

  push()
  imageMode(CENTER)
  if(fruit != null){
    image(fruitImage,fruit.position.x,fruit.position.y,70,70)
  }
  
  pop()
  
  Engine.update(engine);
  ground.show();

  if(collide(fruit,bunny)=== true){
    bunny.changeAnimation("eating")
    eatSound.play()
  }

  if(collide(fruit,ground.body)=== true){
    bunny.changeAnimation("crying")
    bgSound.stop()
    sadSound.play()
  }

  drawSprites()
}

function drop(){
  rope.break()
  fruit_con.detach()
  fruit_con = null
  cutSound.play()
}

function drop2(){
  rope2.break()
  fruit_con2.detach()
  fruit_con2 = null
  cutSound.play()
}

function drop3(){
  rope3.break()
  fruit_con3.detach()
  fruit_con3 = null
  cutSound.play()
}

function collide(body,sprite){
  if(body != null){
    var d = dist(body.position.x,body.position.y,sprite.position.x,sprite.position.y)
    if(d <= 80){
      World.remove(world,fruit)
      fruit = null
      return(true)
    }
    else{
      return(false)
    }
  }
}

function mute(){
  if(bgSound.isPlaying()){
    bgSound.stop()
  }
  else{
    bgSound.play()
  }
}


