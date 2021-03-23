import { Popup } from './Popup.js';


export class PopupWithSubmit extends Popup {
    constructor(selector, submitForm) {
        super(selector)
        this.submitForm = submitForm
    }
    setEventListeners() {
        super.setEventListeners();

        //добавляем обработчик события сабмита формы
        this._popup.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this.submitForm()
        })
    }
}