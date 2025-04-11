
import { MapScene } from './scenes/MapScene.js';
import { MenuScenes } from './scenes/MenuScenes.js';


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
        [MapScene, MenuScenes]
    //     preload: preload,
    //     create: create,
    //     update: update
};


var game = new Phaser.Game(config);

var slidersMovement = [-1, -1]
var levelPRs = [null]
var level = 1;
let elapsedTime;

var map;
var tileset;
var bg;
var shading;
var spikes;
var chest;
var layer;
var cosmetics;

var menu;



var platforms;
var movingPlatform;
var player;
var menu;
var stars;
var cursors;
var timerText;
var horizontalSlider;
var verticalSlider;
var velocityLocked = [false, false]

let spikeTimer = null;
let inSpike = false;

var startTime;


var allMoves = [];
var hasMoved = true;

var platformSpeed = 100;
var sliderSpeed = 450;
var universalScale = (window.innerWidth*.96) / 320
var gravity = 350;    
var score = 0;

function preload ()
{
    this.load.image('button', 'assets/button.png');
    this.load.image('close', 'assets/x.png');
    this.load.image('rewind', 'assets/rewind.png');
    this.load.image('menu', 'assets/menu.png');
    this.load.image('pause', 'assets/pause.png');
    this.load.image('sky', 'assets/caveBG.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );
    this.load.image("tiles", "assets/update1.png");
    this.load.tilemapTiledJSON("map", "assets/firstJson.tmj");
    this.load.tilemapTiledJSON("map1", "assets/mapWithSpikes.tmj");

    // this.load.image('tiles', 'assets/spritsheet.png');
    // this.load.image('map', 'assets/map.json');

}

function create ()
{
    map = this.make.tilemap({ key: "map1" });
    tileset = map.addTilesetImage("update1", "tiles");

    bg = map.createLayer("background", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);
    shading = map.createLayer("shading", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);
    spikes = map.createLayer("spikes", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);
    layer = map.createLayer("Tile Layer 1", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);
    chest = map.createLayer("chest", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);
    cosmetics = map.createLayer("cosmetics", tileset, 0, -640 * universalScale + window.innerHeight).setScale(universalScale, universalScale);

    chest.setCollisionByProperty({ collides: true });
    chest.setCollisionByExclusion([-1]);

    spikes.setCollisionByProperty({ collides: true });
    spikes.setCollisionByExclusion([-1]);

    layer.setCollisionByProperty({ collides: true });
    layer.setCollisionByExclusion([-1]);




    player = this.physics.add.sprite(window.innerHeight*0.05, window.innerHeight - universalScale*64, 'dude').setScale( universalScale/2, universalScale/2);
    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);

        stars = this.physics.add.sprite(window.innerHeight*0.05, window.innerHeight - universalScale*64, 'star').setScale( universalScale/10, universalScale/5).setVisible(false);

    stars.setBounce(0);
    stars.setCollideWorldBounds(true);


    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
           });



    //Background of Vertical
    this.add.rectangle(window.innerWidth - window.innerWidth*.065, window.innerHeight / 2 - window.innerHeight*.045, window.innerWidth*.02, window.innerHeight - window.innerHeight*.15, 0xbdbdbd).setStrokeStyle(20, 0xbdbdbd).setOrigin(0.5);


    // //background of Horizontal
    this.add.rectangle(window.innerWidth / 2 - window.innerWidth*.045, window.innerHeight - window.innerHeight*.068, window.innerWidth - window.innerWidth*.125, window.innerHeight*.015, 0xbdbdbd).setStrokeStyle(20, 0xbdbdbd).setOrigin(0.5);


    // //Base Vertical Line
    this.add.rectangle(window.innerWidth - window.innerWidth*.065, window.innerHeight / 2 - window.innerHeight*.045, window.innerWidth*.008, window.innerHeight - window.innerHeight*.2, 0xffffff).setStrokeStyle(2, 0xffffff).setOrigin(0.5);
    this.add.circle   (window.innerWidth - window.innerWidth*.065, window.innerHeight*.055, window.innerWidth*.0045, 0xffffff);
    this.add.circle   (window.innerWidth - window.innerWidth*.065, window.innerHeight*.855, window.innerWidth*.0045, 0xffffff);
    this.add.rectangle(window.innerWidth - window.innerWidth*.065, window.innerHeight*.875, window.innerWidth*.02 + 2, window.innerHeight*.0085 + 2, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);

    // //Base Horixontal Line
    this.add.rectangle(window.innerWidth / 2 - window.innerWidth*.045, window.innerHeight - window.innerHeight*.068, window.innerWidth - window.innerWidth*.135, window.innerHeight*.007, 0xffffff).setStrokeStyle(2, 0xffffff).setOrigin(0.5);
    this.add.circle   (window.innerWidth*.022, window.innerHeight - window.innerHeight*.068, window.innerHeight*.0045, 0xffffff);
    this.add.circle   (window.innerWidth*.888, window.innerHeight - window.innerHeight*.068, window.innerHeight*.0045, 0xffffff);
    this.add.rectangle(window.innerWidth / 2 - window.innerWidth*.045,window.innerHeight - window.innerHeight*.068, window.innerWidth*.0035 + 2, window.innerHeight*.025 + 2, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);

    //Vertical Ball
    verticalSlider = this.physics.add.sprite(window.innerWidth - window.innerWidth*.065,window.innerHeight / 2 - window.innerHeight*.045, 'bomb').setScale((window.innerWidth*.96) / 2000*2, (window.innerWidth*.96) / 2000*2);
    verticalSlider.body.gravity.y = -gravity;
    verticalSlider.setVelocityY(slidersMovement[1]*(window.innerHeight*0.35));

    //Horizontal Ball
    horizontalSlider = this.physics.add.sprite(window.innerWidth / 2 - window.innerWidth*.045,  window.innerHeight - window.innerHeight*.068, 'bomb').setScale((window.innerHeight*.96) / 1000*2, (window.innerHeight*.96) / 1000*2);
    horizontalSlider.body.gravity.y = -gravity;
    horizontalSlider.setVelocityX(slidersMovement[1]*(window.innerWidth*0.35));

    player.setFrictionX(.1);
    player.setFrictionY(.1);

    var textSize = window.innerWidth*0.025;

    startTime = this.time.now;
    timerText = this.add.text(window.innerWidth*0.075, window.innerHeight*0.012, 'Time: 0s', { fontSize: textSize + 'px', fill: '#000000' });


    let pause = this.add.image(window.innerWidth*0.02, window.innerHeight*0.03, 'pause').setInteractive().setScale(universalScale/2);
    let rewind = this.add.image(window.innerWidth*0.05, window.innerHeight*0.03, 'rewind').setInteractive().setScale(universalScale/2);

    menu = this.add.image(window.innerWidth*0.48,  window.innerHeight*0.48, 'menu').setInteractive().setScale(window.innerWidth / 400, window.innerHeight / 300).setVisible(false);
    let button1 = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.43, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420).setVisible(false);
    let button2 = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.58, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420).setVisible(false);
    let button3 = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.73, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420).setVisible(false);
    let menuText = this.add.text(window.innerWidth * 0.31, window.innerHeight * 0.13, 'MENU', { fontSize: window.innerWidth * 0.15 + 'px', fill: '#FFFFFF' }).setShadow(5, 5, '#000000', 5).setVisible(false);
    
    let close = this.add.image(window.innerWidth*0.13,  window.innerHeight*0.15, 'close').setInteractive().setScale(window.innerWidth / 400, window.innerHeight / 300).setVisible(false);
        close.on('pointerdown', () => {
        menu.setVisible(!menu.visible);
        close.setVisible(!close.visible);
        menuText.setVisible(!menuText.visible);
        button1.setVisible(!button1.visible);
        button2.setVisible(!button2.visible);
        button3.setVisible(!button3.visible);
        verticalSlider.setVelocityY(slidersMovement[0]*window.innerHeight*0.35);
        horizontalSlider.setVelocityX(slidersMovement[1]*window.innerWidth*0.35);
    });



    pause.on('pointerover', () => {
        pause.setTint(0xaaaaaa); 
    });


    pause.on('pointerout', () => {
        pause.clearTint(); 
    });


    pause.on('pointerdown', () => {
        if (!menu.visible){
                    menu.setVisible(!menu.visible);
        close.setVisible(!close.visible);
        menuText.setVisible(!menuText.visible);
        button1.setVisible(!button1.visible);
        button2.setVisible(!button2.visible);
        button3.setVisible(!button3.visible);
        }
        console.log('Button clicked!');
    });


    rewind.on('pointerover', () => {
        console.log(allMoves[allMoves.length-2] + 'Button clicked!');
        rewind.setTint(0xaaaaaa);
    });


    rewind.on('pointerout', () => {
        rewind.clearTint(); 
    });


    rewind.on('pointerdown', () => {
        if (!menu.visible){
        player.x = allMoves[allMoves.length-2][0];
        player.y = allMoves[allMoves.length-2][1];
        layer.x = allMoves[allMoves.length-2][2];
        layer.y = allMoves[allMoves.length-2][3];
        allMoves.pop();
            // layer.x = map.x
        bg.x = layer.x
        cosmetics.x = layer.x
        spikes.x = layer.x
        shading.x = layer.x
        chest.x = layer.x
        
        // layer.y = map.y
        bg.y = layer.y
        cosmetics.y = layer.y
        spikes.y = layer.y
        shading.y = layer.y
        chest.y = layer.y
        console.log('Button clicked!');
        // Add the functionality you want here
        }
    });

    this.physics.add.collider(player, layer);
    this.physics.add.collider(stars, layer);
    // this.physics.add.collider(player, spikes);

    this.physics.add.overlap(player, chest, onChestCollision, checkOverlap, this);
    this.physics.add.overlap(stars, spikes, onSpikeCollision, checkOverlap, this);


    function checkOverlap(colliders, tile) {
        // Ensure we're only detecting spikes
        return tile.index !== 0; // Make sure we're not detecting empty tiles
    }


    function onChestCollision(colliders, tile) {

        if (!tile || tile.index === 0 || tile.index === -1) return; 

        if (levelPRs[level-1] > elapsedTime || levelPRs[level-1] == null) {
            levelPRs[level-1] = elapsedTime;
        }
        startTime = this.time.now;
        


        layer.x = allMoves[0][2];
        layer.y = allMoves[0][3];
            // layer.x = map.x
        bg.x = layer.x
        cosmetics.x = layer.x
        spikes.x = layer.x
        shading.x = layer.x
        chest.x = layer.x
        
        // layer.y = map.y
        bg.y = layer.y
        cosmetics.y = layer.y
        spikes.y = layer.y
        shading.y = layer.y
        chest.y = layer.y


        player.x = allMoves[0][0];
        player.y = allMoves[0][1] - 10;
        allMoves.splice(1, allMoves.length);


        console.log("Congrats");
    }

    function onSpikeCollision(colliders, tile) {

        if (!tile || tile.index === 0 || tile.index === -1) return; 
        
        player.x = allMoves[0][0];
        player.y = allMoves[0][1];
        layer.x = allMoves[0][2];
        layer.y = allMoves[0][3];
            // layer.x = map.x
        bg.x = layer.x
        cosmetics.x = layer.x
        spikes.x = layer.x
        shading.x = layer.x
        chest.x = layer.x
        
        // layer.y = map.y
        bg.y = layer.y
        cosmetics.y = layer.y
        spikes.y = layer.y
        shading.y = layer.y
        chest.y = layer.y

        startTime = startTime - 10000

        console.log("Player touched the exact center of the spike!");
    }

}

