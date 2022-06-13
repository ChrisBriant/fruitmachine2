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
        this.load.image('shading','../assets/shading.png');
        this.load.image('frame','../assets/frame.png');
        this.load.spritesheet('startstop', '../assets/start_stop.png', {
            frameWidth: 120,
            frameHeight: 81,
        });
        this.load.addFile(new WebFontFile(this.load, 'VT323'));
    }

    create() {
        this.scene.start('PlayScene');
    }


}

export default PreloadScene;