
import Phaser, { Scene } from "phaser";
import PlayScene from "./scenes/PlayScene";
import PreloadScene from "./scenes/PreloadScene";
import SigninScene from "./scenes/SigninScene";


const WIDTH = 950;
const HEIGHT = 650;

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
}

const scenes = [PreloadScene,SigninScene,PlayScene];
const createScene = (Scene) => new Scene(SHARED_CONFIG);

const initScenes = () => scenes.map(createScene);

const config = {
  type: Phaser.AUTO,
  ...SHARED_CONFIG,
  pixelArt: true,
  physics: {
    default: 'arcade',
    arcade: {
      //debug: true,
    }
  },
  scene: initScenes()
};

new Phaser.Game(config);


