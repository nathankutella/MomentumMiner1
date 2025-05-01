export class Universal extends Phaser.Scene {
    constructor() {
      super('Universal');

      this.menu;
      this.cursors;
      this.universalScaleX = (window.innerWidth) / 2000
      this.universalScaleY = (window.innerHeight) / 1000
    }
  
    preload() {
      this.load.image('button', 'assets/button.png');
      this.load.image('close', 'assets/x.png');
      this.load.image('menu', 'assets/menubackground.png');
      this.load.image('pause', 'assets/pause.png');
      this.load.image('smallbutton', 'assets/square.png');
      this.load.image('title', 'assets/gameTitle.png');
      this.load.image('char', 'assets/rightCharacter.png');

    }
  
    create() {
      var universalScale;
      if (this.universalScaleX > this.universalScaleY) {
        universalScale = this.universalScaleY;
      } else if (this.universalScaleX < this.universalScaleY) {
        universalScale = this.universalScaleX;
      } else {
        universalScale = this.universalScaleX;
      }

      this.title = this.add.image(window.innerWidth*0.38,  window.innerHeight*0.2, 'title').setInteractive().setScale(universalScale * 12, universalScale * 12);
      this.title = this.add.image(window.innerWidth*0.78,  window.innerHeight*0.2, 'char').setInteractive().setScale(-universalScale * 1.5, universalScale * 1.5);


      this.menu = this.add.image(window.innerWidth*0.48,  window.innerHeight*0.68, 'menu').setInteractive().setScale(window.innerWidth / 450, window.innerHeight / 450);


      let usernameButton =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.53, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let usernameText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.53, 'Username', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      
      let passwordButton = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.68, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let passwordText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.68, 'Password', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let logInButton = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.83, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let logInText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.83, 'LOG IN', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      setupButtonInteraction(usernameButton);
      setupButtonInteraction(passwordButton);
      setupButtonInteraction(logInButton);

      function setupButtonInteraction(button) {
        button.on('pointerover', () => {
          button.setTint(0xaaaaaa); // Darken
        });
      
        button.on('pointerout', () => {
          button.clearTint(); // Reset
        });
    
      }

      logInButton.on('pointerdown', () => {
      this.scene.stop('Universal'); 
      this.scene.start('MapScene', { level: 1});
        });

      // this.scene.stop('Universal'); 
      // this.scene.start('MapScene', { level: 1});
    }
  
    update() {
      // Map-specific logic (e.g., player interaction with this map)
      this.cursors = this.input.keyboard.createCursorKeys();

      //Possible moving platforms
    }
  }



  // Shows all parts of each menu - ex.) Background, exit, buttons, text - Controls what the different buttons do