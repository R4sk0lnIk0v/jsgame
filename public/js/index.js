const ShaderHandler = require("../../modules/ShaderHandler");
const Keyboard = require("../../modules/Keyboard");
const Matriz2x2 = require("../../modules/Matriz2x2");
const Vetor2D = require("../../modules/Vetor2D");
const { SingleEntryPlugin } = require("webpack");

const shader = new ShaderHandler();
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

let image = new Image();
image.src = __dirname + "/../../assets/cyberpunk.png";
image.onload = () => {
  let canvas = document.querySelector("#canvas");
  let gl = canvas.getContext("webgl2");
  if (!gl) {
    return;
  }

  shader.renderAsset(gl, image);
  // window.addEventListener('resize', shader.renderAsset(image));

  setInterval(function(){ main(key);}, 100);
};