let BUBBLE_EFFECT_WIDTH = window.innerWidth - 50;
let BUBBLE_EFFECT_HEIGHT = window.innerHeight;
const NUMBER_OF_BUBBLES = 70;
const RADIUS = 25;
const DIAMETER = 2*RADIUS;
const BUBBLE_SIZE_STYLE = `width:${DIAMETER}px;height:${DIAMETER}px;`;
const BUBBLE_COLORS = ["yellow", "magenta", "cyan"];

let bubbleArray = [];

let getRandomNumber = (min,max) => {
  return Math.random() * (max - min).toFixed(2) + min;
}

let Bubble = class {
  constructor(id, pos) {
    this.domElement = document.getElementById(id);
    this.domElement.style = BUBBLE_SIZE_STYLE;
    this.pos = pos;
    this.vel = {
      "x": getRandomNumber(-10,10),//getRandomNumber(-2,2),
      "y": getRandomNumber(0,30)
    };
    this.center = {
      "x": pos.x + RADIUS,
      "y": pos.y + RADIUS
    };

    this.setPos(pos);
  };
  
  getPos() {
    return this.pos;
  };
  
  getVel() {
    return this.vel;
  };
  
  getCenter() {
    return this.center;
  };
  
  setPos(newPos) {
    this.pos = newPos;
    this.setCenter();
    
    this.domElement.style.left = this.pos.x + "px";
    this.domElement.style.top = this.pos.y + "px";
    
    return this.pos;
  };
  
  setVel(newVel) {
    this.vel = newVel;
    return this.vel;
  };
  
  setCenter() {
    this.center.x = this.pos.x + RADIUS;
    this.center.y = this.pos.y + RADIUS;
    
    return this.center;
  };
  
  changeVelocity(changeVector) {
    this.vel.x += changeVector.x;
    this.vel.y += changeVector.y;
    
    return this.vel;
  };
  
  reduceVelocity() {
    let speed = Math.sqrt(Math.pow(this.vel.x,2)+Math.pow(this.vel.y,2));
    if(speed > 1) {
      this.vel.x -= 0.03 * this.vel.x;
      this.vel.y -= 0.03 * this.vel.y; 
    }
  };
  
  moveBubble() {
    const newPos = {
      "x": this.pos.x + this.vel.x,
      "y": this.pos.y + this.vel.y
    }
    
    this.setPos(newPos);
    
    if((this.center.x-RADIUS < 0 && this.center.x > 0) || (this.center.x+RADIUS > BUBBLE_EFFECT_WIDTH && this.center.x < BUBBLE_EFFECT_WIDTH)) {
      this.vel.x = -this.vel.x;
    }
    
    if((this.center.y-RADIUS < 0 && this.center.y > 0) || (this.center.y+RADIUS > BUBBLE_EFFECT_HEIGHT && this.center.y < BUBBLE_EFFECT_HEIGHT)) {
      this.vel.y = -this.vel.y;
    }
    
    return this.pos; 
  }
  
};

let calcDistanceBetween = (pos1, pos2)=>{
  return Math.sqrt(Math.pow(pos1.x-pos2.x,2) + Math.pow(pos1.y-pos2.y,2));
};

let calcResponseVector = (pos1, pos2)=>{
  let response = {
    "x": 0,
    "y": 0
  };
  const normalizationFactor = calcDistanceBetween(pos1, pos2);
  
  response = {
    "x": ((pos2.x - pos1.x) / normalizationFactor) * 1,
    "y": ((pos2.y - pos1.y) / normalizationFactor) * 1
  }
  
  return response;
};

const buildDomElement = (id, color)=>{
  let bubbleDiv = document.createElement("div");
  bubbleDiv.setAttribute("id", id);
  switch(color) {
    case "yellow":
      bubbleDiv.className = "bubble bubble--yellow";
      break;
    case "magenta":
      bubbleDiv.className = "bubble bubble--magenta";
      break;
    case "cyan":
      bubbleDiv.className = "bubble bubble--cyan";
      break;
  }
  
  document.querySelector(".bubble-container").append(bubbleDiv);
  
  return bubbleDiv;
};

const buildBubbles = (numberOfBubbles)=>{
  for(var i=1; i<=numberOfBubbles; i++) {
    const bubbleId = "bubble" + i;
    const color = BUBBLE_COLORS[i%BUBBLE_COLORS.length];
    
    buildDomElement(bubbleId, color);
    
    const initialPos = {
      "x": getRandomNumber(50, BUBBLE_EFFECT_WIDTH-50),
      "y": getRandomNumber(50, 100)//BUBBLE_EFFECT_HEIGHT-50)
    }
    bubbleArray.push(new Bubble(bubbleId, initialPos));
  }
};

//BEGIN CODE TO TEST CONTRUCTORS AND MAIN FUNCTIONALITY CODE
buildBubbles(NUMBER_OF_BUBBLES);

window.setInterval(()=>{
  for(var i=0; i<bubbleArray.length; i++) {
    bubbleArray[i].moveBubble();
    bubbleArray[i].reduceVelocity();
  }

}, 30);

window.onresize = function(event) {
  BUBBLE_EFFECT_WIDTH = window.innerWidth;
  BUBBLE_EFFECT_HEIGHT = window.innerHeight;
}

document.onmousemove = function(event) {
  let cursorPos = {
    "x": event.clientX,
    "y": event.clientY
  };

  for(var i=0; i<bubbleArray.length; i++) {
    let distance = calcDistanceBetween(cursorPos, bubbleArray[i].getCenter());
  
    if(distance < RADIUS + 75 && distance > RADIUS - 2) {
      let responseVector = calcResponseVector(cursorPos, bubbleArray[i].getCenter());
      
      bubbleArray[i].changeVelocity(responseVector); 
    }  
  }
  
}