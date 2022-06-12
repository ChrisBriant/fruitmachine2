
import Phaser from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";

const WIDTH = 800;
const HEIGHT = 600;
const BIRD_POSITION = {x: WIDTH * 0.1, y: HEIGHT / 2 };

const SHARED_CONFIG = {
  width: WIDTH,
  height: HEIGHT,
  startPosition: BIRD_POSITION
}

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  physics: {
    default: 'arcade',
    arcade: {
      debug: true,
      //gravity: { y: 200 }
    }
  },
  scene: [new MenuScene(SHARED_CONFIG), PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);

const VELOCITY = 200;
const FLAP_VELOCITY = 250;
const PIPES_TO_RENDER = 4;
const initialPosition = { x: config.width / 10, y: config.height /2}
let bird = null;
let pipes;
let topPipe = null;
let bottomPipe = null;
let pipeHorizontalDistance = 0;
const pipeVerticalDistanceRange = [150, 250];
const pipeHorizontalDistanceRange = [450, 550];

function preload () {
  this.load.image('sky', 'assets/sky.png');
  this.load.image('bird', 'assets/bird.png');
  this.load.image('pipe', 'assets/pipe.png');
}


function create () {
  this.add.image(0, 0, 'sky').setOrigin(0,0);
  bird = this.physics.add.sprite(initialPosition.x, initialPosition.y, 'bird').setOrigin(0);
  bird.body.gravity.y = 300;
  pipes = this.physics.add.group();


  for(let i=0;i< PIPES_TO_RENDER; i++) {
    const topPipe = pipes.create(0,0, 'pipe').setOrigin(0,1);
    const bottomPipe = pipes.create(0,0, 'pipe').setOrigin(0,0);
    placePipe(topPipe,bottomPipe);
  }
  
  pipes.setVelocityX(-200);

  //Input actions
  this.input.on('pointerdown',flap);
  this.input.keyboard.on('keydown_SPACE',flap);
  //bird.body.velocity.y = 1;
  //bird.body.velocity.x = VELOCITY;
}


function update(time, delta) {
  if(bird.y > config.height|| bird.y < -bird.height ) {
    console.log('Game Over')
    restartPlayerPosition();
  }

  recyclePipes();
}

function flap() {
  bird.body.velocity.y = -FLAP_VELOCITY;
}

function restartPlayerPosition() {
  bird.body.x = initialPosition.x;
  bird.body.y = initialPosition.y;
  bird.body.velocity.y = 0;
}

function placePipe(tPipe,bPipe) {
  // pipeHorizontalDistance += 400;
  const rightMostX = getRightMostPipe();
  const pipeVerticalDistance = Phaser.Math.Between(...pipeVerticalDistanceRange);
  const pipeVerticalPosition = Phaser.Math.Between(0 + 20,config.height - 20 - pipeVerticalDistance);
  const pipeHorizontalDistance = Phaser.Math.Between(...pipeHorizontalDistanceRange);

  // topPipe = this.physics.add.sprite(pipeHorizontalDistance,pipeVerticalPosition, 'pipe').setOrigin(0,1);
  // bottomPipe = this.physics.add.sprite(topPipe.x, topPipe.y + pipeVerticalDistance, 'pipe').setOrigin(0,0);

  tPipe.x = rightMostX + pipeHorizontalDistance;
  tPipe.y = pipeVerticalPosition;

  bPipe.x =  tPipe.x;
  bPipe.y = tPipe.y + pipeVerticalDistance;


  // tPipe.body.velocity.x = -200;
  // bPipe.body.velocity.x = -200;
}

function getRightMostPipe() {
  let rightMostX = 0;

  pipes.getChildren().forEach(function(pipe) {
    rightMostX = Math.max(pipe.x, rightMostX);
  });

  return rightMostX;
}

function recyclePipes() {
  // pipes.getChildren().forEach(pipe => {
  //   if(pipe.getBounds().right <= 0) {
  //     //recycle pipe
  //     //let outOfBoundsPips = 
  //   }
  // });
  let outOfBoundsPipes = pipes.getChildren().filter(pipe => pipe.getBounds().right <=0);
  if(outOfBoundsPipes.length === 2) {
    placePipe(outOfBoundsPipes[0], outOfBoundsPipes[1]);
  }
}