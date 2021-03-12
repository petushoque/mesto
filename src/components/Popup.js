export class Popup {
    constructor(selector){
        this._popup = document.querySelector(selector);
        this._handleEscapeClose = this._handleEscapeClose.bind(this);
    }

    //открытие попапа
    open() {
        this._popup.classList.add('popup_active');
        document.addEventListener('keydown', this._handleEscapeClose);
    }

    //закрытие попапа
    close() {
        this._popup.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    //закрытие попапа клавишей ESC
    _handleEscapeClose(evt) {
        const key = evt.key;
        if (key === 'Escape') {
            this.close()
            }
    }

    //закрытие попапа кликом по оверлею
    _handleOverlayClose() {
        this._popup.addEventListener('click', (evt) => {
          if (evt.target === evt.currentTarget) {
            this.close() 
          }
        });
      }

    //навешать все слушатели событий
    setEventListeners() {
        //слушатель клика по оверлею, закрывающий попап
        this._handleOverlayClose()

        //слушать у крестика закрытия попапа
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => {this.close()})
    }
}
