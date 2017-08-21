/***** DISPLAY *****/
var display = new function(){
  var canvas = document.getElementById('canvas');
  this.context = canvas.getContext('2d');
  this.sprites = nvId('sprites');
  this.width = window.innerWidth - 2;
  this.height = window.innerHeight - 2;
  this.xTileOffset = parseInt((this.width + 32) / 64);
  this.yTileOffset = parseInt((this.height + 32) / 64);
  var drawWidth = this.xTileOffset * 32 * 2 + 32;
  var drawHeight = this.yTileOffset * 32 * 2 + 32;
  this.drawXOffset = parseInt((this.width - drawWidth) / 2);
  this.drawYOffset = parseInt((this.height - drawHeight) / 2);
  canvas.width = this.width;
  canvas.height = this.height;

  this.draw = function(){
    this.context.clearRect(0, 0, this.width, this.height);
    world.draw();
    player.draw();
  }
}
