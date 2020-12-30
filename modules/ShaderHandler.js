"use strict";

const vertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec4 a_position;

// all shaders have a main function
void main() {
    
    // gl_Position is a special variable a vertex shader
    // is responsible for setting
    gl_Position = a_position;
}
`;

const fragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
    // Just set the output to a constant reddish-purple
    outColor = vec4(1, 0, 0.5, 1);
}
`;

const imageVertexShaderSource = `#version 300 es

// an attribute is an input (in) to a vertex shader.
// It will receive data from a buffer
in vec2 a_position;
in vec2 a_texCoord;

// Used to pass in the resolution of the canvas
uniform vec2 u_resolution;

// Used to pass the texture coordinates to the fragment shader
out vec2 v_texCoord;

// all shaders have a main function
void main() {
    
    // convert the position from pixels to 0.0 to 1.0
    vec2 zeroToOne = a_position / u_resolution;
    
    // convert from 0->1 to 0->2
    vec2 zeroToTwo = zeroToOne * 2.0;
    
    // convert from 0->2 to -1->+1 (clipspace)
    vec2 clipSpace = zeroToTwo - 1.0;
    
    gl_Position = vec4(clipSpace * vec2(1, -1), 0, 1);
    
    // pass the texCoord to the fragment shader
    // The GPU will interpolate this value between points.
    v_texCoord = a_texCoord;
}
`;

const imageFragmentShaderSource = `#version 300 es

// fragment shaders don't have a default precision so we need
// to pick one. highp is a good default. It means "high precision"
precision highp float;

// our texture
uniform sampler2D u_image;

// the texCoords passed in from the vertex shader.
in vec2 v_texCoord;

// we need to declare an output for the fragment shader
out vec4 outColor;

void main() {
    outColor = texture(u_image, v_texCoord);
}
`;

class ShaderHandler {
    constructor () {}
    
    /**
     * "Retorna a source do shader requisitado"
     * @param {*"Tipo de shader que quer o retorno"} sourceType 
     */
    getShaderSource(sourceType) {
        switch (sourceType) {
            case "vertex":
            return vertexShaderSource;
            break;
            
            case "vertex":
            return fragmentShaderSource;
            break;
            
            case "imgVertex":
            return imageVertexShaderSource;
            break;
            
            case "imgFragment":
            return imageFragmentShaderSource;
            break;
            
            default:
            throw 'No Source type avaible';
            break;
        }
    }
    
