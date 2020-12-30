const ShaderHandler = require("./ShaderHandler");

const shader = new ShaderHandler();

class AssetObject {
    constructor (gl, src, width, height, id, posX=0, posY=0, rotX=0, rotY=0, scaleX=1, scaleY=1) {
        this._gl = gl;
        this._src = src;
        this._id = id;
        this._width = width;
        this._height = height;
        this._posX = posX;
        this._posY = posY;
        this._rotX = rotX;
        this._rotY = rotY;
        this._scaleX = scaleX;
        this._scaleY = scaleY;
    }

    getAsset() {
        return this;
    }
    
    constructAsset (cb) {
        let image = new Image();
        image.src = this._src;
        image.onload = () => cb(image)
    }
    
    renderObject () {
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, this._posX, this._posY, this._rotX, this._rotY, this._scaleX, this._scaleY);
        })
    }
    
    updateObjectPosition(posX=this._posX, posY=this._posY) {
        this._posX = posX;
        this._posY = posY;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, posX, posY, this._rotX, this._rotY, this._scaleX, this._scaleY);
        });        
    }

    updateObjectDimensions(width=this._width, height=this._height) {
        this._width = width;
        this._height = height;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, width, height, this._posX, this._posY, this._rotX, this._rotY, this._scaleX, this._scaleY);
        });        
    }

    updateObjectRotation(rotX=this._rotX, rotY=this._rotY) {
        this._rotX = rotX;
        this._rotY = rotY;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, this._posX, this._posY, rotX, rotY, this._scaleX, this._scaleY);
        });        
    }

    updateObjectScale(scaleX=this._scaleX, scaleY=this._scaleY) {
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, this._posX, this._posY, this._rotX, this._rotY, scaleX, scaleY);
        });        
    }
}

module.exports = AssetObject;