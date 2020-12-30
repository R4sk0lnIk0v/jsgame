const Keyboard = require("../../modules/Keyboard");
const AssetObject = require("../../modules/AssetObject");
const Matriz2x2 = require("../../modules/Matriz2x2");
const Vetor2D = require("../../modules/Vetor2D");

const key = new Keyboard(document);

var pos = new Vetor2D(0, 0);

const velX = new Vetor2D(1, 0);
const velY = new Vetor2D(0, 1);

const ang = Math.PI / 2;
const ang2 = Math.PI / 2;
const rotMatrixPos = new Matriz2x2(Math.cos(ang), -Math.sin(ang), Math.sin(ang), Math.cos(ang)); 
const rotMatrixNeg = new Matriz2x2(Math.cos(ang2), -Math.sin(ang2), Math.sin(ang2), Math.cos(ang2)); 

const rotMatrix = rotMatrixPos.multiplicaMatriz(rotMatrixNeg);

function main(keyboard) {
  
  if(keyboard.isKeyPressed('W')){
    pos = pos.soma(velY);
  }
  if(keyboard.isKeyPressed('S')){
    pos = pos.subtrai(velY);
  }  
  if(keyboard.isKeyPressed('D')){
    pos = pos.soma(velX);
  }
  if(keyboard.isKeyPressed('A')){
    pos = pos.subtrai(velX);
  }
  
  let e;    
  while(e = keyboard.peekAndRemoveKeyEvents()){

    if(e.type=="keydown" && e.key== "r"){
      pos = rotMatrix.multiplicaVetor(pos);
    }

  }

  console.log(pos);
}

let canvas = document.querySelector("#canvas");
let gl = canvas.getContext("webgl2");
if (gl) {
  let galinha = new AssetObject(gl, __dirname + "/../../assets/galinha.png", 75, 100, "galinha", 300, 30, 0, 0, 1, 1);
  let galo = new AssetObject(gl, __dirname + "/../../assets/Galo.png", 85, 125, "galo", 45, 30, 0, 0, 1, 1);
  galinha.renderObject();
  galo.renderObject();

  setTimeout(()=>{
    galo.updateObjectPosition(100, 30);
    galinha.updateObjectPosition(200, 30);
  },5000);
}

setInterval(function(){ main(key);}, 100);