export class Popup {
    constructor(selector){
        this._selector = document.querySelector(selector)
    }
    open() {
        this._selector.classList.add('popup_active');
        this._handleEscapeClose();
    }
    close() {
        this._selector.classList.remove('popup_active');
        document.removeEventListener('keydown', this._handleEscapeClose);
    }
    _handleEscapeClose() {
        document.addEventListener('keydown', (evt) => {
            const key = evt.key;
            if (key === 'Escape') {
                this.close()
            }
        })
    }

    //ТУТ ПЕРЕДЕЛАТЬ
    
    _handleOverlayClose() {
        formName.addEventListener('click', (evt) => {
          if (evt.target === evt.currentTarget) {
            closePopup(formName) 
          }
        });
      }
    setEventListeners() {
        const closeButton = this._selector.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => {this.close()})
    }
}
