function Tile(argId, argName, argCollidable, argHasShadows, argValue, argItemDrops, imageX, imageY){
  this.id = argId; //id number
  this.name = argName; //string
  this.collidable = argCollidable; //true or false
  this.hasShadows = argHasShadows; //true of false
  this.value = argValue; // number
  this.itemDrops = argItemDrops; //array of string/number pairs
  this.imageX = imageX; //x coordinate number for sprite
  this.imageY = imageY; //y coordinate number for sprite

  this.draw = function(screenX, screenY){
    display.context.drawImage(display.sprites, imageX, imageY, 32, 32, screenX, screenY, 32, 32);
  }
}

var tiles = new Array();

tiles["Air"] = new Tile(0, "Air", false, false, 0, null, 0, 0);
tiles["Dirt"] = new Tile(1, "Dirt", true, true, 1, ["Dirt", 1], 32, 0);
tiles["Grass"] = new Tile(2, "Grass", true, true, 1, ["Grass", 1], 64, 0);
tiles["Sand"] = new Tile(3, "Sand", true, true, 1, ["Sand", 1], 96, 0);
tiles["Water"] = new Tile(4, "Water", false, false, 1, ["Water", 1], 128, 0);
tiles["Pine"] = new Tile(5, "Pine Tree", true, false, 3, ["Planks", 8], 160, 0);
tiles["Oak"] = new Tile(6, "Oak Tree", true, false, 3, ["Planks", 10], 192, 0);
tiles["Aspen"] = new Tile(7, "Aspen Tree", true, false, 3, ["Planks", 6], 224, 0);
tiles["Asphalt"] = new Tile(8, "Asphalt", true, true, 9, ["Asphalt", 1], 256, 0);
tiles["Planks"] = new Tile(9, "Wood Planks", true, true, ["Planks", 1], 15, 288, 0);

