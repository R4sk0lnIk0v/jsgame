class Vetor2D {

    constructor(x, y){
        this._x = x;
        this._y = y;        
    }

    norma(){
        return Math.sqrt(this._x*this._x + this._y*this._y);
    }

    soma(vetor){
        return new Vetor2D(vetor._x + this._x, vetor._y + this._y);
    }

    subtrai(vetor)
    {
        return new Vetor2D(this._x - vetor._x, this._y - vetor._y);
    }

    multiplicarPorEscalar(escalar)
    {         
        return new Vetor2D(vetor._x * escalar, vetor._y * escalar);
    }    
}

module.exports  = Vetor2D;