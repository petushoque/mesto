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
import { PopupWithSubmit } from '../components/PopupWithSubmit';

import { Api } from '../components/Api.js';

//===========================================================

let profile = new UserInfo({
  username: '.profile__name',
  status: '.profile__status',
  avatar: '.profile__avatar'})

profile.id = '';


const api = new Api ('57e386f4-1a89-4d89-a10b-b49e88b17870', 'cohort-21');

api.getCards()
  .then((result) => {
    //console.log(result)
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
    profile.setUserAvatar(result.avatar);

    profile.id = result._id
  })
  .catch((err) => {
    console.log(err);
  });

//function test(){console.log(profile)}
//setTimeout(test, 1000)

//===== Функция создания новой карточки =====

function createNewCard (data) {
    const card = new Card (data, '.card-template', profile.id, handleCardClick, handleDeleteCardClick, handleLikeClick);
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
        //создаем карточку
        const cardList = new Section({ 
        data: result,
        renderer: (item) => {
          cardList.addItem(createNewCard(item))
          }
        },
        '.elements');
        //отрисовываем ее на странице
        cardList.addItem(createNewCard(result))
        //закрываем попап
        this.close()
      })
    .catch((err) => {
      console.log(err);
    });
  }
)
addPostPopup.setEventListeners();
addPostButton.addEventListener('click', function(){
  //сброс сообщений с ошибками
  addPostValid.clearErrors();
  //при каждом открытии попапа делаем кнопку неактивной, так как поля пустые//
  const submitButton = addPostForm.querySelector('.popup__save-button');
  addPostValid.disableSubmitButton(submitButton);
  //сброс кнопки "Сохранить"
  submitButton.textContent = 'Сохранить'
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
    //добавляем кнопке уведомление о загрузке
    this._popup.querySelector('.popup__save-button').textContent = 'Сохраниение...';
    //отправляем через АПИ ссылку на новый аватар
    api.patchProfileAvatar(formValues.avatar)
    //устанавливаем новую картинку из ответа от сервера
    .then((result) => {
    profile.setUserAvatar(result.avatar)
    this.close()
    })
    .catch((err) => {
      console.log(err);
    });
  }
)
editAvatarPopup.setEventListeners()
avatar.addEventListener('click', function(){
  //сброс сообщений с ошибками
  editAvatarValid.clearErrors();
  //сброс кнопки "Сохранить"
  editAvatarForm.querySelector('.popup__save-button').textContent = 'Сохранить';
  //открытие попапа
  editAvatarPopup.open()})

//===== Попап с открывающейся большой картинкой =====

const imagePopup = new PopupWithImage ('.popup_type_image');
imagePopup.setEventListeners()

const deletePostPopup = new PopupWithSubmit ('.popup_type_delete-post', 
  function(){
      //отправка запроса об удалении карточки через API
      api.deleteCard(deletePostPopup.cardId)

      //удаляем выбранную карточку на фронтенде
      deletePostPopup.selectedCard.remove()

      //закрываем попап
      this.close()
  }
);
deletePostPopup.setEventListeners()

//===== Функция, для передачи в класс Card метода из класса PopupWithImage

function handleCardClick(title, image) {
  imagePopup.open(title, image)
}

function handleDeleteCardClick(id, selectedCard) {
  deletePostPopup.cardId = id;
  deletePostPopup.selectedCard = selectedCard;
  deletePostPopup.open();
}

function handleLikeClick (cardId) {
  if(this._isLiked()){
    api.deleteLikePost(cardId)
    .then((result) => {
      this._listOfLikes = result.likes.map((item) => item._id)
      this._element.querySelector('.card__like-counter').textContent = this._listOfLikes.length;
      this._element.querySelector('.card__like').classList.remove('card__like_active');
      })
      .catch((err) => {
        console.log(err);
      });
    //this._element.querySelector('.card__like').classList.remove('card__like_active');
  }

  else {
  api.putLikePost(cardId)
  .then((result) => {
    this._listOfLikes = result.likes.map((item) => item._id)
    this._element.querySelector('.card__like-counter').textContent = this._listOfLikes.length;
    this._element.querySelector('.card__like').classList.add('card__like_active');
    })
    .catch((err) => {
      console.log(err);
    });;
  //this._element.querySelector('.card__like').classList.add('card__like_active');
  }

}
