const ShaderHandler = require("../../modules/ShaderHandler");
const Keyboard = require("../../modules/Keyboard");
const Matriz2x2 = require("../../modules/Matriz2x2");
const Vetor2D = require("../../modules/Vetor2D");

const Character = require("../../modules/Character");

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

persArthur = new Character(new Vetor2D(0, 0), 15, 80);

function main(keyboard) {
  
  persArthur.tick();

  let e;    
  while(e = keyboard.peekAndRemoveKeyEvents()){
    if(e.type=="keydown"){
      switch(e.key){
        case 'w':
        case 'ArrowUp':
          persArthur.andarCima();
          break;
        case 's':
        case 'ArrowDown':
          persArthur.andarBaixo();
          break;
        case 'd':
        case 'ArrowRight':
          persArthur.andarDireita(); 
          break;
        case 'a':
        case 'ArrowLeft':
          persArthur.andarEsquerda();
          break;
        default:
      }
    }
    
    if(e.type=="keyup"){
      switch(e.key){
        case 'w':            
        case 's':
        case 'd':
        case 'a':
        case 'ArrowUp':
        case 'ArrowDown':
        case 'ArrowRight':
        case 'ArrowLeft':
          persArthur.parar();
          break;
        default:
      }
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