class Vetor2D {

    constructor(x, y){
        this._x = x;
        this._y = y;        
    }
    /**
     * Retorna a norma do vetor
     */
    norma(){
        return Math.sqrt(this._x*this._x + this._y*this._y);
    }
    /**
     * Soma dois vetores e retorna o novo vetor somado
     * @param {*"Vetor a ser somado"} vetor 
     */
    soma(vetor){
        return new Vetor2D(vetor._x + this._x, vetor._y + this._y);
    }
    /**
     * Subtrai dois vetores e retorna o novo vetor subtraido
     * @param {*"Vetor a ser subtraido"} vetor 
     */
    subtrai(vetor)
    {
        return new Vetor2D(this._x - vetor._x, this._y - vetor._y);
    }
    /**
     * Multiplica o vetor pelo escalar
     * @param {*"Escalar a multiplicar o vetor"} escalar 
     */
    multiplicarPorEscalar(escalar)
    {         
        return new Vetor2D(vetor._x * escalar, vetor._y * escalar);
    }    
}

module.exports  = Vetor2D;