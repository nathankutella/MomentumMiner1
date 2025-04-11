class Universal extends Phaser.Scene {
    constructor() {
      super('Universal');
    }
  
    preload() {
      this.load.image('bomb', 'assets/bomb.png');

    }
  
    create() {
      // Create map and layers
      const map = this.make.tilemap({ key: 'map' });
      const tileset = map.addTilesetImage('tileset', 'tiles');
      const layer = map.createLayer('Tile Layer 1', tileset, 0, 0);
    }
  
    update() {
      // Map-specific logic (e.g., player interaction with this map)

      //Possible moving platforms
    }
  }


  //Shows pause / rewind - shows menus - shows slider - shows player model