import { editProfileButton } from '../utils/constants.js';
import { addPostButton } from '../utils/constants.js';
import { profileEditForm } from '../utils/constants.js';
import { addPostForm } from '../utils/constants.js';

import {Card} from '../components/Card.js';
import {validationList, FormValidator} from '../components/FormValidator.js';
import {initialCards} from '../utils/initialCards.js';

import { Section } from '../components/Section.js'

import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js';

//===== Секциями с карточками =====

const cardList = new Section({ 
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card-template', handleCardClick);
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    }
  },
  '.elements');

cardList.renderItems()

//==========

const editProfile = new UserInfo({
  username: '.profile__name',
  status: '.profile__status'})

//===== Попап добавления нового поста на страницу =====

const addPostPopup = new PopupWithForm ('.popup_type_add-post',
  function(){

    //создаем по введенным в формы данным новую карточку
    const addPost = new Card ({
      name: this._getInputValues()[0].value,
      link: this._getInputValues()[1].value},
      '.card-template',
      handleCardClick
      )

    //вызываем функцию создания карточки и добавляем ее на страницу
    cardList.addItem(addPost.generateCard())

    //закрываем попап
    this.close();
  }
)
addPostPopup.setEventListeners();
addPostButton.addEventListener('click', function(){addPostPopup.open()})

//===== Попап редактирования данных профиля =====

const editProfilePopup = new PopupWithForm ('.popup_type_edit-profile',
  function(){
    document.querySelector('.profile__name').textContent = this._getInputValues()[0].value;
    document.querySelector('.profile__status').textContent = this._getInputValues()[1].value;
    this.close()
  }
)
editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', function(){editProfilePopup.open()})

//===== Попап с открывающейся большой картинкой =====

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners()

//===== Функция, для передачи в класс Card метода из класса PopupWithImage

function handleCardClick(evt) {
  imagePopup.open(evt)

//===== Валидация полей ввода формы с добавлением нового поста =====

const addPostValid = new FormValidator(validationList, addPostForm);
addPostValid.enableValidation();

//===== Валидация полей ввода формы с редактированием данных профиля =====

const editProfileValid = new FormValidator(validationList, profileEditForm);
editProfileValid.enableValidation();







}

/*


// === Функция открывающая попап редактирующий профиль ===

function openEditProfilePopup () {
    openPopup(popupEditProfile); //делаем попап видимым
    editProfileValid.clearErrors() //очищаем ошибки, если они были при прошлом вводе
    nameEditArea.value = profileName.textContent //значения в формах по умолчанию берем из профиля
    statusEditArea.value = profileStatus.textContent //значения в формах по умолчанию берем из профиля
}

// === Функция открывающая попап добавляющий пост ===

function openAddPostPopup () {
  openPopup(popupAddPost); //делаем попап видимым  
  addPostValid.clearErrors() //очищаем ошибки, если они были при прошлом вводе
  signatureArea.value = ""; //очищаем поля, если в форму уже что-то вводили
  pictureArea.value = ""; //очищаем поля, если в форму уже что-то вводили

  //при каждом открытии попапа делаем кнопку неактивной, так как поля пустые//

  const submitButton = popupAddPost.querySelector('.popup__save-button');
  addPostValid.disableSubmitButton(submitButton);
}




// === Функция закрытия попапа при клике по оверлею ===

function closePopupOverlay (formName) {
  formName.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(formName) 
    }
  });
}


// === Добавить слушатель события по нажатию на оверлей всем формам ===

closePopupOverlay(popupEditProfile);
closePopupOverlay(popupAddPost);
closePopupOverlay(popupImage);


*/