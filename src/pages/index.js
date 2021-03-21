import './index.css';

import { editProfileButton } from '../utils/constants.js';
import { addPostButton } from '../utils/constants.js';
import { avatar } from '../utils/constants.js';
import { profileEditForm } from '../utils/constants.js';
import { addPostForm } from '../utils/constants.js';
import { editAvatarForm } from '../utils/constants.js';
import { deletePostForm } from '../utils/constants.js'

import {Card} from '../components/Card.js';
import {validationList, FormValidator} from '../components/FormValidator.js';

import { Section } from '../components/Section.js'

import { PopupWithImage } from '../components/PopupWithImage.js';
import { UserInfo } from '../components/UserInfo.js'
import { PopupWithForm } from '../components/PopupWithForm.js';

import { Api } from '../components/Api.js';

const api = new Api ('57e386f4-1a89-4d89-a10b-b49e88b17870', 'cohort-21');

api.getCards()
  .then((result) => {
    const cardList = new Section({ 
      data: result,
      renderer: (item) => {
        cardList.addItem(createNewCard(item))
        }
      },
      '.elements');
  cardList.renderItems();
  })
  .catch((err) => {
    console.log(err);
  });

  api.getUserInfo()
  .then((result) => {
    profile.setUserInfo(result.name, result.about);
    profile.setUserAvatar(result.avatar)
  })
  .catch((err) => {
    console.log(err);
  });

//===== Функция создания новой карточки =====

function createNewCard (data) {
    const card = new Card (data, '.card-template', handleCardClick);
    return card.generateCard();
}

//===== Валидация полей ввода формы с добавлением нового поста =====

const addPostValid = new FormValidator(validationList, addPostForm);
addPostValid.enableValidation();

//===== Валидация полей ввода формы с редактированием данных профиля =====

const editProfileValid = new FormValidator(validationList, profileEditForm);
editProfileValid.enableValidation();

//===== Валидация полей ввода формы с редактированием аватара =====

const editAvatarValid = new FormValidator(validationList, editAvatarForm);
editAvatarValid.enableValidation();

//===========================================================

const profile = new UserInfo({
  username: '.profile__name',
  status: '.profile__status',
  avatar: '.profile__avatar'})

//===== Попап добавления нового поста на страницу =====

const addPostPopup = new PopupWithForm ('.popup_type_add-post',
  function(formValues){
    //добавляем кнопке уведомление о загрузке
    this._popup.querySelector('.popup__save-button').textContent = 'Сохраниение...'
    //создаем по введенным в формы данным новую карточку и добавляем ее на страницу
    //по средстам АПИ передаем новую карточку на сервер
    api.postNewCard(formValues.signature, formValues.picture)
      .then((result) => {
        console.log(result)
        //отрисовываем карточку на странице
        const cardList = new Section({ 
        data: result,
        renderer: (item) => {
          cardList.addItem(createNewCard(item))
          }
        },
        '.elements');

        cardList.addItem(createNewCard(result))

        this.close()
      })
    //.then(this.close())
    .catch((err) => {
      console.log(err);
    });
    //закрываем попап
    //this.close();
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
    api.patchProfileInfo(formValues.username, formValues.status)
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

//===== Попап редактирования аватара =====

const editAvatarPopup = new PopupWithForm ('.popup_type_edit-avatar',
  function(formValues){
    api.patchProfileAvatar(formValues.avatar)
    profile.setUserAvatar(formValues.avatar)
    this.close()
  }
)
editAvatarPopup.setEventListeners()
avatar.addEventListener('click', function(){
  //сброс сообщений с ошибками
  editAvatarValid.clearErrors();
  //заполнение форм текущими значениями из профиля
  //document.forms.profileedit.username.value = profile.getUserInfo().username;
  //document.forms.profileedit.status.value = profile.getUserInfo().status;
  //открытие попапа
  editAvatarPopup.open()})

//===== Попап с открывающейся большой картинкой =====

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners()

//===== Функция, для передачи в класс Card метода из класса PopupWithImage

function handleCardClick(title, image) {
  imagePopup.open(title, image)
}






deletePostForm.addEventListener('submit', function(){
  console.log('Форма принимает значение')
})

