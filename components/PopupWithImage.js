import { Popup } from './Popup.js'

export class PopupWithImage extends Popup {
    open() {
        this._selector.classList.add('popup_active');

//====== Переделать под слушатель, навешиваемый в классе Card ======

        //const image = evt.target.closest('.card__picture');
        //bigImage.src = image.src;
        //bigImage.alt = image.alt;
        //bigImageSignature.textContent = image.alt;
    }
}