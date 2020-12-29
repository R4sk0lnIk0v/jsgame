const Vetor2D = require("./Vetor2D");

class Matriz2x2{

    constructor(x00, x01, x10, x11){
        this._matriz = [x00, x01, x10, x11];
    }
    /**
     * Retorna valor de componente da matriz
     * @param {*"Numero da linha"} i 
     * @param {*"Numero da coluna"} j 
     */
    pegarValor(i, j){
        return this._matriz[j + (i * 2)];
    }
    /**
     * Seta um valor da coluna
     * @param {*"Numero da linha"} i 
     * @param {*"Numero da coluna"} j 
     * @param {*"Valor a ser setado"} val 
     */
    setarValor(i, j, val){
        this._matriz[j + (i*2)] = val;
    }
    /**
     * Multiplica a matriz por um vetor e retorna um novo vetor transformado
     * @param {*"Vetor a ser multiplicado"} vetor 
     */
    multiplicaVetor(vetor){
        const novoX = this._matriz[0 + (0 * 2)] * vetor._x + this._matriz[0 + (1 * 2)] * vetor._y;
        const novoY = this._matriz[1 + (0 * 2)] * vetor._x + this._matriz[1 + (1 * 2)] * vetor._y;

        return new Vetor2D(novoX, novoY);
    }

    /**
     * Multiplica a matriz por outra matriz e retorna uma matriz
     * @param {*"Matriz a ser multiplicada"} matriz 
     */
    multiplicaMatriz(matriz){
        const x00 = this._matriz[0 + (0 * 2)] * matriz.pegarValor(0, 0) + this._matriz[1 + (0 * 2)] * matriz.pegarValor(1, 0);
        const x01 = this._matriz[0 + (0 * 2)] * matriz.pegarValor(0, 1) + this._matriz[1 + (0 * 2)] * matriz.pegarValor(1, 1);

        const x10 = this._matriz[0 + (1 * 2)] * matriz.pegarValor(0, 0) + this._matriz[1 + (1 * 2)] * matriz.pegarValor(1, 0);
        const x11 = this._matriz[0 + (1 * 2)] * matriz.pegarValor(0, 1) + this._matriz[1 + (1 * 2)] * matriz.pegarValor(1, 1);
        
        return new Matriz2x2(x00, x01, x10, x11);
    }
}

module.exports  = Matriz2x2;