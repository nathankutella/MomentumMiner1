    import { MapScene } from './scenes/MapScene.js';
    import { MenuScenes } from './scenes/MenuScenes.js';
    import { Universal } from './scenes/Universal.js';

var config = {
    type: Phaser.AUTO,
    width: window.innerWidth*.96,
    height: window.innerHeight*.96,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {x: 0, y: 350 },
            debug: false
        }
    },
    pixelArt: true,
    scene: 
        [Universal, MapScene, MenuScenes]
    //     preload: preload,
    //     create: create,
    //     update: update
};


const game = new Phaser.Game(config);
