var maxCount; // max count of the squares
var currentCount = 1;
var x = [];
var y = [];
var r = [];
var x2 = [];
var y2 = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  maxCount = height;
  colorMode(HSB, 360, 100, 100, 100);
  background(0)
  //first square
  x[0] = width / 2;
  y[0] = height / 2;
  r[0] = 50;
  //frameRate(30);
}

function draw() {
  background(0, 1);
  grid();
  pixelGrowth();
}

function pixelGrowth(){
  // create a random set of parameters
  var newR = random(1, 7);
  var newX = random(newR, width - newR);
  var newY = random(newR, height - newR);

  var closestDist = Number.MAX_VALUE;
  var closestIndex = 0;
  // which circle is the closest?
  for (var i = 0; i < currentCount; i++) {
    var newDist = dist(newX, newY, x[i], y[i]);
    if (newDist < closestDist) {
      closestDist = newDist;
      closestIndex = i;
    }
  }
  
  // align it to the closest circle outline
  var angle = atan2(newY - y[closestIndex], newX - x[closestIndex]);

  x2[currentCount] = newX;
  y2[currentCount] = newY;
  x[currentCount] = x[closestIndex] + cos(angle) * (r[closestIndex] + newR);
  y[currentCount] = y[closestIndex] + sin(angle) * (r[closestIndex] + newR);
  r[currentCount] = newR;
  currentCount++;


  for (var i = 0; i < currentCount; i++) {
    if (i == 0) {
      x[0] = mouseX
      y[0] = mouseY
      noStroke()
      fill(random(360), 100, random(100));
    } else {
      fill(120, 100, random(100));
    }
    rectMode(CENTER)
    rect(x[i], y[i], r[i] * 2, r[i] * 2);
  }

  if (currentCount >= maxCount){
    currentCount = 1;
  x[0] = random(width);
  y[0] = random(height);
  r[0] = random(50,100);
    //maxCount = random(100,1000);
  }
}

function grid(){
  if (frameCount%30 == 0){
  var tileCount = (20);
  for (var gridY = 0; gridY < tileCount; gridY++) {
    for (var gridX = 0; gridX < tileCount; gridX++) {
      var posX = width / tileCount * gridX;
      var posY = height / tileCount * gridY;
      var toggle = int(random(0, 3));
      
      if (toggle == 0) {
        for (let j = 0; j < 10; j++){
          noFill();
          stroke(random(255));
          circle(posX, posY, random(5,10)*j);
        }
      }
      
      if (toggle == 1){
        strokeWeight(random(5));
        stroke(300, 100, 100)
        line(posX, posY, posX + width/tileCount, posY);
      }
    }
   }
  }
}