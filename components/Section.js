import { Card } from './Card.js'

export class Section {
    constructor({ data, renderer }, containerSelector) {
        this._renderedItems = data;
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector)
      }
    
      addItem(element) {
        this._container.prepend(element);
      }
    
      renderItems() {    
        this._renderedItems.reverse().forEach(item => {
          this._renderer(item)
        });
      }
}

/*




renderItems() {    
        this._renderedItems.reverse().forEach(item => {
          const card = new Card (item, '.card-template');    
          const cardElement = card.generateCard();    
          this.setItem(cardElement);
        });
      }



//================== ТОЛЬКО ВРЕМЕННО ===========================
/*
function openImagePopup (evt) {
    openPopup(popupImage); //делаем попап видимым
    const image = evt.target.closest('.card__picture');
    bigImage.src = image.src;
    bigImage.alt = image.alt;
    bigImageSignature.textContent = image.alt;
  }
  */