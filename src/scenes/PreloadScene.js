import Phaser from 'phaser';
import WebFontFile from './WebFontLoader';


class PreloadScene extends Phaser.Scene {
    constructor(config) {
        super('PreloadScene');
    }

    preload() {
        this.load.image('reel','../assets/slot_reel_vert.png');
        this.load.image('pointer','../assets/bird.png');
        this.load.image('panel','../assets/panel.png');
        this.load.image('decoration1','../assets/decoration1.png');
        this.load.image('shading','../assets/shading7.png');
        this.load.image('frame','../assets/frame.png');
        this.load.spritesheet('startstop', '../assets/start_stop.png', {
            frameWidth: 120,
            frameHeight: 81,
        });
        //this.load.script('webfont', 'https://ajax.googleapis.com/ajax/libs/webfont/1.6.26/webfont.js');
        this.load.addFile(new WebFontFile(this.load, 'VT323'));
        //https://fonts.googleapis.com/css2?family=VT323&display=swap
        // this.load.image('pipe', '../assets/pipe.png');
        // this.load.image('pause', '../assets/pause.png');
        // this.load.image('back', '../assets/back.png');
    }

    create() {
        this.scene.start('PlayScene');
    }


}

export default PreloadScene;