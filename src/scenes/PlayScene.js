import BaseScene from "./BaseScene";

const PIPES_TO_RENDER = 4;

class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config);
        //this.stopAtFruit = '';
        this.stopFruits = {
            'reel1' : '',
            'reel2' : '',
            'reel3' : '',
        },
        this.stopped = true;
        this.stopPressed = false;
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

        this.anims.create({
            key: 'start',
            frames: this.anims.generateFrameNumbers('startstop',{start:0, end: 2}),
            frameRate: 4, // 24fps default
            repeat: -1, //Repeat infinately
        });

        this.anims.create({
            key: 'stop',
            frames: this.anims.generateFrameNumbers('startstop',{start:3, end: 5}),
            frameRate: 8, // 24fps default
            repeat: -1, //Repeat infinately
        });

        //Stop button with solid light
        this.anims.create({
            key: 'stop_single',
            frames: this.anims.generateFrameNumbers('startstop',{start:5, end: 5}),
            frameRate: 8, // 24fps default
            repeat: -1, //Repeat infinately
        });


        //this.bird.play('fly');
        this.createReels();
        this.createFrames();
        this.createStartStop();
        this.createPointer();
    }

    //Gets a random position along the y access and the offset for the second reel
    getRandomYs() {
        let randomY = Math.floor(Math.random()*this.config.height+1);
        return [randomY, randomY -1120]; 
    }

    createReels() {
        //Create three reels
        let reel1Ys = this.getRandomYs();
        let reel2Ys = this.getRandomYs();
        let reel3Ys = this.getRandomYs();
        this.reel1 = this.physics.add.group();
        this.reel1.create(105, reel1Ys[0], 'reel').setOrigin(0,0);
        this.reel1.create(105, reel1Ys[1], 'reel').setOrigin(0,0);
        this.reel1.setVelocityY(this.reelVelocity);
        this.reel2 = this.physics.add.group();
        this.reel2.create(325, reel2Ys[0], 'reel').setOrigin(0,0);
        this.reel2.create(325, reel2Ys[1], 'reel').setOrigin(0,0);
        this.reel2.setVelocityY(this.reelVelocity);
        this.reel3 = this.physics.add.group();
        this.reel3.create(545, reel3Ys[0], 'reel').setOrigin(0,0);
        this.reel3.create(545, reel3Ys[1], 'reel').setOrigin(0,0);
        this.reel3.setVelocityY(this.reelVelocity);

    }

    //The housing around the reels
    createFrames() {
        this.add.image(80,250,'frame').setOrigin(0,0);
        this.add.image(300,250,'frame').setOrigin(0,0);
        this.add.image(520,250,'frame').setOrigin(0,0);
    }

    createStartStop() {
        this.startStopButton = this.add.sprite(800,530,'startstop').setOrigin(0,0).play('start');

        this.startStopButton.setInteractive();

        this.startStopButton.on('pointerdown', () => {
            if(this.stopped) {
                this.startStopButton.play('stop');
                //Start the reels
                this.startReels(200);
                this.stopped = false;
            } else {
                if(!this.stopPressed) {
                    this.startStopButton.play('stop_single');
                    this.stopPressed = true;
                    this.stopReels();
                }
                
                //this.stopped = true;
            }
            
        });
    }

    createPointer() {
        this.add.image(75,this.screenCenter[1],'pointer');
        this.add.image(75,this.stopPosition,'pointer');
    }

    startReels(velocity) {
        this.reel1.setVelocityY(velocity);
        this.reel2.setVelocityY(velocity);
        this.reel3.setVelocityY(velocity);
    }

    stopReels() {
        this.stopFruits['reel1'] = this.getRandomFruit();
        this.stopFruits['reel2'] = this.getRandomFruit();
        this.stopFruits['reel3'] = this.getRandomFruit();
        console.log('Stopping at ',this.stopFruits);
    }

    resetReels() {
        // this.stopFruits = {
        //     'reel1' : '',
        //     'reel2' : '',
        //     'reel3' : '',
        // },
        //this.stopped = true;
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
        this.input.keyboard.on('keydown_SPACE',() => {
            this.stopReels();
        });
    }

    update() {
        this.recycleReels();
        this.stopAt(this.reel1,'reel1');
        this.stopAt(this.reel2,'reel2');
        this.stopAt(this.reel3,'reel3');
    }

    recycleReels() {
        this.recycleReel(this.reel1.children.entries[0],this.reel1.children.entries[1]);
        this.recycleReel(this.reel2.children.entries[0],this.reel2.children.entries[1]);
        this.recycleReel(this.reel3.children.entries[0],this.reel3.children.entries[1]);
    }

    recycleReel(reelA,reelB) {
        //Make the fruits roll continuously
        if(reelA.getBounds().y > this.config.height) {
            reelA.y = reelB.getBounds().y - 1120;
        }
        if(reelB.getBounds().y > this.config.height) {
            reelB.y = reelA.getBounds().y -1120;
        }
    }

    getCurrentFruit() {
        // this.reel.children.entries.forEach(reel => {
        //     let fruitPos = Math.floor((this.screenCenter[0] - reelA.y + 70) / 140);
        //     this.getFruit(fruitPos)
        // });
    }

    checkAllStoppedAndResetStoppedStatus() {
        if(this.stopFruits.reel1 == '' && this.stopFruits.reel2 == '' && this.stopFruits.reel3 == '') {
            console.log('ALL HAVE STOPPED');
            this.startStopButton.play('start');
            this.stopped = true;
            this.stopPressed = false;
        }
    }

    resetReel(reelGroup, reelNumber) {
        reelGroup.setVelocityY(0);
        //Reset the reel
        this.stopFruits[reelNumber] = '';
        //If on final reel reset the stopped status
        this.checkAllStoppedAndResetStoppedStatus();
    }    
    stopAt(reelGroup, reelNumber) {
        reelGroup.children.entries.forEach(reel => {
            let fruitPos = this.stopPosition - reel.y + this.stopOffset;
            let fruitIndex = Math.floor((fruitPos) / 140);
            //If it is on the named fruit already then it needs to cycle once again before stopping.
            let onNamedFruit = ((fruitIndex * 140) + 120) > fruitPos;
            //console.log('lemon', this.screenCenter[0] - reel.y + 35, ((fruitIndex * 140) + 120) > fruitPos);
            if(this.getFruit(fruitIndex) === this.stopFruits[reelNumber] && !onNamedFruit) {
                this.resetReel(reelGroup,reelNumber);
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