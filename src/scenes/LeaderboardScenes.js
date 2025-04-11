class LeaderboardScenes extends Phaser.Scene {
    constructor() {
      super('LeaderboardScenes');
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
      this.cursors = this.input.keyboard.createCursorKeys();

      //Possible moving platforms
    }
  }


  // 1 per level
  // All layers of leaderboard - all names correct - all times correct - can exit out of it - visibility