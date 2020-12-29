class Keyboard {    

    constructor(documentHandler){

        Keyboard._keyState = new Array(255);
        Keyboard._keyEvents = new Array();

        for(let i = 0; i < Keyboard.keyState.length; i++){
            Keyboard._keyState[i] = false;
        }

        documentHandler.addEventListener('keydown', this.keyDown, false);
        documentHandler.addEventListener('keyup', this.keyUp, false);
    }

    isKeyPressed(keyStr){
        const keyCode = keyStr.charCodeAt('0');
        if(keyCode < 255){
            return Keyboard._keyState[keyCode];
        }
        else {
            return false;
        }
    }

    keyDown(event){
        if(event.keyCode < 255 && !Keyboard.keyState[event.keyCode]){
            Keyboard._keyState[event.keyCode] = true;
            const len = Keyboard._keyEvents.push(event);
            if(len > 25){
                Keyboard._keyEvents = [];
            }
        }
    }

    keyUp(event){
        if(event.keyCode < 255 && Keyboard.keyState[event.keyCode]){
            Keyboard._keyState[event.keyCode] = false;
            const len = Keyboard._keyEvents.push(event);

            if(len > 25){
                Keyboard._keyEvents = [];
            }
        }
    }

    peekKeyEvents(){
        if(Keyboard.keyEvents.length > 0) {
            return Keyboard._keyEvents[Keyboard.keyEvents.length - 1];
        }
        return false;
    }

    peekAndRemoveKeyEvents(){
        if(Keyboard.keyEvents.length > 0) {
            return Keyboard._keyEvents.pop();
        }
        return false;
    }

}

module.exports  = Keyboard;