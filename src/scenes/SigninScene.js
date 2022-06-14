import Phaser from 'phaser';
import {getCredit} from '../network/network';
import BaseScene from './BaseScene';

class SigninScene extends BaseScene {
    constructor(config) {
        super('SigninScene', config);
        this.config = config;
        console.log('Sign in scene loading');
    }

    create() {
        const element = this.add.dom(200, 200).createFromCache('signinform').setOrigin(0,0);
        console.log('SIGN IN SCENE', element);
    }

}

export default SigninScene;