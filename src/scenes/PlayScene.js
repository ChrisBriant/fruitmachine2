import BaseScene from "./BaseScene";

class PlayScene extends BaseScene {
    constructor(config) {
        super('PlayScene', config);
        this.stopFruits = {
            'reel1' : '',
            'reel2' : '',
            'reel3' : '',
        },
        this.stopped = true;
        this.stopPressed = false;
    }

    preload() {

    }

    create() {  
        this.handleInputs();

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
        this.createStaticGraphics();
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
    createStaticGraphics() {
        this.add.image(0,0,'panel').setOrigin(0,0);
        this.add.image(20,140,'decoration1').setOrigin(0,0);
        this.add.image(80,200,'frame').setOrigin(0,0);
        this.add.image(300,200,'frame').setOrigin(0,0);
        this.add.image(520,200,'frame').setOrigin(0,0);
        this.add.image(100,465,'shading').setOrigin(0,0);
        this.add.image(100,220,'shading').setOrigin(0,0).setFlipY(true);
        this.add.image(320,465,'shading').setOrigin(0,0);
        this.add.image(320,220,'shading').setOrigin(0,0).setFlipY(true);
        this.add.image(540,465,'shading').setOrigin(0,0);
        this.add.image(540,220,'shading').setOrigin(0,0).setFlipY(true);
        //Credit display
        this.add.rectangle(780, 20, 160, 120, 0x000).setOrigin(0,0);
        this.add.text(785, 25, 'Credit', {
			fontFamily: '"VT323"',
			fontSize: '30px'
		});
        this.creditText = this.add.text(785, 68, '£00.00', {
			fontFamily: '"VT323"',
			fontSize: '60px'
		});
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

    handleInputs() {
        //Input actions
        this.input.keyboard.on('keydown_SPACE',() => {
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
            }
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
            if(this.getFruit(fruitIndex) === this.stopFruits[reelNumber] && !onNamedFruit) {
                this.resetReel(reelGroup,reelNumber);
            }
        });

    }

 }

 export default PlayScene;