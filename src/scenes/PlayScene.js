import BaseScene from "./BaseScene";

const PIPES_TO_RENDER = 4;

class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config);
        this.stopAtFruit = '';
        // this.bird = null;
        // this.pipes = null;
        // this.isPaused = false;

        // this.pauseButton = null;
        // this.pipeHorizontalDistance = 0;
        // this.pipeVerticalDistanceRange = [150, 250];
        // this.pipeHorizontalDistanceRange = [450, 550];
        // this.flapVelocity = 300;

        // this.score = 0;
        // this.scoreText = '';
        // //this.bestScore = 0;
        // //this.bestScoreText = '';
        // this.currentDifficulty = 'easy';
        // this.difficulties = {
        //     'easy' : { 
        //         pipeHorizontalDistanceRange : [300, 350],
        //         pipeVerticalDistanceRange : [150, 250],
        //     },
        //     'normal' : { 
        //         pipeHorizontalDistanceRange : [280, 330],
        //         pipeVerticalDistanceRange : [140, 190],
        //     },
        //     'hard' : { 
        //         pipeHorizontalDistanceRange : [250, 310],
        //         pipeVerticalDistanceRange : [120, 170],
        //     },

        // }
    }

    preload() {

        // this.load.image('sky', '../assets/sky.png');
        // this.load.image('bird', '../assets/bird.png');
        // this.load.image('pipe', '../assets/pipe.png');
        // this.load.image('pause', '../assets/pause.png');
    }

    create() {  
        // this.currentDifficulty = 'easy';
        // this.createBG();
        // this.createBird();
        // this.createPipes();
        // this.createColliders();
        // this.createPauseButton();
        // this.createScore();
        this.handleInputs();
        // this.listenToEvents();

        // this.anims.create({
        //     key: 'fly',
        //     frames: this.anims.generateFrameNumbers('bird',{start:9, end: 15}),
        //     frameRate: 8, // 24fps default
        //     repeat: -1, //Repeat infinately
        // });

        //this.bird.play('fly');
        this.createReel();
        this.createPointer();
    }

    createReels() {
        //Create three reels
        this.reel = this.physics.add.group();
        this.reel.create(105, -1120, 'reel').setOrigin(0,0);
        this.reel.create(105, 0, 'reel').setOrigin(0,0);
        this.reel.setVelocityY(200);

    }

    createPointer() {
        this.add.image(75,325,'pointer');
    }


    // createBG() {
    //     this.add.image(0, 0, 'sky').setOrigin(0,0);
    // }

    // createBird() {
    //     this.bird = this.physics.add.sprite(this.config.startPosition.x, this.config.startPosition.y, 'bird')
    //     .setFlipX(true)
    //     .setScale(3)
    //     .setOrigin(0);
    //     this.bird.setBodySize(this.bird.width, this.bird.height - 8)
    //     this.bird.body.gravity.y = 600;
    //     this.bird.setCollideWorldBounds(true);
    // }

    // createColliders() {
    //     this.physics.add.collider(this.bird, this.pipes, this.gameOver, null, this);
    // }

    // createPauseButton() {
    //     this.isPaused = false;
    //     const pauseButton = this.add.image(this.config.width - 10, this.config.height - 10, 'pause')
    //     .setScale(3)
    //     .setOrigin(1);

    //     pauseButton.setInteractive();

    //     pauseButton.on('pointerdown', () => {
    //         this.isPaused = true;
    //         this.physics.pause();
    //         this.scene.pause();
    //         this.scene.launch('PauseScene');
    //     });
    // }

    // createScore() {
    //     this.score = 0;
    //     this.scoreText = this.add.text(16,16, `Score: ${this.score}`, { 
    //         fontsize: '32px',
    //         color : '#000',
    //     });
    //     console.log('SHOULD HAVE CREATED SCORE');
    //     const bestScore = localStorage.getItem('bestScore');
    //     this.bestScoreText = this.add.text(16,34, `Best Score: ${bestScore || 0}`, { 
    //         fontsize: '32px',
    //         color : '#000',
    //     });
    // }

    // createPipes() {
    //     this.pipes = this.physics.add.group();


    //     for(let i=0;i< PIPES_TO_RENDER; i++) {
    //       const topPipe = this.pipes.create(0,0, 'pipe').setImmovable(true).setOrigin(0,1);
    //       const bottomPipe = this.pipes.create(0,0, 'pipe').setImmovable(true).setOrigin(0,0);
    //       this.placePipe(topPipe,bottomPipe);
    //     }
        
    //     this.pipes.setVelocityX(-200);
    // }

    handleInputs() {
        //Input actions
        // this.input.on('pointerdown',this.flap, this);
        this.input.keyboard.on('keydown_SPACE',() => {
            let stopAt = this.getRandomFruit();
            console.log('Stopping at ',stopAt);
            this.stopAtFruit = stopAt;
        });
    }

    update() {
        // this.checkGameStatus();
        // this.recyclePipes();
        this.recycleReel();
        //this.getFruitPos();
        this.stopAt();
    }

    recycleReels() {

    }

    recycleReel() {
        //console.log(this.reel.children.entries[0]);
        let reelA = this.reel.children.entries[0];
        let reelB = this.reel.children.entries[1];
        if(reelA.getBounds().y > this.config.height) {
            reelA.y = reelB.getBounds().y - 1120;
        }
        if(reelB.getBounds().y > this.config.height) {
            reelB.y = reelA.getBounds().y -1120;
        }
        // this.reel.children.entries.forEach((reel) => {
        //     console.log(reel.getBounds());
        // });
        //console.log(this.reel.getBounds().top > this.config.height);
    }

    getCurrentFruit() {
        // this.reel.children.entries.forEach(reel => {
        //     let fruitPos = Math.floor((this.screenCenter[0] - reelA.y + 70) / 140);
        //     this.getFruit(fruitPos)
        // });
    }

    stopAt() {
        //let reelA = this.reel.children.entries[0];
        //console.log(Math.floor(this.screenCenter[0] - reelA.y + 70) > 0 && (Math.floor(this.screenCenter[0] - reelA.y - 70)) < 140);
        //console.log(Math.floor((this.screenCenter[0] - reelA.y + 70) / 140));
        this.reel.children.entries.forEach(reel => {
            let fruitPos = this.screenCenter[0] - reel.y + 35
            let fruitIndex = Math.floor((fruitPos) / 140);
            //If it is on the named fruit already then it needs to cycle once again before stopping.
            let onNamedFruit = ((fruitIndex * 140) + 120) > fruitPos;
            //console.log('lemon', this.screenCenter[0] - reel.y + 35, ((fruitIndex * 140) + 120) > fruitPos);
            if(this.getFruit(fruitIndex) === this.stopAtFruit && !onNamedFruit) {
                this.reel.setVelocityY(0);
            }
        });

    }

    // listenToEvents() {
    //     if(this.pauseEvent) { return;}

    //     this.pauseEvent = this.events.on('resume',() => {
    //         this.initialTime = 3;
    //         this.countDownText = this.add.text(...this.screenCenter,'Fly in ' + this.initialTime, this.fontOptions).setOrigin(0.5);
    //         this.timedEvent = this.time.addEvent({
    //             delay: 1000,
    //             callback: this.countDown,
    //             callbackScope: this,
    //             loop: true
    //         });
    //     });
    // }

    // countDown() {
    //     this.initialTime--;
    //     this.countDownText.setText('Fly in ' + this.initialTime);
    //     if(this.initialTime <= 0) {
    //         this.isPaused = false;
    //         this.countDownText.setText('');
    //         this.physics.resume();
    //         this.timedEvent.remove();
    //     }
    // }

    // checkGameStatus() {
    //     if(this.bird.getBounds().bottom >= this.config.height || this.bird.y <= 0 ) {
    //         console.log('Game Over')
    //         this.gameOver();
    //     }
    // }


    // flap() {
    //     if(this.isPaused) { return; }
    //     this.bird.body.velocity.y = -this.flapVelocity;
    // }

    // saveBestScore() {
    //     const bestScoreText = localStorage.getItem('bestScore');
    //     const bestScore = this.bestScoreText && parseInt(bestScoreText,10);
        
    //     if(!bestScore || this.score > bestScore) {
    //         localStorage.setItem('bestScore', this.score);
    //     }
    // }
      
    // gameOver() {
    //     this.bird.body.x = this.config.startPosition.x;
    //     this.bird.body.y = this.config.startPosition.y;
    //     this.bird.body.velocity.y = 0;
    //     this.physics.pause();
    //     this.bird.setTint(0x00ffff);

    //     this.saveBestScore();

    //     this.time.addEvent({
    //         delay : 1000,
    //         callback : () => {
    //             this.scene.restart();
    //         },
    //         loop : false,

    //     });
    // }
      
    // placePipe(tPipe,bPipe) {
    //     const difficulty = this.difficulties[this.currentDifficulty];
    //     const rightMostX = this.getRightMostPipe();
    //     const pipeVerticalDistance = Phaser.Math.Between(...difficulty.pipeVerticalDistanceRange);
    //     const pipeVerticalPosition = Phaser.Math.Between(0 + 20,this.config.height - 20 -pipeVerticalDistance);
    //     const pipeHorizontalDistance = Phaser.Math.Between(...difficulty.pipeHorizontalDistanceRange);
      
    //     tPipe.x = rightMostX + pipeHorizontalDistance;
    //     tPipe.y = pipeVerticalPosition;
      
    //     bPipe.x =  tPipe.x;
    //     bPipe.y = tPipe.y + pipeVerticalDistance;
    // }
      
    // getRightMostPipe() {
    //     let rightMostX = 0;
      
    //     this.pipes.getChildren().forEach(function(pipe) {
    //       rightMostX = Math.max(pipe.x, rightMostX);
    //     });
      
    //     return rightMostX;
    // }
      
    // recyclePipes() {
    //     let outOfBoundsPipes = this.pipes.getChildren().filter(pipe => pipe.getBounds().right <=0);
    //     if(outOfBoundsPipes.length === 2) {
    //       this.placePipe(outOfBoundsPipes[0], outOfBoundsPipes[1]);
    //       this.increaseScore();
    //       this.saveBestScore();
    //       this.increaseDifficulty();
    //     }
    // }

    // increaseDifficulty() {
    //     if (this.score === 1) {
    //         this.currentDifficulty = 'normal';
    //     }

    //     if (this.score === 1) {
    //         this.currentDifficulty = 'hard';
    //     }
    // }

    // increaseScore() {
    //     this.score++;
    //     // if(this.score > this.bestScore) {
    //     //     this.bestScore++;
    //     // }
    //     this.scoreText.setText(`Score: ${this.score}`);
    //     //this.bestScoreText.setText(`Best Score: ${this.bestScore}`);
    // }
 }

 export default PlayScene;