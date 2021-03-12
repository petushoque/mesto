import { Popup } from './Popup.js';


export class PopupWithForm extends Popup {
    constructor(selector, submitForm) {
        super(selector);
        this.submitForm = submitForm;
    }
    _getInputValues() {
        // достаём все элементы полей
        this._inputList = this._popup.querySelectorAll('.popup__input');
        // создаём пустой объект
        this._formValues = {};
        // добавляем в этот объект значения всех полей
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });
        // возвращаем объект значений
        return this._formValues;        
    }
    setEventListeners() {   
        //навешиваем слушатель клика по крестику закрытия формы  
        super.setEventListeners()
        
        //добавляем обработчик события сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitForm(this._getInputValues())})
    }
    close() {
        //закрыть попап нажатием на крестик
        super.close();
        //очистить поля ввода
        this._popup.querySelector('form').reset();
    }
}