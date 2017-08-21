/***** PLAYER *****/
var player = new function(){
  var xDir = 0;
  var yDir = -1;
  var action = false;

  this.x = 0;
  this.y = 0;
  this.z = 8;

  this.inventory = [[null, 0], [null, 0], [null, 0], [null, 0], [null, 0]];
  this.inventoryIndex = 0;

  this.init = function(){
    nvIn.registerEvent("Turn East", 68, nvIn.SINGLE, this.turnEast);
    nvIn.registerEvent("Turn West", 65, nvIn.SINGLE, this.turnWest);
    nvIn.registerEvent("Turn North", 87, nvIn.SINGLE, this.turnNorth);
    nvIn.registerEvent("Turn South", 83, nvIn.SINGLE, this.turnSouth);
    nvIn.registerEvent("Action", 74, nvIn.SINGLE, this.toggleAction);
    nvIn.registerEvent("Action", 75, nvIn.SINGLE, this.cycleInventory);
  }

  this.turnNorth = function(){
    dirX = 0;
    dirY = -1;

    if(action)
      player.act();
    else
      player.move();
  }

  this.turnEast = function(){
    dirX = 1;
    dirY = 0;

    if(action)
      player.act();
    else
      player.move();
  }

  this.turnSouth = function(){
    dirX = 0;
    dirY = 1;

    if(action)
      player.act();
    else
      player.move();
  }

  this.turnWest = function(){
    dirX = -1;
    dirY = 0;

    if(action)
      player.act();
    else
      player.move();
  }

  this.move = function(){
    player.x += dirX;
    player.y += dirY;

    if(world.collisionAt(player.x, player.y, player.z)){
      player.x -= dirX;
      player.y -= dirY;
    }
  }

  this.toggleAction = function(){
    action = !action;
  }

  this.cycleInventory = function(){
    document.getElementById('slot' + (player.inventoryIndex + 1)).style.color = "#000";

    player.inventoryIndex++;
    if(player.inventoryIndex >= 5)
      player.inventoryIndex = 0;

    document.getElementById('slot' + (player.inventoryIndex + 1)).style.color = "#f00";
  }

  function addToInventory(tile){
    for(var a = 0; a < 5; a++){
      if(player.inventory[a][0] == tile && player.inventory[a][1] < 50){
        player.inventory[a][1]++;
        updateInventoryUI();
        return true;
      }
    }

    for(var a = 0; a < 5; a++){
      if(player.inventory[a][0] == null){
        player.inventory[a][0] = tile;
        player.inventory[a][1] = 1;
        updateInventoryUI();
        return true;
      }
    }

    return false;
  }

  function updateInventoryUI(){
    for(var a = 0; a < 5; a++){
      if(player.inventory[a][0] == null)
        document.getElementById('slot' + (a + 1)).innerText = "( )";
      else
        document.getElementById('slot' + (a + 1)).innerText = "(" + player.inventory[a][0].name + "/" + player.inventory[a][1] + ")";
    }
  }

  this.act = function(){
    if(buffer[player.x + dirX][player.y + dirY][player.z] == tiles["Air"])
      buffer[player.x + dirX][player.y + dirY][player.z] = tiles["Planks"];
    else{
      addToInventory(buffer[player.x + dirX][player.y + dirY][player.z]);
      buffer[player.x + dirX][player.y + dirY][player.z] = tiles["Air"];
    }
    action = false;
  }

  this.draw = function(){
    display.context.fillRect(display.width / 2 - 5, display.height / 2 - 5, 10, 10);
  }
}
