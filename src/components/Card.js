export class Card {
    constructor(data, cardSelector, ownerId, handleCardClick, handleDeleteCardClick, handleLikeClick) {
      this._title = data.name; //название карточки
      this._image = data.link; //ссылка на картинку
      this._likes = data.likes; //объект со всей информацией о лайках
      this._cardOwner = data.owner._id; //id хозяина карточки
      this._cardId = data._id //id карточки

      this._cardSelector = cardSelector;
      
      this._ownerId = ownerId; //id пользователя

      this._openImagePopup = handleCardClick; //функция откртия попапа с крупной картинкой при клике по картинке у поста
      this._deleteCardPopup = handleDeleteCardClick; //функция открытия попапа с подтверждением удаления карточки
      this._handleLikeClick = handleLikeClick //функция с логикой отработки клика по лайку

      this._listOfLikes = this._likes.map((item) => item._id); //массив с id пользователей поставивших лайк
    }
  
    updateListOfLikes(obj) {
      this._listOfLikes = obj.map((item) => item._id)
      return this._listOfLikes
    }

    getElement() {
      return this._element
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
      else {
        return false;
      }
    }

    setTrashCan () {
      if (!this._isOwner()){
        this._element.querySelector('.card__delete').remove();
      }
    }

    isLiked () {    
      for (let i=0; i < this._listOfLikes.length; i++){
        if (this._listOfLikes[i] === this._ownerId) {
          return true
        }
      }
      return false
    }

    setLikes () {
      if (this.isLiked()) {
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