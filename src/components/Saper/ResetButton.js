import UI from './UI';

class Reset extends UI{
    element = this.getElement(this.UiSelectors.resetButton);
    changeEmotion(emotion){
        this.element.querySelector('use').setAttribute('href', `../../images/Saper/sprite.svg#${emotion}`)
    }
}

export default Reset;