    /**
     * "Compila os shaders para serem usados no programa"
     * @param {*"Canvas onde será renderizado"} gl 
     * @param {*"Tipo de Shader que será compilado"} type 
     * @param {*"Tipo da Source a qual será usada para compilar o Shader"} sourceType 
     */
    createShader (gl, type, sourceType) {
        let source;
        switch (sourceType) {
            case "vertex":
            source = vertexShaderSource;
            break;
            
            case "vertex":
            source = fragmentShaderSource;
            break;
            
            case "imgVertex":
            source = imageVertexShaderSource;
            break;
            
            case "imgFragment":
            source = imageFragmentShaderSource;
            break;
            
            default:
            throw 'No Source type avaible';
            break;
        }
        
        let shader = gl.createShader(type);
        gl.shaderSource(shader, source);
        gl.compileShader(shader);
        
        let success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
        if (success) {
            return shader;
        }
        
        console.log(gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
    }
    
    /**
     * "Renderiza o asset passado como parâmetro no canvas"
     * @param {*"Canvas onde será renderizado"} gl 
     * @param {*"Objeto de imagem com src previamente criado"} image
     * @param {*"Posição do objeto renderizado no eixo x"} posX
     * @param {*"Posição do objeto renderizado no eixo y"} posY
     * @param {*"Rotação do objeto renderizado no eixo x"} rotX
     * @param {*"Rotação do objeto renderizado no eixo y"} rotY
     * @param {*"Escala do objeto renderizado no eixo x"} scaleX
     * @param {*"Escala do objeto renderizado no eixo y"} scaleY
     */
    renderAsset (gl, image, maxWidth, maxHeight, posX=0, posY=0, rotX=0, rotY=0, scaleX=1, scaleY=1) {
        let vertexShader = this.createShader(gl, gl.VERTEX_SHADER, "imgVertex");
        let fragmentShader = this.createShader(gl, gl.FRAGMENT_SHADER, "imgFragment");
        
        let program = this.createProgram(gl, vertexShader, fragmentShader);
        
        let positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        let texCoordAttributeLocation = gl.getAttribLocation(program, "a_texCoord");
        
        let resolutionLocation = gl.getUniformLocation(program, "u_resolution");
        let imageLocation = gl.getUniformLocation(program, "u_image");
        
        let vao = gl.createVertexArray();
        
        gl.bindVertexArray(vao);
        
        let positionBuffer = gl.createBuffer();
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        
        let size = 2;
        let type = gl.FLOAT;
        let normalize = false;
        let stride = 0;
        let offset = 0;
        
        gl.vertexAttribPointer(positionAttributeLocation, size, type, normalize, stride, offset);
        
        let texCoordBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, texCoordBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(texCoordAttributeLocation);
        
        size = 2;
        type = gl.FLOAT;
        normalize = false;
        stride = 0;
        offset = 0;
        
        gl.vertexAttribPointer(texCoordAttributeLocation, size, type, normalize, stride, offset);
        
        let texture = gl.createTexture();
        
        gl.activeTexture(gl.TEXTURE0 + 0);
        
        gl.bindTexture(gl.TEXTURE_2D, texture);
        
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
        
        let mipLevel = 0;
        let internalFormat = gl.RGBA;
        let srcFormat = gl.RGBA;
        let srcType = gl.UNSIGNED_BYTE;
        
        gl.texImage2D(gl.TEXTURE_2D, mipLevel, internalFormat, srcFormat, srcType, image);
        
        webglUtils.resizeCanvasToDisplaySize(gl.canvas);
        
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
        
        // gl.clearColor(0, 0, 0, 0);
        // gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
        
        gl.useProgram(program);
        
        gl.bindVertexArray(vao);
        
        gl.uniform2f(resolutionLocation, gl.canvas.width, gl.canvas.height);
        
        gl.uniform1i(imageLocation, 0);
        
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        
        this.setRectangle(gl, posX, posY, maxWidth, maxHeight);
        
        gl.drawArrays(gl.TRIANGLES, 0, 6);
    }
    
    /**
     * "Cria o retêngulo da imagem a ser renderizada no canvas"
     * @param {*"Canvas onde será renderizado"} gl 
     * @param {*"Posição inicial do objeto no eixo x"} x 
     * @param {*"Posição inicial do objeto no eixo y"} y 
     * @param {*"Largura da imagem"} width 
     * @param {*"Altura da imagem"} height 
     */
    setRectangle(gl, x, y, width, height) {
        var x1 = x;
        var x2 = x + width;
        var y1 = y;
        var y2 = y + height;
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
            x1, y1,
            x2, y1,
            x1, y2,
            x1, y2,
            x2, y1,
            x2, y2,
        ]), gl.STATIC_DRAW);
    }
    
    /**
     * "Cria o programa que habilita o uso da placa de video"
     * @param {*"Canvas onde será renderizado"} gl 
     * @param {*"Shader do tipo vertex já compilado"} vertexShader 
     * @param {*"Shader do tipo fragment já compilado"} fragmentShader 
     */

    createProgram (gl, vertexShader, fragmentShader) {
        var program = gl.createProgram();
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        var success = gl.getProgramParameter(program, gl.LINK_STATUS);
        if (success) {
            return program;
        }
        
        console.log(gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
    }
}

module.exports = ShaderHandler;