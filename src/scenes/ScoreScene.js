import BaseScene from "./BaseScene";


class ScoreScene extends BaseScene {
    constructor(config) {
        super('ScoreScene', {...config, canGoBack: true });
    }

    create() {
        super.create();
        const scorePosition = [this.screenCenter[0], this.screenCenter[1]];
        console.log(this);  
        this.add.text(...scorePosition, `Best Score: ${this.getBestScore()}`, this.fontOptions).setOrigin(0.5,1);
    }
    

}


export default ScoreScene;