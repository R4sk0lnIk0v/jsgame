const Vetor2D = require("./Vetor2D");

class Matriz2x2{

    constructor(x11, x12, x21, x22){
        this.matriz = [x11, x12, x21, x22];
    }

    pegarValor(i, j){
        return this.matriz[j + (i * 2)];
    }

    setarValor(i, j, val){
        this.matriz[j + (i*2)] = val;
    }

    multiplicaVetor(vetor){
        const novoX = this.matriz[0 + (0 * 2)] * vetor._x + this.matriz[0 + (1 * 2)] * vetor._y;
        const novoY = this.matriz[1 + (0 * 2)] * vetor._x + this.matriz[1 + (1 * 2)] * vetor._y;

        return new Vetor2D(novoX, novoY);
    }


}

module.exports  = Matriz2x2;