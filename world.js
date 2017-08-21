/***** WORLD *****/
var world = new function(){
  buffer = new nvArray3D(100, 100, 16, tiles["Air"]);

  this.updateBuffer = function(){
    //update the buffer based on player position
  }

  this.init = function(){
    //create random world
    this.genDirt();
    this.genGrass();
    this.genLakes();
    this.genPineTrees();
  }

  this.genDirt = function(){
    for(var az = 0; az < 7; az++){
      for(var ay = 0; ay < 100; ay++){
        for(var ax = 0; ax < 100; ax++){
          buffer[ax][ay][az] = tiles["Dirt"];
        }
      }
    }
  }

  this.genGrass = function(){
    for(var ay = 0; ay < 100; ay++){
      for(var ax = 0; ax < 100; ax++){
        buffer[ax][ay][7] = tiles["Grass"];
      }
    }
  }

  this.genLakes = function(){
    var numLakes = nvRand(5) + 5;

    for(var a = 0; a < numLakes; a++){
      var x = nvRand(100);
      var y = nvRand(100);
      var lakeWidth = nvRand(10) + 5;
      var lakeHeight = nvRand(10) + 5;
      for(var ay = 0; ay < lakeHeight; ay++){
        for(var ax = 0; ax < lakeWidth; ax++){
          if(ax + x >= 0 && ax + x < 100 && ay + y >= 0 && ay + y < 100)
            buffer[ax + x][ay + y][7] = tiles["Water"];
        }
      }
    }
  }

  this.genPineTrees = function(){
    var numTrees = nvRand(500);

    for(var a = 0; a < numTrees; a++){
      var x = nvRand(100);
      var y = nvRand(100);
      if(buffer[x][y][7] != tiles["Water"])
        buffer[x][y][8] = tiles["Pine"];
    }
  }

  this.getTile = function(x, y){
    //return the tile at this x y location
  }

  this.collisionAt = function(x, y, z){
    if(x < 0 || x >= 100 || y < 0 || y >= 100)
      return true;
    else if(buffer[x][y][z].collidable)
      return true;
  }

  this.draw = function(){
    var drawX = display.drawXOffset;
    var drawY = display.drawYOffset;

    for(var az = player.z - 1; az <= player.z; az++){
      for(var ay = player.y - display.yTileOffset; ay <= player.y + display.yTileOffset; ay++){
        for(var ax = player.x - display.xTileOffset; ax <= player.x + display.xTileOffset; ax++){
          if(ax >= 0 && ax < 100 && ay >= 0 && ay < 100 && buffer[ax][ay][az] != tiles["Air"]){
            buffer[ax][ay][az].draw(drawX, drawY);
            if(buffer[ax][ay][az].hasShadows)
              this.drawShadows(ax, ay, az, drawX, drawY);
          }
          drawX += 32;
        }
        drawX = display.drawXOffset;
        drawY += 32;
      }
      drawX = display.drawXOffset;
      drawY = display.drawYOffset;
    }
  }

  this.drawShadows = function(x, y, z, screenX, screenY){
    if(y - 1 >= 0)
      if(buffer[x][y - 1][z] == tiles["Air"])
        display.context.drawImage(display.sprites, 0, 32, 32, 32, screenX, screenY - 32, 32, 32);
    if(x + 1 < 100)
      if(buffer[x + 1][y][z] == tiles["Air"])
        display.context.drawImage(display.sprites, 32, 32, 32, 32, screenX + 32, screenY, 32, 32);
    if(y + 1 < 100)
      if(buffer[x][y + 1][z] == tiles["Air"])
        display.context.drawImage(display.sprites, 64, 32, 32, 32, screenX, screenY + 32, 32, 32);
    if(x - 1 >= 0)
      if(buffer[x - 1][y][z] == tiles["Air"])
        display.context.drawImage(display.sprites, 96, 32, 32, 32, screenX - 32, screenY, 32, 32);

  }

}
