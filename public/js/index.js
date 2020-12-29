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

const ang = Math.PI / 4;
const rotMatrix = new Matriz2x2(Math.cos(ang), -Math.sin(ang), Math.sin(ang), Math.cos(ang)); 


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

  console.log(pos);

  let e;    
  while(e = keyboard.peekAndRemoveKeyEvents()){

    if(e.type=="keydown" && e.key== "r"){
      pos = rotMatrix.multiplicaVetor(pos);
    }

  }
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