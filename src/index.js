
import Phaser, { Scene } from "phaser";
import PlayScene from "./scenes/PlayScene";
import MenuScene from "./scenes/MenuScene";
import PreloadScene from "./scenes/PreloadScene";
import ScoreScene from "./scenes/ScoreScene";
import PauseScene from "./scenes/PauseScene";

const WIDTH = 950;
const HEIGHT = 650;

const SHARED_CONFIG = {
  width : WIDTH,
  height : HEIGHT,
}

const scenes = [PreloadScene,PlayScene];
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
  //scene: [PreloadScene, new MenuScene(SHARED_CONFIG), new PlayScene(SHARED_CONFIG)]
  scene: initScenes()
  //scene: [new PlayScene(SHARED_CONFIG)]
};

new Phaser.Game(config);


