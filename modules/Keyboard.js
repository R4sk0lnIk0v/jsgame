class Keyboard {    

    constructor(documentHandler){

        Keyboard.keyState = new Array(255);
        Keyboard.keyEvents = new Array();

        for(let i = 0; i < Keyboard.keyState.length; i++){
            Keyboard.keyState[i] = false;
        }

        console.log(this.keyState);

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
            return Keyboard.keyState[keyCode];
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
        if(event.keyCode < 255){
            Keyboard.keyState[event.keyCode] = true;
            const len = Keyboard.keyEvents.push(event);
            if(len > 25){
                Keyboard.keyEvents = [];
            }
        }
    }
    /**
     * 
     * @param {*"Evento recebido de onkeyup"} event 
     */
    keyUp(event){
        if(event.keyCode < 255){
            Keyboard.keyState[event.keyCode] = false;
            const len = Keyboard.keyEvents.push(event);

            if(len > 25){
                Keyboard.keyEvents = [];
            }
        }
    }
    /**
     * Retorna evento
     */
    peekKeyEvents(){
        if(Keyboard.keyEvents.length > 0) {
            return Keyboard.keyEvents[Keyboard.keyEvents.length - 1];
        }
        return false;
    }
    /**
     * Retorna evento e o tira da lista
     */
    peekAndRemoveKeyEvents(){
        if(Keyboard.keyEvents.length > 0) {
            return Keyboard.keyEvents.pop();
        }
        return false;
    }

}

module.exports  = Keyboard;