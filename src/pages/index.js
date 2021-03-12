import './index.css';

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

//===== Функция создания новой карточки =====

function createNewCard (data) {
    const card = new Card (data, '.card-template', handleCardClick);
    return card.generateCard();
}

//===== Секциями с карточками =====

const cardList = new Section({ 
  data: initialCards,
  renderer: (item) => {
    cardList.addItem(createNewCard(item))
    }
  },
  '.elements');

cardList.renderItems()

//===== Валидация полей ввода формы с добавлением нового поста =====

const addPostValid = new FormValidator(validationList, addPostForm);
addPostValid.enableValidation();

//===== Валидация полей ввода формы с редактированием данных профиля =====

const editProfileValid = new FormValidator(validationList, profileEditForm);
editProfileValid.enableValidation();

//===========================================================

const profile = new UserInfo({
  username: '.profile__name',
  status: '.profile__status'})

//===== Попап добавления нового поста на страницу =====

const addPostPopup = new PopupWithForm ('.popup_type_add-post',
  function(formValues){
    //создаем по введенным в формы данным новую карточку и добавляем ее на страницу
    cardList.addItem(createNewCard({
      name: formValues.signature,
      link: formValues.picture}))

    //закрываем попап
    this.close();
  }
)
addPostPopup.setEventListeners();
addPostButton.addEventListener('click', function(){
  //сброс сообщений с ошибками
  addPostValid.clearErrors();
  //при каждом открытии попапа делаем кнопку неактивной, так как поля пустые//
  const submitButton = addPostForm.querySelector('.popup__save-button');
  addPostValid.disableSubmitButton(submitButton);
  //открытие попапа
  addPostPopup.open(); 
})

//===== Попап редактирования данных профиля =====

const editProfilePopup = new PopupWithForm ('.popup_type_edit-profile',
  function(formValues){
    //записываем новые данные о имени и статусе из форм ввода
    profile.setUserInfo(formValues.username, formValues.status)
    this.close()
  }
)
editProfilePopup.setEventListeners();
editProfileButton.addEventListener('click', function(){
  //сброс сообщений с ошибками
  editProfileValid.clearErrors();
  //заполнение форм текущими значениями из профиля
  document.forms.profileedit.username.value = profile.getUserInfo().username;
  document.forms.profileedit.status.value = profile.getUserInfo().status;
  //открытие попапа
  editProfilePopup.open()})

//===== Попап с открывающейся большой картинкой =====

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners()

//===== Функция, для передачи в класс Card метода из класса PopupWithImage

function handleCardClick(title, image) {
  imagePopup.open(title, image)
}