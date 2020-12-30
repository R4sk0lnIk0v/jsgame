class Keyboard {    

    constructor(documentHandler){

        Keyboard._keyState = new Array(255);
        Keyboard._keyEvents = new Array();

        for(let i = 0; i < Keyboard._keyState.length; i++){
            Keyboard._keyState[i] = false;
        }

        documentHandler.addEventListener('keydown', this.keyDown, false);
        documentHandler.addEventListener('keyup', this.keyUp, false);
    }
    /**
     * Verifica se tecla está pressionada (retorna true or false)
     * @param {*"Valor da letra do teclado ex: 'A'"} keyStr 
     */
    isKeyPressed(keyStr){
        const keyCode = keyStr.charCodeAt('0');
        if(keyCode < 255){
            return Keyboard._keyState[keyCode];
        }
        else {
            return false;
        }
    }
    /**
     * 
     * @param {*"Evento recebido de onkeydown"} event 
     */
    keyDown(event){
        if(event.keyCode < 255 && !Keyboard._keyState[event.keyCode]){
            Keyboard._keyState[event.keyCode] = true;
            const len = Keyboard._keyEvents.push(event);
            if(len > 25){
                Keyboard._keyEvents = [];
            }
        }
    }
    /**
     * 
     * @param {*"Evento recebido de onkeyup"} event 
     */
    keyUp(event){
        if(event.keyCode < 255 && Keyboard._keyState[event.keyCode]){
            Keyboard._keyState[event.keyCode] = false;
            const len = Keyboard._keyEvents.push(event);

            if(len > 25){
                Keyboard._keyEvents = [];
            }
        }
    }
    /**
     * Retorna evento
     */
    peekKeyEvents(){
        if(Keyboard._keyEvents.length > 0) {
            return Keyboard._keyEvents[Keyboard._keyEvents.length - 1];
        }
        return false;
    }
    /**
     * Retorna evento e o tira da lista
     */
    peekAndRemoveKeyEvents(){
        if(Keyboard._keyEvents.length > 0) {
            return Keyboard._keyEvents.pop();
        }
        return false;
    }

}

module.exports  = Keyboard;