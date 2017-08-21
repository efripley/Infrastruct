/***** APP *****/
var app = new function(){
  var frames = 0;
  var fps = nvId('fps');

  this.init = function(){
    setInterval(app.updateFPS, 1000);

    world.init();
    player.init();

    this.update();
  }

  this.update = function(){
    nvIn.eval();
    display.draw();

    frames++;
    setTimeout(app.update, 20);
  }

  this.updateFPS = function(){
    fps.innerText = frames;
    frames = 0;
  }
}

app.init();
