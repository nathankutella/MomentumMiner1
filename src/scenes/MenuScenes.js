export class MenuScenes extends Phaser.Scene {
    constructor() {
      super('MenuScenes');

      this.menu;
      this.cursors;
      this.universalScaleX = (window.innerWidth) / 2000
      this.universalScaleY = (window.innerHeight) / 1000



    }
  
    preload() {
      this.load.image('button', 'assets/button.png');
      this.load.image('close', 'assets/x.png');
      this.load.image('rewind', 'assets/rewind.png');
      this.load.image('menu', 'assets/menu.png');
      this.load.image('pause', 'assets/pause.png');
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

      this.menu = this.add.image(window.innerWidth*0.48,  window.innerHeight*0.48, 'menu').setInteractive().setScale(window.innerWidth / 400, window.innerHeight / 300);
      let button1 =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.43, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let button1Text = this.add.text(window.innerWidth*0.2, window.innerHeight* 0.375, 'MENU', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setShadow(5, 5, '#000000', 5);

      let button2 = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.58, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let button3 = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.73, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let menuText = this.add.text(window.innerWidth * 0.31, window.innerHeight * 0.13, 'MENU', { fontSize: universalScale * 300 + 'px', color: '#FFFFFF' }).setShadow(5, 5, '#000000', 5);

      let close = this.add.image(window.innerWidth*0.13,  window.innerHeight*0.15, 'close').setInteractive().setScale(window.innerWidth / 400, window.innerHeight / 300);
          close.on('pointerdown', () => {
          //   this.menu.setVisible(!this.menu.visible);
          // close.setVisible(!close.visible);
          // menuText.setVisible(!menuText.visible);
          // button1.setVisible(!button1.visible);
          // button2.setVisible(!button2.visible);
          // button3.setVisible(!button3.visible);
          this.scene.stop('MenuScenes');
      }); 


    }
  
    update() {
      // Map-specific logic (e.g., player interaction with this map)
      this.cursors = this.input.keyboard.createCursorKeys();

      //Possible moving platforms
    }
  }



  // Shows all parts of each menu - ex.) Background, exit, buttons, text - Controls what the different buttons do