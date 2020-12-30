const { Main } = require("electron");
const ShaderHandler = require("./ShaderHandler");

const shader = new ShaderHandler();

class AssetObject {
    constructor (gl, src, width, height, id, posX=0, posY=0, rotX=0, scaleX=1, scaleY=1) {
        this._gl = gl;
        this._src = src;
        this._id = id;
        this._width = width;
        this._height = height;
        this._posX = posX;
        this._posY = posY;
        this._rotX = rotX;
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this._loaded = false;
        this.constructAsset(image=>{
            this._imgObj = image;
            this._loaded = true;
        })
    }

    getAsset() {
        return this;
    }
    
    constructAsset (cb) {
        let image = new Image();
        image.src = this._src;
        image.onload = () => cb(image);
    }
    
    renderObject () {
        if (this._loaded) {
            shader.renderAsset(this._gl, this._imgObj, this._width, this._height, this._posX, this._posY, this._rotX, this._scaleX, this._scaleY);
        } else {
            throw "Imagem não renderizada: " + this._id;
        }
    }
    
    updateObjectPosition(posX=this._posX, posY=this._posY) {
        this._posX = posX;
        this._posY = posY;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, posX, posY, this._rotX, this._scaleX, this._scaleY);
        });        
    }

    updateObjectDimensions(width=this._width, height=this._height) {
        this._width = width;
        this._height = height;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, width, height, this._posX, this._posY, this._rotX, this._scaleX, this._scaleY);
        });        
    }

    updateObjectRotation(rotX=this._rotX) {
        this._rotX = rotX;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, this._posX, this._posY, rotX, this._scaleX, this._scaleY);
        });        
    }

    updateObjectScale(scaleX=this._scaleX, scaleY=this._scaleY) {
        this._scaleX = scaleX;
        this._scaleY = scaleY;
        this.constructAsset(image=>{
            shader.renderAsset(this._gl, image, this._width, this._height, this._posX, this._posY, this._rotX, scaleX, scaleY);
        });        
    }
}

module.exports = AssetObject;