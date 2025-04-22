export class MapScene extends Phaser.Scene {

    constructor() {
      super('MapScene');
      this.level = 1;

      this.slidersMovement = [-1, -1]
      this.levelPRs = [null]
      this.level = 1;
      this.elapsedTime;
      this.startTime;

      this.menuText 
      this.screenClicked = false;

      this.map;
      this.tileset;
      this.bg;
      this.shading;
      this.chest;
      this.layer;
      this.water;
      this.cosmetics;
      this.spikes;

      this.player;
      this.stars;
      this.cursors;
      this.timerText;
      this.horizontalSlider;
      this.verticalSlider;
      this.velocityLocked = [false, false]

      this.spikeTimer = null;
      this.inSpike = false;

      // this.startTime;

      this.allMoves = [];
      this.hasMoved = true;

      this.platformSpeed = 100;
      this.sliderSpeed = 450;
      this.universalScale = (window.innerWidth*.96) / 320
      this.gravity = 350;    
      this.score = 0;

      this.viewMap = false;
      this.playerInMap = true;

    }

    init(data) {
      if (data.level !== undefined) {
        this.level = data.level;
      }
    }
  
    preload() {
      this.load.image('star', 'assets/star.png');
      this.load.spritesheet('dude', 'assets/miner.png',
          { frameWidth: 32, frameHeight: 32  }
      );
      this.load.image("tiles", "assets/tileset.png");
      this.load.tilemapTiledJSON("map1", "assets/map1.tmj");
      this.load.tilemapTiledJSON("map2", "assets/map2.tmj");
      this.load.image('bomb', 'assets/bomb.png');
      this.load.image('rewind', 'assets/rewind.png');
      this.load.image('pause', 'assets/pause.png');

    }
  
    create() {
      if (this.level == 1){
        this.map = this.make.tilemap({ key: "map1" });
      } else if (this.level == 2){
        this.map = this.make.tilemap({ key: "map2" });
      } else {
        this.map = this.make.tilemap({ key: "map1" });
      }
        

        // console.log(map.tilesets);

        this.tileset = this.map.addTilesetImage("MainTileSet", "tiles");    

        this.bg = this.map.createLayer("Background", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);
        this.shading = this.map.createLayer("Shading", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);
        this.chest = this.map.createLayer("Chests", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);
        this.layer = this.map.createLayer("Layer", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);
        this.water = this.map.createLayer("Slipery", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);   
        this.cosmetics = this.map.createLayer("Cosmetics", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);   
        this.spikes = this.map.createLayer("Spikes", this.tileset, 0, -640 * this.universalScale + window.innerHeight).setScale(this.universalScale, this.universalScale);


        this.chest.setCollisionByProperty({ collides: true });
        this.chest.setCollisionByExclusion([-1]);   

        this.spikes.setCollisionByProperty({ collides: true });
        this.spikes.setCollisionByExclusion([-1]);  

        this.layer.setCollisionByProperty({ collides: true });
        this.layer.setCollisionByExclusion([-1]);   



      this.player = this.physics.add.sprite(window.innerHeight*0.05, window.innerHeight - this.universalScale*64, 'dude').setScale( this.universalScale/2, this.universalScale/2);

      this.player.setBounce(0.2);
      this.player.setCollideWorldBounds(true);

      this.stars = this.physics.add.sprite(window.innerHeight*0.05, window.innerHeight - this.universalScale*64, 'star').setScale( this.universalScale/10, this.universalScale/5).setVisible(false);

      this.stars.setBounce(0);
      this.stars.setCollideWorldBounds(true);


      this.anims.create({
          key: 'left',
          // key: 'leftJump',
          frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 4 }),
          frameRate: 12,
          repeat: -1
      });

      this.anims.create({
        key: 'left',
        // key: 'leftJump',
        frames: this.anims.generateFrameNumbers('dude', { start: 4, end: 5 }),
        frameRate: 4,
        repeat: -1
    });

      this.anims.create({
          key: 'turn',
          frames: [ { key: 'dude', frame: 6 } ],
          frameRate: 20
      });   

      this.anims.create({
          key: 'right',
          frames: this.anims.generateFrameNumbers('dude', { start: 9, end: 13 }),
          frameRate: 12,
          repeat: -1
      });

     this.anims.create({
      key: 'rightJump',
      frames: this.anims.generateFrameNumbers('dude', { start: 7, end: 8 }),
      frameRate: 4,
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
      this.verticalSlider = this.physics.add.sprite(window.innerWidth - window.innerWidth*.065,window.innerHeight / 2 - window.innerHeight*.045, 'bomb').setScale((window.innerWidth*.96) / 2000*2, (window.innerWidth*.96) / 2000*2);
      this.verticalSlider.body.gravity.y = -this.gravity;
      this.verticalSlider.setVelocityY(this.slidersMovement[1]*(window.innerHeight*0.35));

      //Horizontal Ball
      this.horizontalSlider = this.physics.add.sprite(window.innerWidth / 2 - window.innerWidth*.045,  window.innerHeight - window.innerHeight*.068, 'bomb').setScale((window.innerHeight*.96) / 1000*2, (window.innerHeight*.96) / 1000*2);
      this.horizontalSlider.body.gravity.y = -this.gravity;
      this.horizontalSlider.setVelocityX(this.slidersMovement[1]*(window.innerWidth*0.35));

      this.player.setFrictionX(.1);
      this.player.setFrictionY(.1);

      var textSize = window.innerWidth*0.04;

      this.startTime = this.time.now;
      this.timerText = this.add.text(window.innerWidth*0.134, window.innerHeight*0.028, 'Time: 0s', { fontSize: textSize + 'px', color: '#FFFFFF' });


      let pause = this.add.image(window.innerWidth*0.04, window.innerWidth*0.04, 'pause').setInteractive().setScale(this.universalScale*1.25);
      let rewind = this.add.image(window.innerWidth*0.10, window.innerWidth*0.04, 'rewind').setInteractive().setScale(this.universalScale*1.25);

      var universalScaleText;

      if (innerWidth / 2000 > innerHeight / 1000) {
        universalScaleText = innerHeight / 1000;
      } else if (innerWidth < window.innerHeight / 1000) {
        universalScaleText = innerWidth / 2000;
      } else {
        universalScaleText = innerWidth / 2000;
      }

      this.menuText = this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.23, 'Press SPACE to stop sliders', { fontSize: universalScaleText * 50 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);



      setupButtonInteraction(pause);
      setupButtonInteraction(rewind);


      function setupButtonInteraction(button) {
        button.on('pointerover', () => {
          button.setTint(0xaaaaaa); // Darken
        });
      
        button.on('pointerout', () => {
          button.clearTint(); // Reset
        });
    
      }

      pause.on('pointerdown', () => {
        this.scene.launch('MenuScenes');
          console.log('Button clicked!');
      });


      rewind.on('pointerdown', () => {
          this.player.x = this.allMoves[this.allMoves.length-2][0];
          this.player.y = this.allMoves[this.allMoves.length-2][1];
          this.layer.x =  this.allMoves[this.allMoves.length-2][2];
          this.layer.y =  this.allMoves[this.allMoves.length-2][3];
          this.allMoves.pop();

          this.bg.x =        this.layer.x
          this.cosmetics.x = this.layer.x
          this.spikes.x =    this.layer.x
          this.water.x =    this.layer.x
          this.shading.x =   this.layer.x
          this.chest.x =     this.layer.x

          this.bg.y =        this.layer.y
          this.cosmetics.y = this.layer.y
          this.spikes.y =    this.layer.y
          this.water.y =   this.layer.y
          this.shading.y =   this.layer.y
          this.chest.y =     this.layer.y
          // // Add the functionality you want here
          // }
      });

      this.physics.add.collider(this.player, this.layer);
      this.physics.add.collider(this.stars,  this.layer);
      // this.physics.add.collider(player, spikes);

      this.physics.add.overlap(this.player, this.chest, this.onChestCollision, checkOverlap, this);
      this.physics.add.overlap(this.stars, this.spikes, this.onSpikeCollision, checkOverlap, this);


      function checkOverlap(colliders, tile) {
          // Ensure we're only detecting spikes
          return tile.index !== 0; // Make sure we're not detecting empty tiles
      }

      this.input.on('pointerdown', (pointer) => {
        if (pointer.x > window.innerWidth*0.05 && pointer.x < window.innerWidth*0.95 && pointer.y > window.innerHeight*0.075*this.universalScale && pointer.y < window.innerHeight*0.85) {
          this.screenClicked = true;
          console.log('Tapped within the specific area!');
        }
      });
  
    }

  onChestCollision(colliders, tile) {

    if (!tile || tile.index === 0 || tile.index === -1) return; 

    if (this.levelPRs[this.level-1] > this.elapsedTime || this.levelPRs[this.level-1] == null) {
        this.levelPRs[this.level-1] = this.elapsedTime;
    }
    this.startTime = this.time.now;



    this.layer.x = this.allMoves[0][2];
    this.layer.y = this.allMoves[0][3];
        // layer.x = map.x
    this.bg.x =        this.layer.x
    this.cosmetics.x = this.layer.x
    this.spikes.x =    this.layer.x
    this.water.x =    this.layer.x
    this.shading.x =   this.layer.x
    this.chest.x =     this.layer.x

    // layer.y = map.y
    this.bg.y =        this.layer.y
    this.cosmetics.y = this.layer.y
    this.spikes.y =    this.layer.y
    this.water.y =    this.layer.y
    this.shading.y =   this.layer.y
    this.chest.y =     this.layer.y


    this.player.x = this.allMoves[0][0];
    this.player.y = this.allMoves[0][1] - 10;
    this.allMoves.splice(1, this.allMoves.length);


    console.log("Congrats");
}

onSpikeCollision(colliders, tile) {

    if (!tile || tile.index === 0 || tile.index === -1) return; 

    this.player.x = this.allMoves[0][0];
    this.player.y = this.allMoves[0][1];
    this.layer.x =  this.allMoves[0][2];
    this.layer.y =  this.allMoves[0][3];
        // layer.x = map.x
    this.bg.x =        this.layer.x
    this.cosmetics.x = this.layer.x
    this.spikes.x =    this.layer.x
    this.shading.x =   this.layer.x
    this.chest.x =     this.layer.x

    // layer.y = map.y
    this.bg.y =        this.layer.y
    this.cosmetics.y = this.layer.y
    this.spikes.y =    this.layer.y
    this.shading.y =   this.layer.y
    this.chest.y =     this.layer.y

    this.startTime = this.startTime - 10000

    console.log("Player touched the exact center of the spike!");


}
  
    update() {
      this.elapsedTime = Math.floor((this.time.now - this.startTime) / 1000); // Convert to seconds
      this.timerText.setText('Time: ' + this.elapsedTime + 's' + '  PR: ' + this.levelPRs[this.level - 1]); // Update text

      this.cursors = this.input.keyboard.createCursorKeys();

      if (this.cursors.up.isDown && this.player.body.touching.down)
      {
        this.player.setVelocityY(-500);
      }

      if (this.player.body.blocked.down){
          if (this.hasMoved){
            this.allMoves.push([this.player.x, this.player.y, this.layer.x, this.layer.y]);
            this.hasMoved = false;
            if (this.allMoves.length > 2){
              this.menuText.setVisible(false);
            }
          }
          this.player.setVelocityX(0);
          this.stars.setVelocityY(-6);
          this.inSpike = false;
          this.player.anims.play('turn');  
      } else {
          this.stars.setVelocityY(0);
          this.stars.x = this.player.x 
          this.stars.y = this.player.y + this.universalScale*5
          if (this.player.body.velocity.x > 0){
              this.player.anims.play('right', true);
          } else if (this.player.body.velocity.x < 0){
            this.player.anims.play('left', true);
          } else {
            this.player.anims.play('turn');
          }
      }

      var mKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.M);

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

      if (this.playerInMap && !this.viewMap){
        if (Phaser.Input.Keyboard.JustDown(spaceBar) || this.screenClicked) {
          this.screenClicked = false;
            if (this.velocityLocked[0]) {
                if (this.velocityLocked[1]) { 
                    if (this.player.body.blocked.down){
                        this.player.setVelocityY(-Math.sqrt((this.universalScale*150000)*(((window.innerHeight*.845 - this.verticalSlider.y)/window.innerHeight*.795)))); 
                        // -(universalScale*64)
                        if ((((this.horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)) < 0){
                          this.player.setVelocityX(-Math.sqrt((this.universalScale*100000)*(-((this.horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)))); 
                            console.log(-Math.sqrt((this.universalScale*100000)*(-((this.horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325))) + 'horiz');
  
                        } else {
                          this.player.setVelocityX(Math.sqrt((this.universalScale*100000)*(((this.horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325)))); 
                            console.log(Math.sqrt((this.universalScale*100000)*(((this.horizontalSlider.x - window.innerWidth*.455)/window.innerWidth*.4325))) + 'horiz');
                        }
                        console.log(-Math.sqrt((this.universalScale*280)*(((window.innerHeight*.845 - this.verticalSlider.y)/window.innerHeight*.795))) + 'vert');
                        console.log(this.universalScale + 'scale');
                        this.velocityLocked[0] = false;
                        this.velocityLocked[1] = false;
  
                        this.verticalSlider.setVelocityY(  this.slidersMovement[0]*window.innerHeight*0.35);
                        this.horizontalSlider.setVelocityX(this.slidersMovement[1]*window.innerWidth*0.35);
                        this.hasMoved = true;
                    }
                } else {
                    this.horizontalSlider.setVelocityX(0);
                    this.velocityLocked[1] = true;
                }
            } else {
                this.verticalSlider.setVelocityY(0);  
                this.velocityLocked[0] = true;
            }
        }
      }
      
      if (this.velocityLocked[0]) {
          this.verticalSlider.setVelocityY(0);  
          if (this.velocityLocked[1]) { 
              this.horizontalSlider.setVelocityX(0);
          }
      } 
      if (this.verticalSlider.y >= (window.innerHeight*.845)) {
          this.slidersMovement[0] = -1;
          this.verticalSlider.setVelocityY(-(window.innerHeight*0.35)); // Move left
      } else if (this.verticalSlider.y <= (window.innerHeight*.065)) {
        this.slidersMovement[0] = 1;
        this.verticalSlider.setVelocityY(window.innerHeight*0.35); // Move right
      }
      if (this.horizontalSlider.x >= (window.innerWidth*.878)) {
          this.slidersMovement[1] = -1;
          this.horizontalSlider.setVelocityX(-(window.innerWidth*0.35)); // Move left
      } else if (this.horizontalSlider.x <= (window.innerWidth*.032)) {
          this.slidersMovement[1] = 1;
          this.horizontalSlider.setVelocityX(window.innerWidth*0.35); // Move right
      }

      if (Phaser.Input.Keyboard.JustDown(mKey)) {
        this.viewMap = !this.viewMap;
        if (this.viewMap){
          this.player.setCollideWorldBounds(false);
          this.stars.setCollideWorldBounds(false);
        }
      }

      if (!this.viewMap){

        // if (aKey.isDown) {
        //   this.player.setVelocityX(-200);
        // } else if (dKey.isDown) {
        //   this.player.setVelocityX(200);
        // }

        // if (wKey.isDown) {
        //   this.player.setVelocityY(-200);
        // } else if (sKey.isDown) {
        //   this.player.setVelocityY(200);
        // }

        // Move layer UP when player is below 75% of screen & layer hasn't reached max height
        if (this.player.y > window.innerHeight * 0.75 && this.layer.y > -640 * this.universalScale + window.innerHeight) {
            this.layer.y -= window.innerHeight * 0.03;
            if (this.playerInMap){
              this.player.y -= window.innerHeight * 0.03;
            }
            
        } 
        // Move layer DOWN when player is above 25% of screen & layer hasn't reached min height
        else if (this.player.y < window.innerHeight * 0.25 && this.layer.y < 0 - window.innerHeight * 0.03) {
            this.layer.y += window.innerHeight * 0.03;
            if (this.playerInMap){
              this.player.y += window.innerHeight * 0.03;
            }
        }

        // Move layer LEFT when player is near the right edge & hasn't reached max left position
        if (this.player.x > window.innerWidth * 0.75 && this.layer.x > -480 * this.universalScale  + window.innerWidth*.97) {
            this.layer.x -= window.innerWidth * 0.01;
            if (this.playerInMap){
            this.player.x -= window.innerWidth * 0.01;
            }
        } 
        // Move layer RIGHT when player is near the left edge & hasn't reached max right position
        else if (this.player.x < window.innerWidth * 0.25 && this.layer.x < 0) {
          this.layer.x += window.innerWidth * 0.01;
          this.playerInMap = true;
          if (this.playerInMap){
            this.player.x += window.innerWidth * 0.01;
          }
        }

        if (this.player.y < window.innerHeight * 0.9|| (this.layer.y == -640 * this.universalScale + window.innerHeight && this.player.y >= window.innerHeight * 0.9)){
          if (this.player.y > window.innerHeight * 0.1 || (this.layer.y < 0 - window.innerHeight * 0.03 && this.player.y <= window.innerHeight * 0.1)) {
            if (this.player.x < window.innerWidth * 0.9 || (this.layer.x > -480 * this.universalScale  + window.innerWidth*.97 && this.player.x >= window.innerWidth * 0.9)) {
              if (this.player.x > window.innerWidth * 0.1 || (this.layer.x == 0 && this.player.x <= window.innerWidth * 0.1)) {
                this.playerInMap = true;
                this.player.setCollideWorldBounds(true);
                this.stars.setCollideWorldBounds(true);
              }
            }
          }
        }

      } else {
        if (this.layer.y > -640 * this.universalScale + window.innerHeight) {
          if (sKey.isDown) {
            this.layer.y -= window.innerHeight * 0.03;
            this.player.y -= window.innerHeight * 0.03;
            this.stars.y -= window.innerHeight * 0.03;

          }
        }
        if (this.layer.y < 0 - window.innerHeight * 0.03){
          if (wKey.isDown) {
            this.layer.y += window.innerHeight * 0.03;
            this.player.y += window.innerHeight * 0.03;
            this.stars.y += window.innerHeight * 0.03;

          }
        }
        if (this.layer.x > -480 * this.universalScale  + window.innerWidth*.97) {
          if (dKey.isDown) {
            this.layer.x -= window.innerWidth * 0.01;
            this.player.x -= window.innerWidth * 0.01;
            this.stars.x -= window.innerWidth * 0.01;

          }
        } 
        if (this.layer.x < 0) {
          if (aKey.isDown) {
            this.layer.x += window.innerWidth * 0.01;
            this.player.x += window.innerWidth * 0.01;
            this.stars.x += window.innerWidth * 0.01;

          }
        }
      }
      


      // layer.x = map.x
      this.bg.x =        this.layer.x
      this.cosmetics.x = this.layer.x
      this.spikes.x =    this.layer.x
      this.water.x =    this.layer.x
      this.shading.x =   this.layer.x
      this.chest.x =     this.layer.x

      // layer.y = map.y
      this.bg.y =        this.layer.y
      this.cosmetics.y = this.layer.y
      this.spikes.y =    this.layer.y
      this.water.y =    this.layer.y
      this.shading.y =   this.layer.y
      this.chest.y =     this.layer.y
    }
  }



  // All layers - What each layer does - location of layers - 