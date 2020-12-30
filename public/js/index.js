const Keyboard = require("../../modules/Keyboard");
const AssetObject = require("../../modules/AssetObject");

const key = new Keyboard(document);

function main(keyboard) {
  
  if(keyboard.isKeyPressed('W')){
    console.log('W pressed');
  }
  if(keyboard.isKeyPressed('S')){
    console.log('S pressed');
  }
  if(keyboard.isKeyPressed('A')){
    console.log('A pressed');
  }
  if(keyboard.isKeyPressed('D')){
    console.log('D pressed');
  }
  
  let e;    
  while(e = keyboard.peekAndRemoveKeyEvents()){
    console.log(e);
  }
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