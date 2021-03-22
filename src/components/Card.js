export class Card {
    constructor(data, cardSelector, ownerId, handleCardClick) {
      this._title = data.name;
      this._image = data.link;
      this._likesCounter = data.likes.length;
      this._cardOwner = data.owner._id; //id хозяина карточки

      this._cardSelector = cardSelector;
      
      this._ownerId = ownerId; //id пользователя

      this._openImagePopup = handleCardClick;
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
      this._element.querySelector('.card__like').addEventListener('click', this._handleLikePost);
      if (this._isOwner()) {
        this._element.querySelector('.card__delete').addEventListener('click', this._handleDeletePost);
      }
      this._element.querySelector('.card__picture').addEventListener('click', () => this._openImagePopup(this._title, this._image));
    };
  
    _handleLikePost (evt) {
      evt.target.classList.toggle('card__like_active')
    }
  
    _handleDeletePost (evt) {
      document.querySelector('.popup_type_delete-post').classList.add('popup_active');
      
      //evt.target.closest('.card').remove();
    }

    _isOwner () {
      if (this._ownerId === this._cardOwner) {
        return true;
      }
      else false
    }

    generateCard() {
      if (this._isOwner()){
        this._element = this._getTemplate();
        this._element.querySelector('.card__picture').src = this._image;
        this._element.querySelector('.card__picture').alt = this._title;
        this._element.querySelector('.card__signature').textContent = this._title;
        this._element.querySelector('.card__like-counter').textContent = this._likesCounter
        this._setEventListeners();
        return this._element;}
      else {
        this._element = this._getTemplate();
        this._element.querySelector('.card__delete').remove();
        this._element.querySelector('.card__picture').src = this._image;
        this._element.querySelector('.card__picture').alt = this._title;
        this._element.querySelector('.card__signature').textContent = this._title;
        this._element.querySelector('.card__like-counter').textContent = this._likesCounter
        this._setEventListeners();
        return this._element;
      }
    }
  
    
  }