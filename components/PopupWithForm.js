import { Popup } from './Popup.js'

export class PopupWithForm extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this.submitForm = submitForm
    }
    _getInputValues() {
        //собираем в массив все поля ввода формы
        const inputList = Array.from(this._selector.querySelectorAll('.popup__input'));
        return inputList
    }
    setEventListeners() {   
        //навешиваем слушатель клика по крестику закрытия формы  
        super.setEventListeners()
        
        //======== СЛЕДУЮЩАЯ ФУНКЦИЯ НЕ РЕАЛИЗОВАНА

        this._selector.addEventListener('submit', () => {this.submitForm()})//Перезаписывает родительский метод setEventListeners. Метод setEventListeners класса PopupWithForm должен не только добавлять обработчик клика иконке закрытия, но и добавлять обработчик сабмита формы.
    }
    close() {
        //закрыть попап нажатием на крестик
        super.close();
        //очистить поля ввода
        this._getInputValues()[0].value = '';
        this._getInputValues()[1].value = '';

    }

}