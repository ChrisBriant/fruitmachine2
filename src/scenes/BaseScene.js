import Phaser from 'phaser';


class BaseScene extends Phaser.Scene {
    constructor(key, config) {
        super(key, 'BaseScene');
        this.config = config;
        this.screenCenter = [config.width /2, config.height/2];
        this.fontSize = 32;
        this.lineHeight = 42;
        this.fontOptions = {
            fontSize: `${this.fontSize}px`,
            fill : '#FFF',
        };
        this.fruitPositions = [
            {
                name: 'apple',
                pos: 0,
            },
            {
                name: 'banana',
                pos: 140,
            },
            {
                name: 'grapes',
                pos: 280,
            },
            {
                name: 'melon',
                pos: 420,
            },
            {
                name: 'lemon',
                pos: 560,
            },
            {
                name: 'orange',
                pos: 700,
            },
            {
                name: 'cherry',
                pos: 840,
            },
            {
                name: 'bar',
                pos: 980,
            },
    ];
    this.fruitPositions2 = [
        {
            name: 'apple',
            pos: 1,
        },
        {
            name: 'banana',
            pos: 2,
        },
        {
            name: 'grapes',
            pos: 3,
        },
        {
            name: 'melon',
            pos: 4,
        },
        {
            name: 'lemon',
            pos: 5,
        },
        {
            name: 'orange',
            pos: 6,
        },
        {
            name: 'cherry',
            pos: 7,
        },
        {
            name: 'bar',
            pos: 8,
        }
    ];

        // if(this.config.canGoBack) {
        //     const backButton = this.add.image(this.config.width - 10, this.config.height - 10, 'back')
        //     .setScale(3)
        //     .setInteractive()
        //     .setOrigin(1);

        //     backButton.on('pointerup', () => {
        //         this.scene.start('MenuScene');
        //     });
        // }
    }

    createMenu(menu, setupMenuEvents) {
        // let lastMenuPositionY = 0;


        // menu.forEach(menuItem => {
        //     const menuPosition = [this.screenCenter[0], this.screenCenter[1] + lastMenuPositionY];
        //     menuItem.textGO =this.add.text(...menuPosition, menuItem.text, this.fontOptions).setOrigin(0.5,1);
        //     lastMenuPositionY += this.lineHeight;
        //     setupMenuEvents(menuItem);

        // });
    }

    getFruit(pos) {
        let fruitFilter = this.fruitPositions2.filter( e => pos === e.pos);
        if(fruitFilter.length === 0) {
            return null;
        } else {
            return fruitFilter[0].name;
        }
    }

    getRandomFruit() {
        console.log('Random la la');
        return this.fruitPositions2[Math.floor(Math.random()*this.fruitPositions2.length)].name;
    }

    // getBestScore() {
    //     const bestScore = localStorage.getItem('bestScore');
    //     if (bestScore) {
    //         return parseInt(bestScore);
    //     } else {
    //         return 0;
    //     }
    // }

}

export default BaseScene;