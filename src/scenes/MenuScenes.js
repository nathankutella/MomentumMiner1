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
      this.load.image('menu', 'assets/menu.png');
      this.load.image('pause', 'assets/pause.png');
      this.load.image('smallbutton', 'assets/square.png');

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
      let homeButton =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.43, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let homeText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.43, 'Home', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);


      let levelButton = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.58, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let levelText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.58, 'Levels', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let leaderboardButton = this.add.image(window.innerWidth*0.48, window.innerHeight* 0.73, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 420);
      let leaderboardText = this.add.text(window.innerWidth*0.48, window.innerHeight* 0.73, 'Leaderboards', { fontSize: universalScale * 150 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let menuText = this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.23, 'MENU', { fontSize: universalScale * 300 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let close = this.add.image(window.innerWidth*0.15,  window.innerHeight*0.17, 'close').setInteractive().setScale(window.innerWidth / 200, window.innerHeight / 150);
          close.on('pointerdown', () => {
      if (levelsGroup.visible || leaderboardsGroup.visible){
        leaderboardsGroup.setVisible(false);
        levelsGroup.setVisible(false);
        menuGroup.setVisible(true);  
      } else {
        this.scene.stop('MenuScenes');
      }
      }); 

      let back = this.add.image(window.innerWidth*0.15,  window.innerHeight*0.79, 'close').setInteractive().setScale(window.innerWidth / 200, window.innerHeight / 150);
      back.on('pointerdown', () => {

      }); 
      let next = this.add.image(window.innerWidth*0.81,  window.innerHeight*0.79, 'close').setInteractive().setScale(window.innerWidth / 200, window.innerHeight / 150);
      back.on('pointerdown', () => {

      }); 

      let level0Text = this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.23, 'LEVELS', { fontSize: universalScale * 300 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let level1Button =    this.add.image(window.innerWidth*0.20, window.innerHeight* 0.45, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level1Text = this.add.text(window.innerWidth*0.20, window.innerHeight* 0.45, '1', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level2Button =    this.add.image(window.innerWidth*0.39, window.innerHeight* 0.45, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level2Text = this.add.text(window.innerWidth*0.39, window.innerHeight* 0.45, '2', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level3Button =    this.add.image(window.innerWidth*0.58, window.innerHeight* 0.45, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level3Text = this.add.text(window.innerWidth*0.58, window.innerHeight* 0.45, '3', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level4Button =    this.add.image(window.innerWidth*0.77, window.innerHeight* 0.45, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level4Text = this.add.text(window.innerWidth*0.77, window.innerHeight* 0.45, '4', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level5Button =    this.add.image(window.innerWidth*0.20, window.innerHeight* 0.64, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level5Text = this.add.text(window.innerWidth*0.20, window.innerHeight* 0.64, '5', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level6Button =    this.add.image(window.innerWidth*0.39, window.innerHeight* 0.64, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level6Text = this.add.text(window.innerWidth*0.39, window.innerHeight* 0.64, '6', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level7Button =    this.add.image(window.innerWidth*0.58, window.innerHeight* 0.64, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level7Text = this.add.text(window.innerWidth*0.58, window.innerHeight* 0.64, '7', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);
      let level8Button =    this.add.image(window.innerWidth*0.77, window.innerHeight* 0.64, 'smallbutton').setInteractive().setScale(window.innerWidth / 80, window.innerHeight / 100);
      let level8Text = this.add.text(window.innerWidth*0.77, window.innerHeight* 0.64, '8', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let leaderboard0Text = this.add.text(window.innerWidth * 0.48, window.innerHeight * 0.23, 'RECORDS', { fontSize: universalScale * 250 + 'px', color: '#FFFFFF' }).setOrigin(0.5).setShadow(5, 5, '#000000', 5);

      let leaderboard1Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.35, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard1Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.35, '#1:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard2Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.42, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard2Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.42, '#2:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard3Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.49, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard3Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.49, '#3:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard4Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.56, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard4Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.56, '#4:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard5Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.63, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard5Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.63, '#5:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard6Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.70, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboard6Text = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.70, '#6:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);
      let leaderboard7Button =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.745, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 10000);
      let leaderboardUserButton =    this.add.image(window.innerWidth*0.48, window.innerHeight* 0.79, 'button').setInteractive().setScale(window.innerWidth / 480, window.innerHeight / 1000);
      let leaderboardUserText = this.add.text(window.innerWidth*0.18, window.innerHeight* 0.79, 'User:', { fontSize: universalScale * 80 + 'px', color: '#FFFFFF' }).setOrigin(0, 0.5).setShadow(5, 5, '#000000', 5);





      let menuGroup = this.add.container(0, 0, [
        homeButton, homeText,
        levelButton, levelText,
        leaderboardButton, leaderboardText,
        menuText
      ]);
      let levelsGroup = this.add.container(0, 0, [
        level1Button, level1Text,
        level2Button, level2Text,
        level3Button, level3Text,
        level4Button, level4Text,
        level5Button, level5Text,
        level6Button, level6Text,
        level7Button, level7Text,
        level8Button, level8Text,
        level0Text, back, next
      ]);
      let leaderboardsGroup = this.add.container(0, 0, [
        leaderboard1Button, leaderboard1Text,
        leaderboard2Button, leaderboard2Text,
        leaderboard3Button, leaderboard3Text,
        leaderboard4Button, leaderboard4Text,
        leaderboard5Button, leaderboard5Text,
        leaderboard6Button, leaderboard6Text,
        leaderboard7Button,
        leaderboardUserButton, leaderboardUserText,
        leaderboard0Text
      ]);

      levelsGroup.setVisible(false);
      leaderboardsGroup.setVisible(false);



      setupButtonInteraction(homeButton);
      setupButtonInteraction(levelButton);
      setupButtonInteraction(leaderboardButton);

      setupButtonInteraction(back);
      setupButtonInteraction(next);

      setupButtonInteraction(level1Button);
      setupButtonInteraction(level2Button);
      setupButtonInteraction(level3Button);
      setupButtonInteraction(level4Button);
      setupButtonInteraction(level5Button);
      setupButtonInteraction(level6Button); 
      setupButtonInteraction(level7Button);
      setupButtonInteraction(level8Button);


      // setupButtonInteraction(leaderboard1Button);
      // setupButtonInteraction(leaderboard2Button);
      // setupButtonInteraction(leaderboard3Button);
      // setupButtonInteraction(leaderboard4Button);
      // setupButtonInteraction(leaderboard5Button);
      // setupButtonInteraction(leaderboard6Button); 
      // setupButtonInteraction(leaderboard7Button);
      // setupButtonInteraction(leaderboard8Button);

      setupButtonInteraction(close  );


      function setupButtonInteraction(button) {
        button.on('pointerover', () => {
          button.setTint(0xaaaaaa); // Darken
        });
      
        button.on('pointerout', () => {
          button.clearTint(); // Reset
        });
    
      }

      homeButton.on('pointerdown', () => {
          console.log('Button clicked!');
      });
      levelButton.on('pointerdown', () => {
        levelsGroup.setVisible(true);
        menuGroup.setVisible(false);
        });

      leaderboardButton.on('pointerdown', () => {
        leaderboardsGroup.setVisible(true);
        menuGroup.setVisible(false);
      });

      level1Button.on('pointerdown', () => {
        this.scene.stop('MapScene'); 
        this.scene.stop('MenuScene'); 
        this.scene.start('MapScene', { level: 1});

      });

      level2Button.on('pointerdown', () => {
        this.scene.stop('MapScene'); 
        this.scene.stop('MenuScene'); 
        this.scene.start('MapScene', { level: 2});

      });

    }
  
    update() {
      // Map-specific logic (e.g., player interaction with this map)
      this.cursors = this.input.keyboard.createCursorKeys();

      //Possible moving platforms
    }
  }



  // Shows all parts of each menu - ex.) Background, exit, buttons, text - Controls what the different buttons do