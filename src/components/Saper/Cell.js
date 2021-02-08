import UI from './UI';

class Cell extends UI{
    constructor(x,y){
        super();
        this.x = x;
        this.y = y;
        this.value = 0;
        this.isMine = false;
        this.isReveal = false;
        this.isFlagged = false;
        this.selector = `[data-x="${this.x}" ][data-y="${this.y}"]`;
        this.element = null;

    }

    createElement(){
        const element = `<div class ="saper__cell saper__border saper__border--concave" data-cell data-x="${this.x}" data-y="${this.y}"></div>`;
        return element;
    }

    revealCell(){
        this.isReveal = true;
        this.element.classList.remove('saper__border--concave');
        this.element.classList.add('saper__border--revealed');

        if(this.isMine){
            this.element.classList.add('saper__cell--bomb')
            return;
        }
        if(this.value){
            this.element.textContent = this.value;
            this.element.classList.add(`saper__cell--info-${this.value}`)
        }
    }

    toggleFlag(){
        this.isFlagged = !this.isFlagged;
        this.element.classList.toggle('saper__cell--flag');
    }
    addMine(){
        this.isMine = true;
    }
}

export default Cell;