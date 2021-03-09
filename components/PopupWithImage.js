import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open(evt) {
        //открываем попап, наследуя метод родителя
        super.open(evt);

        //подставляем в открывшийся попап ссылку на картинку и описание к ней
        const image = evt.target.closest('.card__picture');
        this._selector.querySelector('.popup__big-image').src = image.src;
        this._selector.querySelector('.popup__big-image').alt = image.alt;
        this._selector.querySelector('.popup__big-image-signature').textContent = image.alt
    }
}