function update ()
{

    elapsedTime = Math.floor((this.time.now - startTime) / 1000); // Convert to seconds
    timerText.setText('Time: ' + elapsedTime + 's' + '  PR: ' + levelPRs[level - 1]); // Update text

    cursors = this.input.keyboard.createCursorKeys();

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }

    if (player.body.blocked.down){
        if (hasMoved){
            allMoves.push([player.x, player.y, layer.x, layer.y]);
            hasMoved = false;
        }
        player.setVelocityX(0);
        stars.setVelocityY(-6);
        inSpike = false;
        player.anims.play('turn');  
    } else {
        stars.setVelocityY(0);
        stars.x = player.x 
        stars.y = player.y + universalScale*5
        if (player.body.velocity.x > 0){
            player.anims.play('right', true);
        } else if (player.body.velocity.x < 0){
            player.anims.play('left', true);
        } else {
            player.anims.play('turn');
        }
    }

    var wKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
    var aKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    var sKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    var dKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // if (spaceBar.isDown && player.body.touching.down){
    //     player.setVelocityY(-500);
    // }

    // if (movingPlatform.x >= 600) {
    //     movingPlatform.setVelocityX(-platformSpeed); // Move left
    // } else if (movingPlatform.x <= 200) {
    //     movingPlatform.setVelocityX(platformSpeed); // Move right
    // }

    if (aKey.isDown) {
        player.setVelocityX(-200);
    } else if (dKey.isDown) {
        player.setVelocityX(200);
    }

    if (wKey.isDown) {
        player.setVelocityY(-200);
    } else if (sKey.isDown) {
        player.setVelocityY(200);
    }

    if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
        if (velocityLocked[0]) {
            if (velocityLocked[1]) { 
                if (player.body.blocked.down){
                    player.setVelocityY(-Math.sqrt((universalScale*150000)*(((window.innerHeight*.845 - verticalSlider.y)/window.innerHeight*.795)))); 
                    // -(universalScale*64)
                    if ((((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)) < 0){
                        player.setVelocityX(-Math.sqrt((universalScale*100000)*(-((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)))); 
                        console.log(-Math.sqrt((universalScale*100000)*(-((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325))) + 'horiz');

                    } else {
                        player.setVelocityX(Math.sqrt((universalScale*100000)*(((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)))); 
                        console.log(Math.sqrt((universalScale*100000)*(((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325))) + 'horiz');
                    }
                    console.log(-Math.sqrt((universalScale*280)*(((window.innerHeight*.845 - verticalSlider.y)/window.innerHeight*.795))) + 'vert');
                    console.log(universalScale + 'scale');

                    velocityLocked[0] = false;
                    velocityLocked[1] = false;
                    
                    verticalSlider.setVelocityY(slidersMovement[0]*window.innerHeight*0.35);
                    horizontalSlider.setVelocityX(slidersMovement[1]*window.innerWidth*0.35);
                    hasMoved = true;
                }
            } else {
                horizontalSlider.setVelocityX(0);
                velocityLocked[1] = true;
            }
        } else {
            verticalSlider.setVelocityY(0);  
            velocityLocked[0] = true;
        }
    }

    if (velocityLocked[0]) {
        verticalSlider.setVelocityY(0);  
        if (velocityLocked[1]) { 
            horizontalSlider.setVelocityX(0);
        }
    } 

    if (menu.visible){
        verticalSlider.setVelocityY(0);
        horizontalSlider.setVelocityX(0);
    }

    if (verticalSlider.y >= (window.innerHeight*.845)) {
        slidersMovement[0] = -1;
        verticalSlider.setVelocityY(-(window.innerHeight*0.35)); // Move left
    } else if (verticalSlider.y <= (window.innerHeight*.065)) {
        slidersMovement[0] = 1;
        verticalSlider.setVelocityY(window.innerHeight*0.35); // Move right
    }
    if (horizontalSlider.x >= (window.innerWidth*.878)) {
        slidersMovement[1] = -1;
        horizontalSlider.setVelocityX(-(window.innerWidth*0.35)); // Move left
    } else if (horizontalSlider.x <= (window.innerWidth*.032)) {
        slidersMovement[1] = 1;
        horizontalSlider.setVelocityX(window.innerWidth*0.35); // Move right
    }




    // Move layer UP when player is below 75% of screen & layer hasn't reached max height
    if (player.y > window.innerHeight * 0.75 && layer.y > -640 * universalScale + window.innerHeight) {
        layer.y -= window.innerHeight * 0.03;
        player.y -= window.innerHeight * 0.03;
    } 
    // Move layer DOWN when player is above 25% of screen & layer hasn't reached min height
    else if (player.y < window.innerHeight * 0.25 && layer.y < 0 - window.innerHeight * 0.03) {
        layer.y += window.innerHeight * 0.03;
        player.y += window.innerHeight * 0.03;
    }

    // Move layer LEFT when player is near the right edge & hasn't reached max left position
    if (player.x > window.innerWidth * 0.75 && layer.x > -480 * universalScale  + window.innerWidth*.97) {
        layer.x -= window.innerWidth * 0.01;
        player.x -= window.innerWidth * 0.01;
    } 
    // Move layer RIGHT when player is near the left edge & hasn't reached max right position
    else if (player.x < window.innerWidth * 0.25 && layer.x < 0) {
        layer.x += window.innerWidth * 0.01;
        player.x += window.innerWidth * 0.01;
    }


    // layer.x = map.x
    bg.x = layer.x
    cosmetics.x = layer.x
    spikes.x = layer.x
    shading.x = layer.x
    chest.x = layer.x

    // layer.y = map.y
    bg.y = layer.y
    cosmetics.y = layer.y
    spikes.y = layer.y
    shading.y = layer.y
    chest.y = layer.y
}

