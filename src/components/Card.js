export class Card {
    constructor(data, cardSelector, ownerId, handleCardClick, handleDeleteCardClick, handleLikeClick) {
      this._title = data.name;
      this._image = data.link;
      this._likes = data.likes; //объект со всей информацией о лайках
      this._cardOwner = data.owner._id; //id хозяина карточки
      this._cardId = data._id //id карточки

      this._cardSelector = cardSelector;
      
      this._ownerId = ownerId; //id пользователя

      this._openImagePopup = handleCardClick;
      this._deleteCardPopup = handleDeleteCardClick;
      this._handleLikeClick = handleLikeClick

      this._listOfLikes = this._likes.map((item) => item._id); //массив с id пользователей поставивших лайк
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      return cardElement;
    }
  
    _setEventListeners() {
      this._element.querySelector('.card__like').addEventListener('click', () => this._handleLikeClick(this._cardId));
      if (this._isOwner()) {
        this._element.querySelector('.card__delete').addEventListener('click', () => this._deleteCardPopup(this._cardId, this._element));
        }
      this._element.querySelector('.card__picture').addEventListener('click', () => this._openImagePopup(this._title, this._image));
    };

    _isOwner () {
      if (this._ownerId === this._cardOwner) {
        return true;
      }
      else false
    }

    setTrashCan () {
      if (!this._isOwner()){
        this._element.querySelector('.card__delete').remove();
      }
    }

    _isLiked () {    
      for (let i=0; i < this._listOfLikes.length; i++){
        console.log(this._listOfLikes[i])
        console.log(this._ownerId)
        if (this._listOfLikes[i] === this._ownerId) {
          console.log('yes')
          return true
        }
      }
      console.log('no')
      return false
    }

    setLikes () {
      if (this._isLiked()) {
        this._element.querySelector('.card__like').classList.add('card__like_active')
      }
      else {
        this._element.querySelector('.card__like').classList.remove('card__like_active')
      }
    }

    generateCard() {
  
      this._element = this._getTemplate();
      this._element.querySelector('.card__picture').src = this._image;
      this._element.querySelector('.card__picture').alt = this._title;
      this._element.querySelector('.card__signature').textContent = this._title;
      this._element.querySelector('.card__like-counter').textContent = this._likes.length;
      this._setEventListeners();

      this.setTrashCan()
      this.setLikes()

      return this._element;
    }
  
    
  }