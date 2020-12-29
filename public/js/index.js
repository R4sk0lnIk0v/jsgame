const ShaderHandler = require("../../modules/ShaderHandler");

const shader = new ShaderHandler();

let image = new Image();
image.src = __dirname + "/../../assets/cyberpunk.jpg";
image.onload = () => {
  shader.renderAsset(image);
  // window.addEventListener('resize', shader.renderAsset(image));
};