const Vetor2D = new require("./Vetor2D");

/**
 * Classe responsavel por ter tudo relacionado ao character
 */
class Character{
    constructor(posIni = new Vetor2D(0, 0), width=20, height=60){
        this._pos = posIni;
        this._width = width;
        this._height = height;
        this._vel = new Vetor2D(0, 0);

        /// TODO
        // SPRITE
        // BOUNDING BOX (caixa que circunda o personagem)

    }
    /** 
     * Retorna valor da velocidade do personagem
     */
    pegaVel(){
        return this._vel;
    }
    /**
     * Retorna valor da posicao do personagem
     */
    pegaPos(){
        return this._pos;
    }
    // get pegaBoundingBox() // retorna "caixa" que circunda o personagem, na posicao do personagem.

    /* TODO: funcao que recebe bounding box e retorna se há ou não colisão.
    estaColidindo(BoundingBox){

    }*/
    /**
     * Seta posicao do personagem
     */
    setarPos(novaPos){
        this._pos = novaPos;
    }
    /**
     * Seta velocidade do personagem
     */
    setVel(novaVel)
    {
        this._vel = novaVel;
    }
    /**
     * Avança no tempo o personagem
     */
    tick(){
        this._pos = this._pos.soma(this._vel);
    }

    // funcoes temporarias
    /**
     * anda para a direita (temporaria)
     */
    andarDireita(){
        this._vel = new Vetor2D(1, 0);
    }
    /**
     * anda para a esquerda (temporaria)
     */
    andarEsquerda(){
        this._vel = new Vetor2D(-1, 0);
    }
    /**
     * anda para cima (temporaria)
     */
    andarCima(){
        this._vel = new Vetor2D(0, -1);
    }
    /**
     * anda para baixo(temporaria)
     */
    andarBaixo(){
        this._vel = new Vetor2D(0, 1);
    }
    /**
     * para de andar(temporaria)
     */
    parar(){
        this._vel = new Vetor2D(0, 0);
    }
}

module.exports = Character;
