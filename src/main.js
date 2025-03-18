
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
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};


var game = new Phaser.Game(config);

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

    bg = map.createLayer("background", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);
    shading = map.createLayer("shading", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);
    spikes = map.createLayer("spikes", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);
    layer = map.createLayer("Tile Layer 1", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);
    chest = map.createLayer("chest", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);
    cosmetics = map.createLayer("cosmetics", tileset, 0, -450 * universalScale).setScale(universalScale, universalScale);

    spikes.setCollisionByProperty({ collides: true });
    layer.setCollisionByExclusion([-1]);

    layer.setCollisionByProperty({ collides: true });
    layer.setCollisionByExclusion([-1]);

    player = this.physics.add.sprite(100, 450, 'dude').setScale( universalScale/2, universalScale/2);
    

    player.setBounce(0.2);
    player.setCollideWorldBounds(true);


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


    function hitSpikes ()
    {
        startTime = this.time.now;
        player.x = 100;
        player.y = 450;
    }



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
    verticalSlider.setVelocityY(-(window.innerHeight*0.35));

    //Horizontal Ball
    horizontalSlider = this.physics.add.sprite(window.innerWidth / 2 - window.innerWidth*.045,  window.innerHeight - window.innerHeight*.068, 'bomb').setScale((window.innerHeight*.96) / 1000*2, (window.innerHeight*.96) / 1000*2);
    horizontalSlider.body.gravity.y = -gravity;
    horizontalSlider.setVelocityX(-(window.innerWidth*0.35));

    player.setFrictionX(.1);
    player.setFrictionY(.1);

    var textSize = window.innerWidth*0.025;

    startTime = this.time.now;
    timerText = this.add.text(window.innerWidth*0.075, window.innerHeight*0.012, 'Time: 0s', { fontSize: textSize + 'px', fill: '#000' });


    let pause = this.add.image(window.innerWidth*0.02, window.innerHeight*0.03, 'pause').setInteractive().setScale(universalScale/2);
    let rewind = this.add.image(window.innerWidth*0.05, window.innerHeight*0.03, 'rewind').setInteractive().setScale(universalScale/2);

    menu = this.add.image(window.innerWidth*0.48,  window.innerHeight*0.48, 'menu').setInteractive().setScale(universalScale, universalScale * 0.65).setVisible(false);;


    let button = this.add.image(100, 100, 'buttonImage').setInteractive();
        button.on('pointerdown', () => {
        menu.setVisible(!menu.visible);
        verticalSlider.setVelocityY(window.innerHeight*0.35);
        horizontalSlider.setVelocityX(window.innerWidth*0.35);
    });

    pause.on('pointerover', () => {
        pause.setTint(0xaaaaaa); // Darken on hover
    });


    pause.on('pointerout', () => {
        pause.clearTint(); // Remove tint when not hovering
    });


    pause.on('pointerdown', () => {
        menu.setVisible(!menu.visible);
        console.log('Button clicked!');
        // Add the functionality you want here
    });


    rewind.on('pointerover', () => {
        rewind.setTint(0xaaaaaa); // Darken on hover
    });


    rewind.on('pointerout', () => {
        rewind.clearTint(); // Remove tint when not hovering
    });


    rewind.on('pointerdown', () => {
        player.x = allMoves[allMoves.length-2][0];
        player.y = allMoves[allMoves.length-2][1];
        layer.x = allMoves[allMoves.length-2][2];
        layer.y = allMoves[allMoves.length-2][3];
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
    });

    this.physics.add.collider(player, layer);
    this.physics.add.collider(player, spikes);
    // this.physics.add.collider(player, platforms);
    // this.physics.add.collider(player, movingPlatform);
    // this.physics.add.collider(stars, platforms);
    // this.physics.add.collider(stars, movingPlatform);
    // this.physics.add.overlap(player, stars, collectStar, null, this);
    }

function update ()
{

    let elapsedTime = Math.floor((this.time.now - startTime) / 1000); // Convert to seconds
    timerText.setText('Time: ' + elapsedTime + 's'); // Update text

    cursors = this.input.keyboard.createCursorKeys();

    // if (cursors.left.isDown)
    // {
    //     player.setVelocityX(-160);

    //     player.anims.play('left', true);
    // }
    // else if (cursors.right.isDown)
    // {
    //     player.setVelocityX(160);

    //     player.anims.play('right', true);
    // }
    // else
    // {
    //     // player.setVelocityX(0);

    //     player.anims.play('turn');
    // }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-500);
    }

    if (player.body.blocked.down){
        if (hasMoved){
            allMoves.push([player.x, player.y, map.x, map.y]);
            hasMoved = false;
        }
        player.setVelocityX(0);
        player.anims.play('turn');
    } else {
        if (player.body.velocity.x > 0){
            player.anims.play('right', true);
        } else if (player.body.velocity.x < 0){
            player.anims.play('left', true);
        } else {
            player.anims.play('turn');
        }
    }

    var spaceBar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // if (spaceBar.isDown && player.body.touching.down){
    //     player.setVelocityY(-500);
    // }

    // if (movingPlatform.x >= 600) {
    //     movingPlatform.setVelocityX(-platformSpeed); // Move left
    // } else if (movingPlatform.x <= 200) {
    //     movingPlatform.setVelocityX(platformSpeed); // Move right
    // }

    if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
        if (velocityLocked[0]) {
            if (velocityLocked[1]) { 
                player.setVelocityY((universalScale*1.5)*(((window.innerHeight*.845 - verticalSlider.y)/window.innerWidth*.795)*(-100/0.41))); 
                player.setVelocityX((universalScale*1.5)*(((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)*(100/0.18))); 
                console.log((((window.innerHeight*.845 - verticalSlider.y)/window.innerWidth*.795)) + 'Button clicked!');
                console.log((((horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)) + 'Button clicked!');
                velocityLocked[0] = false;
                velocityLocked[1] = false;
                verticalSlider.setVelocityY(window.innerHeight*0.35);
                horizontalSlider.setVelocityX(window.innerWidth*0.35);
                hasMoved = true;
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
        verticalSlider.setVelocityY(-(window.innerHeight*0.35)); // Move left
    } else if (verticalSlider.y <= (window.innerHeight*.065)) {
        verticalSlider.setVelocityY(window.innerHeight*0.35); // Move right
    }
    if (horizontalSlider.x >= (window.innerWidth*.878)) {
        horizontalSlider.setVelocityX(-(window.innerWidth*0.35)); // Move left
    } else if (horizontalSlider.x <= (window.innerWidth*.032)) {
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

