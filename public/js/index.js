const ShaderHandler = require("../../modules/ShaderHandler");
const Keyboard = require("./public/js/Keyboard");

const shader = new ShaderHandler();
const key = new Keyboard(document);

function main(keyboard) {

  if(keyboard.isKeyPressed('W')){
    console.log('W pressed');
  }
  if(keyboard.isKeyPressed('S')){
    console.log('S pressed');
  }
  if(keyboard.isKeyPressed('D')){
    console.log('A pressed');
  }

  let e;    
  while(e = keyboard.peekAndRemoveKeyEvents()){
    console.log(e);
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
  window.addEventListener('resize', shader.renderAsset(image));
  
  main(key);
  setTimeout(function(){ call();}, 100);
};