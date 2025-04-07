class MenuScenes extends Phaser.Scene {
    constructor() {
      super('MenuScenes');
    }
  
    preload() {
      // Load map-specific assets here (tilemap JSON, tileset images)
      this.load.tilemapTiledJSON('map', 'assets/map1.json');
      this.load.image('tiles', 'assets/tileset.png');
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



  // Shows all parts of each menu - ex.) Background, exit, buttons, text - Controls what the different buttons do