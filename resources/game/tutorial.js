const World = function(canvas_id_tag){
  this.canvas = document.getElementById(canvas_id_tag);
  this.context = this.canvas.getContext("2d");

  this.clear = function(background_color="white"){
    this.context.beginPath();
    this.context.rect(0,0,640,480);
    this.context.fillStyle = background_color;
    this.context.fill();
  };

  this.newSprite = function(filename, is_pattern=true){
    var mySprite = new Sprite(filename, this, is_pattern=true);
    return mySprite;
  };
};

const Sprite = function(filename, world, is_pattern=true){
  switch(filename){
    case undefined: console.log("Unable to load Sprite: filename is undefined"); break;
    case null: console.log("Unable to load Sprite: filename is null"); break;
    case "": console.log("Unable to load sprite: filename is \"\""); break;
    default:
      break;
  }//endswitch

  this.image = new Image();
  this.image.src = filename;
  this.is_pattern = is_pattern;
  const TO_RADIANS = Math.PI/180

  if(is_pattern)
    this.pattern = world.context.createPattern(this.image, "repeat")

  this.draw = function(x, y, w=this.image.width, h=this.image.height){
    world.context.drawImage(this.image, x, y, w, h);
  }

  this.rotate = function(x, y, degrees){
    world.context.save();
    world.context.translate(x,y);
    world.context.rotate(degees * TO_RADIANS);
    world.context.drawImage(
      this.image,
      -(this.image.width/2),
      -(this.image.height/2)
    );
    world.context.restore();
  }

};

var isReady = false;
var world;
var myCanvas;
$(document).ready(function(){
  //Initialize
  world = new World("canvas");
  myCanvas = world.canvas;
  world.clear();

  const reddie = world.newSprite("./game/red_tile.png");
  reddie.image.onload = function(){
    reddie.draw(100, 100, 16, 16);
  };
  isReady = true;
});

$('#canvas').on('mousedown', function(e){
  const pos = getMousePos(canvas, e);
  mx = pos.x;
  my = pos.y
  console.log(mx, my);
  reddie.draw(mx % 16, my % 16, 16, 16);
});
function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}
