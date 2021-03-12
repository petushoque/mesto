import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    constructor(selector) {
        super(selector);        
        this._popupImage = this._popup.querySelector('.popup__big-image');
        this._popupTitle = this._popup.querySelector('.popup__big-image-signature')
    }
    open(title, image) {
        //открываем попап, наследуя метод родителя
        super.open();

        //подставляем в открывшийся попап ссылку на картинку и описание к ней
        this._popupImage.src = image;
        this._popupImage.alt = title;
        this._popupTitle.textContent = title;
    }
}