var config = {
    type: Phaser.AUTO,
    width: 1900,
    height: 925,
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


var platforms;
var movingPlatform;
var player;
var stars;
var cursors;
var scoreText;
var horizontalSlider;
var verticalSlider;
var velocityLocked = [false, false]


var platformSpeed = 101;
var sliderSpeed = 450;

var gravity = 350;
var tempWidth = 1900;
var tempLength = 925;

var lengthOfHor = tempWidth - 110;
var lengthOfVert = tempLength - 110;

var score = 0;

function preload ()
{
    this.load.image('sky', 'assets/caveBG.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png',
        { frameWidth: 32, frameHeight: 48 }
    );

    // this.load.image('tiles', 'assets/spritsheet.png');
    // this.load.image('map', 'assets/map.json');

}

function create ()
{
    // const map = this.make.tilemap({ key: 'map' });

    // // Add the tileset image (must match the name used in Tiled)
    // const tileset = map.addTilesetImage('Tutorial Project', 'tiles');

    // // Create layers (use the layer names from your tilemap JSON)
    // const backgroundLayer = map.createLayer('Background', tileset, 0, 0);
    // const groundLayer = map.createLayer('Ground', tileset, 0, 0);
    


    scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    this.add.image(tempWidth/2, tempLength/2, 'sky').setScale(2.5);


    platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 250, 'ground');

    movingPlatform = this.physics.add.image(400, 100, 'ground');
    movingPlatform.setImmovable(true);
    movingPlatform.body.allowGravity = false;
    movingPlatform.setVelocityX(platformSpeed);

    player = this.physics.add.sprite(100, 450, 'dude');
    
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



    stars = this.physics.add.group({
        key: 'star',
        repeat: 11,
        setXY: { x: 12, y: 0, stepX: 70 }
    });

    stars.children.iterate(function (child) {

        child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

           });
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        score += 10;
        scoreText.setText('Score: ' + score);
    }



    //Background of Vertical
    this.add.rectangle(tempWidth - 30, tempLength / 2 - 15, 35, tempLength - 70, 0xbdbdbd).setStrokeStyle(20, 0xbdbdbd).setOrigin(0.5);
    this.add.circle(tempWidth - 30, tempLength - 80, 5, 0xbdbdbd);
    this.add.circle(tempWidth - 30, 30 , 5, 0xbdbdbd);

    //background of Horizontal
    this.add.rectangle(tempWidth / 2 - 25, tempLength - 32, tempWidth-100, 35, 0xbdbdbd).setStrokeStyle(20, 0xbdbdbd).setOrigin(0.5);
    this.add.circle(tempWidth - 80, tempLength - 32, 5, 0xbdbdbd);
    this.add.circle(30, tempLength - 32, 5, 0xbdbdbd);

    //Base Vertical Line
    this.add.rectangle(tempWidth - 30, tempLength / 2 - 25, 12, tempLength - 110, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);
    this.add.circle(tempWidth - 30, tempLength - 80, 5, 0xffffff);
    this.add.circle(tempWidth - 30, 30 , 5, 0xffffff);
    this.add.rectangle(tempWidth - 30, tempLength - 60, 50, 12, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);

    //Base Horixontal Line
    this.add.rectangle(tempWidth / 2 - 25, tempLength - 32, tempWidth-110, 12, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);
    this.add.circle(tempWidth - 80, tempLength - 32, 5, 0xffffff);
    this.add.circle(30, tempLength - 32, 5, 0xffffff);
    this.add.rectangle(tempWidth / 2, tempLength - 32, 12, 50, 0xffffff).setStrokeStyle(2, 0x00000).setOrigin(0.5);

    //Vertical Ball
    verticalSlider = this.physics.add.sprite(tempWidth - 30, tempLength / 2, 'bomb').setScale(2, 2);
    verticalSlider.body.gravity.y = -gravity;
    verticalSlider.setVelocityY(-sliderSpeed);

    //Horizontal Ball
    horizontalSlider = this.physics.add.sprite(tempWidth / 2, tempLength - 32, 'bomb').setScale(2, 2);
    horizontalSlider.body.gravity.y = -gravity;
    horizontalSlider.setVelocityX(-sliderSpeed*1.5);

    player.setFrictionX(.1);
    player.setFrictionY(.1);
    
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, movingPlatform);
    this.physics.add.collider(stars, platforms);
    this.physics.add.collider(stars, movingPlatform);
    this.physics.add.overlap(player, stars, collectStar, null, this);
}

function update ()
{

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

    if (player.body.touching.down){
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

    if (movingPlatform.x >= 600) {
        movingPlatform.setVelocityX(-platformSpeed); // Move left
    } else if (movingPlatform.x <= 200) {
        movingPlatform.setVelocityX(platformSpeed); // Move right
    }

    if (Phaser.Input.Keyboard.JustDown(spaceBar)) {
        if (velocityLocked[0]) {
            if (velocityLocked[1]) { 
                player.setVelocityY((-(lengthOfVert/100)*((tempLength-80)-verticalSlider.y)*.05) - 50); 
                player.setVelocityX((-((lengthOfHor/200)*((tempWidth/2)-horizontalSlider.x)*.02))); 
                velocityLocked[0] = false;
                velocityLocked[1] = false;
                verticalSlider.setVelocityY(sliderSpeed);
                horizontalSlider.setVelocityX(sliderSpeed*1.5);
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


    if (verticalSlider.y >= (tempLength - 95)) {
        verticalSlider.setVelocityY(-sliderSpeed); // Move left
    } else if (verticalSlider.y <= (tempLength/2 - ((tempLength - 100)/2))) {
        verticalSlider.setVelocityY(sliderSpeed); // Move right
    }

    if (horizontalSlider.x >= (tempWidth - 95)) {
        horizontalSlider.setVelocityX(-sliderSpeed*1.5); // Move left
    } else if (horizontalSlider.x <= (tempWidth/2 - ((tempWidth - 100)/2))) {
        horizontalSlider.setVelocityX(sliderSpeed*1.5); // Move right
    }

}