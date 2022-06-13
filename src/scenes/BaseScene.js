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
        this.reelVelocity = 0;
        this.stopOffset = 175;
        this.stopPosition = 400;
        this.fruitPositions = [
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
    }

    getFruit(pos) {
        let fruitFilter = this.fruitPositions.filter( e => pos === e.pos);
        if(fruitFilter.length === 0) {
            return null;
        } else {
            return fruitFilter[0].name;
        }
    }

    getRandomFruit() {
        return this.fruitPositions[Math.floor(Math.random()*this.fruitPositions.length)].name;
    }

}

export default BaseScene;