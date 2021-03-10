export class Popup {
    constructor(selector){
        this._selector = document.querySelector(selector)
    }

    //открытие попапа
    open() {
        this._selector.classList.add('popup_active');
        this._handleEscapeClose();
    }

    //закрытие попапа
    close() {
        this._selector.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscapeClose);
    }

    //закрытие попапа клавишей ESC
    _handleEscapeClose() {
        document.addEventListener('keydown', (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                this.close()
            }
        })
    }

    //закрытие попапа кликом по оверлею
    _handleOverlayClose() {
        this._selector.addEventListener('click', (evt) => {
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
        const closeButton = this._selector.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => {this.close()})
    }
}
