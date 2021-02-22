import {Card} from './Card.js';
import {validationList, FormValidator, clearErrors} from './FormValidator.js'

// === Кнопки ===

const editProfileButton = document.querySelector('.profile__edit-button'); //переменная для кнопки редактирования профиля
const closeEditProfileButton = document.querySelector('.popup__close-button_type_edit-profile'); //переменная для крестика закрытия попапа с редактированием профиля
const addPostButton = document.querySelector('.profile__add-button'); //переменная для кнопки добавления нового поста
const closeAddPostButton = document.querySelector('.popup__close-button_type_add-post'); //переменная для крестика закрытия попапа с добавлением нового поста
const closeImageButton = document.querySelector('.popup__close-button_type_image'); //переменная для крестика закрытия попапа с крупным изображением

// === Элементы страницы ===

const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //переменная для попапа с редактированием профиля
const popupAddPost = document.querySelector('.popup_type_add-post'); //переменная для попапа с добавлением нового поста
const popupImage = document.querySelector('.popup_type_image'); //переменная для попапа с просмотром картинки в большом разрешении
const profileName = document.querySelector('.profile__name'); //переменная для имени профиля
const profileStatus = document.querySelector('.profile__status') //переменная для статуса профиля

const nameEditArea = document.querySelector('.popup__input_textarea_name'); //переменная для строки ввода нового имени
const statusEditArea = document.querySelector('.popup__input_textarea_status'); //переменная для строки воода нового статуса

const signatureArea = document.querySelector('.popup__input_textarea_signature'); //переменная для строки ввода подписи к новому посту
const pictureArea = document.querySelector('.popup__input_textarea_picture'); //переменная для строки ввода ссылки на картинку для нового поста
const elements = document.querySelector('.elements'); //переменная для всего списка карточек
const cardTemplate = document.querySelector('.card-template') //переменная для шаблона карточки поста
const bigImage = document.querySelector('.popup__big-image'); //переменная для картинки в высоком разрешении
const bigImageSignature = document.querySelector('.popup__big-image-signature'); //переменная для подписи к картинке в высоком разрешении

//=== Формы с вводом данных ===

const profileEditForm = document.forms.profileedit; //переменная для объекта-формы редактирования профиля
const addPostForm = document.forms.addpost; //переменная для объекта-формы добавления нового поста

//=== Массив стартовых карточек ===

const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];

function renderElements (array) {
  array.forEach((item) => {
    const card = new Card (item, '.card-template', openImagePopup)
    const cardElement = card.generateCard();
    elements.prepend(cardElement);
  });
};

renderElements(initialCards.reverse());


// === Общая функция открытия попапов ===

function openPopup(location) {
  location.classList.add('popup_active'); //делаем нужный попап видимым
  document.addEventListener('keydown', closePopupEscape); //при открытии попапа обработчик нажатия на оверлей добавляем
}

// === Функция открывающая попап редактирующий профиль ===

function openEditProfilePopup () {
    openPopup(popupEditProfile); //делаем попап видимым
    clearErrors(popupEditProfile); //очищаем ошибки, если они были при прошлом вводе
    nameEditArea.value = profileName.textContent //значения в формах по умолчанию берем из профиля
    statusEditArea.value = profileStatus.textContent //значения в формах по умолчанию берем из профиля
}

// === Функция открывающая попап добавляющий пост ===

function openAddPostPopup () {
  openPopup(popupAddPost); //делаем попап видимым
  clearErrors(popupAddPost); //очищаем ошибки, если они были при прошлом вводе
  signatureArea.value = ""; //очищаем поля, если в форму уже что-то вводили
  pictureArea.value = ""; //очищаем поля, если в форму уже что-то вводили

  //при каждом открытии попапа делаем кнопку неактивной, так как поля пустые//
  const submitButton = popupAddPost.querySelector('.popup__save-button');
  submitButton.disabled = true;
  submitButton.classList.remove('popup__save-button_active')
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

const addPostValid = new FormValidator(validationList, addPostForm);
addPostValid.enableValidation();

const editProfileValid = new FormValidator(validationList, profileEditForm);
editProfileValid.enableValidation();