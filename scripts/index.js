// === Кнопки ===

let editProfileButton = document.querySelector('.profile__edit-button'); //переменная для кнопки редактирования профиля
let closeEditProfileButton = document.querySelector('.popup__close-button_type_edit-profile'); //переменная для крестика закрытия попапа с редактированием профиля
let addPostButton = document.querySelector('.profile__add-button'); //переменная для кнопки добавления нового поста
let closeAddPostButton = document.querySelector('.popup__close-button_type_add-post'); //переменная для крестика закрытия попапа с добавлением нового поста

// =========

let popupEditProfile = document.querySelector('.popup_type_edit-profile') //переменная для попапа с редактированием профиля
let popupAddPost = document.querySelector('.popup_type_add-post') //переменная для попапа с добавлением нового поста
let profileName = document.querySelector('.profile__name') //переменная для имени профиля
let profileStatus = document.querySelector('.profile__status') //переменная для статуса профиля
let nameEditArea = document.querySelector('.popup__input_textarea_name') //переменная для строки ввода нового имени
let statusEditArea = document.querySelector('.popup__input_textarea_status') //переменная для строки воода нового статуса

let profileEditForm = document.forms.profileedit //переменная для объекта-формы редактирования профиля
let addPostForm = document.forms.addpost //переменная для объекта-формы добавления нового поста

const elements = document.querySelector('.elements');
const cardTemplate = document.querySelector('.card-template')

let signatureArea = document.querySelector('.popup__input_textarea_signature');
let pictureArea = document.querySelector('.popup__input_textarea_picture');

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

//=== Функция создания карточки ===

function renderPost (data) {    
    const clone = cardTemplate.content.cloneNode(true);
    clone.querySelector('.card__picture').src = data.link;
    clone.querySelector('.card__signature').textContent = data.name;
    clone.querySelector('.card__delete').addEventListener('click', handleDeletePost);
    clone.querySelector('.card__like').addEventListener('click', handleLikePost);
    elements.prepend(clone);
}

//=== Функция заполнения страницы карточками из стартового массива ===

function renderPosts () {
   const revInitialCards = initialCards.reverse(); //переворачиваем массив, чтобы карточки отображались в нужном порядке
   revInitialCards.forEach(renderPost);
}
 
renderPosts ()

// === Функция открывающая попап редактирующий профиль ===

function popupOpenEditProfile () {
    popupEditProfile.classList.add('popup_active') //делаем попап видимым
    nameEditArea.value = profileName.textContent //значения в формах по умолчанию берем из профиля
    statusEditArea.value = profileStatus.textContent //значения в формах по умолчанию берем из профиля
}

// === Функция открывающая попап добавляющий пост ===

function popupOpenAddPost () {
    popupAddPost.classList.add('popup_active'); //делаем попап видимым
    signatureArea.value = ""; //очищаем поля, если в форму уже что-то вводили
    pictureArea.value = ""; //очищаем поля, если в форму уже что-то вводили
}

// === Функция закрывающая попап редактирующий профиль ===

function popupCloseEditProfile() {
    popupEditProfile.classList.remove('popup_active'); //делаем попап невидимым
}

// === Функция закрывающая попап добавляющий новый пост ===

function popupCloseAddPost() {
    popupAddPost.classList.remove('popup_active'); //делаем попап невидимым
}

// === Функция обработчик данных для формы редактирования профиля ===

function handleFormSubmitEditProfile (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameEditArea.value //в имя профиля записываем новые данные
    profileStatus.textContent = statusEditArea.value //в статус профиля записываем новые данные
    popupCloseEditProfile() //закрываем попап
}

// === Функция обработчик данных для формы добавления новой карточки ===

function handleFormSubmitAddPost (evt) {
  evt.preventDefault();
  let newPost = [
    {
      name: signatureArea.value,
      link: pictureArea.value
    },
  ]
  newPost.forEach(renderPost)
  popupCloseAddPost()
}

//=== Функция обработчик события, при клике по кнопке корзины карточка удаляется ===

function handleDeletePost (evt) {
    evt.target.closest('.card').remove();
}

//=== Функция обработчик события, при клике по кнопке лайка, вид кнопки меняется ===

function handleLikePost (evt) {
    evt.target.classList.toggle('card__like_active')
}

editProfileButton.addEventListener('click', popupOpenEditProfile); //клик по кнопке редактирования вызывает функцию открытия попапа
addPostButton.addEventListener('click', popupOpenAddPost); //клик по кнопке добавить пост вызывает функцию открытия попапа
closeEditProfileButton.addEventListener('click', popupCloseEditProfile); //клик по кнопке крестик вызывает функцию закрытия попапа
closeAddPostButton.addEventListener('click', popupCloseAddPost); //клик по кнопке крестик вызывает функцию закрытия попапа

profileEditForm.addEventListener('submit', handleFormSubmitEditProfile);
addPostForm.addEventListener('submit', handleFormSubmitAddPost);
