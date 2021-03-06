import {Card} from '../components/Card.js';
import {validationList, FormValidator} from '../scripts/FormValidator.js';
import {initialCards} from '../scripts/initialCards.js';


import { Section } from '../components/Section.js'

import { popupEditProfile } from '../utils/constants.js';
import { popupAddPost } from '../utils/constants.js';
import { popupImage } from '../utils/constants.js';
import { editProfileButton } from '../utils/constants.js';
import { closeEditProfileButton} from '../utils/constants.js';
import { closeAddPostButton } from '../utils/constants.js';
import { closeImageButton } from '../utils/constants.js';
import { addPostButton } from '../utils/constants.js';
import { profileEditForm } from '../utils/constants.js';
import { addPostForm } from '../utils/constants.js';

import { Popup } from '../components/Popup.js'

const cardList = new Section({ 
  data: initialCards,
  renderer: (item) => {
    const card = new Card (item, '.card-template');
    const cardElement = card.generateCard();
    cardList.addItem(cardElement);
    }
  },
  '.elements');


cardList.renderItems()

const addPostPopup = new Popup ('.popup_type_add-post');
addPostPopup.setEventListeners();


addPostButton.addEventListener('click', function(){addPostPopup.open()})







const addPostValid = new FormValidator(validationList, addPostForm);
addPostValid.enableValidation();

const editProfileValid = new FormValidator(validationList, profileEditForm);
editProfileValid.enableValidation();
/*


// === Общая функция открытия попапов ===

function openPopup(location) {
  location.classList.add('popup_active'); //делаем нужный попап видимым
  document.addEventListener('keydown', closePopupEscape); //при открытии попапа обработчик нажатия на оверлей добавляем
}

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

// === Функция открывающая попап c большой картинкой ===

function openImagePopup (evt) {
  openPopup(popupImage); //делаем попап видимым
  const image = evt.target.closest('.card__picture');
  bigImage.src = image.src;
  bigImage.alt = image.alt;
  bigImageSignature.textContent = image.alt;
}

// === Общая функция закрытия попапов ===

function closePopup(location) {
  location.classList.remove('popup_active');
  document.removeEventListener('keydown', closePopupEscape); //при закрытии попапа обработчик нажатия на оверлей убираем
}

// === Функция закрытия попапа при нажатии на Esc ===

function closePopupEscape (evt) {
  const popupOpened = document.querySelector('.popup_active');
  const key = evt.key;
  if (key === 'Escape') {
    closePopup(popupOpened)
  }
}

// === Функция закрытия попапа при клике по оверлею ===

function closePopupOverlay (formName) {
  formName.addEventListener('click', (evt) => {
    if (evt.target === evt.currentTarget) {
      closePopup(formName) 
    }
  });
}

// === Функция обработчик данных для формы редактирования профиля ===

function handleFormSubmitEditProfile (evt) {
  evt.preventDefault(); 
  profileName.textContent = nameEditArea.value //в имя профиля записываем новые данные
  profileStatus.textContent = statusEditArea.value //в статус профиля записываем новые данные
  closePopup(popupEditProfile) //закрываем попап
}

// === Функция обработчик данных для формы добавления новой карточки ===

function handleFormSubmitAddPost (evt) {
  evt.preventDefault();
  const newPost = [
    {
      name: signatureArea.value,
      link: pictureArea.value
    },
  ]
  renderElements(newPost)
  closePopup(popupAddPost) //закрываем попап
}

// === Добавить слушатель события по нажатию на оверлей всем формам ===

closePopupOverlay(popupEditProfile);
closePopupOverlay(popupAddPost);
closePopupOverlay(popupImage);

editProfileButton.addEventListener('click', openEditProfilePopup); //клик по кнопке редактирования вызывает функцию открытия попапа
closeEditProfileButton.addEventListener('click', function(){closePopup(popupEditProfile)}); //клик по кнопке крестик вызывает функцию закрытия попапа
profileEditForm.addEventListener('submit', handleFormSubmitEditProfile);

addPostButton.addEventListener('click', openAddPostPopup); //клик по кнопке добавить пост вызывает функцию открытия попапа
closeAddPostButton.addEventListener('click', function(){closePopup(popupAddPost)}); //клик по кнопке крестик вызывает функцию закрытия попапа
addPostForm.addEventListener('submit', handleFormSubmitAddPost);

closeImageButton.addEventListener('click', function(){closePopup(popupImage)});


*/