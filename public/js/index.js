const ShaderHandler = require("../../modules/ShaderHandler");

const shader = new ShaderHandler();

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
};