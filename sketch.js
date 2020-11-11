
var HelicopterImg,PckgImg,HelicopterSprite,PckgSprite;
var PackageBody , GroundBody , Ground , invGround;
var rbox,rboxl,rboxr;

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;

function preload()
{
	HelicopterImg=loadImage("helicopter.png");
	PckgImg=loadImage("package.png");
}

function setup(){
	createCanvas(1350,650);

	rectMode(CENTER);

	engine=Engine.create();
	world=engine.world;		

	rbox=new Redbox(width/2,540,200,20);
	rboxl=new Redbox(565,500,20,100);
	rboxr=new Redbox(785,500,20,100);
	
	PckgSprite=createSprite(width/2,335,10,10);
	PckgSprite.addImage(PckgImg);
	PckgSprite.scale=0.2;
	PckgSprite.visible=false;

	HelicopterSprite=createSprite(0,200,10,10);
	HelicopterSprite.addImage(HelicopterImg);
	HelicopterSprite.scale=0.6;
	HelicopterSprite.velocityX=5;
	HelicopterSprite.velocityY=1;
	
	Ground=createSprite(width/2,600,width,100);
	Ground.shapeColor="Green";	

	PackageBody=Bodies.circle(width/2,335,5,{restitution:0.8,isStatic:true});
	World.add(world,PackageBody);

	GroundBody=Bodies.rectangle(width/2,550,width,10,{isStatic:true});
	World.add(world,GroundBody);

	Engine.run(engine);

}

function draw(){

	rectMode(CENTER);

	background("Lightblue");

	PckgSprite.x=PackageBody.position.x;
	PckgSprite.y=PackageBody.position.y;

	if(HelicopterSprite.x===width/2){
		HelicopterSprite.velocityX=0;
		HelicopterSprite.velocityY=0;
	}


	rbox.display();
	rboxl.display();
	rboxr.display();

	fill("White");
	stroke("White");
	textSize(20);
	text("Press 'Down Key' to Drop the Package after the Helicopter Stops",200,100);

	drawSprites();

}

function keyPressed() {
 if (keyCode === DOWN_ARROW && HelicopterSprite.x===width/2) {
	Matter.Body.setStatic(PackageBody, false);	
	PckgSprite.visible=true;
	HelicopterSprite.velocityX=5;   
	HelicopterSprite.velocityY=-1;
  }
}