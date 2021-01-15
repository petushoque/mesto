// === Кнопки ===

let editProfileButton = document.querySelector('.profile__edit-button'); //переменная для кнопки редактирования профиля
let closeEditProfileButton = document.querySelector('.popup__close-button_type_edit-profile'); //переменная для крестика закрытия попапа с редактированием профиля
let addPostButton = document.querySelector('.profile__add-button'); //переменная для кнопки добавления нового поста
let closeAddPostButton = document.querySelector('.popup__close-button_type_add-post'); //переменная для крестика закрытия попапа с добавлением нового поста

// ===

let popupEditProfile = document.querySelector('.popup_type_edit-profile') //переменная для попапа с редактированием профиля
let popupAddPost = document.querySelector('.popup_type_add-post') //переменная для попапа с добавлением нового поста
let profileName = document.querySelector('.profile__name') //переменная для имени профиля
let profileStatus = document.querySelector('.profile__status') //переменная для статуса профиля
let nameEditArea = document.querySelector('.popup__input_textarea_name') //переменная для строки ввода нового имени
let statusEditArea = document.querySelector('.popup__input_textarea_status') //переменная для строки воода нового статуса
let profileEditForm = document.forms.profileedit //переменная для объекта-формы редактирования профиля
let addPostForm = document.forms.addpost //переменная для объекта-формы добавления нового поста

const elements = document.querySelector('.elements');

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

  const cardTemplate = document.querySelector('.card-template')

  function renderPost (data) {    
    const clone = cardTemplate.content.cloneNode(true);
    clone.querySelector('.card__picture').src = data.link;
    clone.querySelector('.card__signature').textContent = data.name;
    elements.appendChild(clone);
    console.log(cardTemplate.content); 
 }
 
 function renderPosts () {
   initialCards.forEach(renderPost)
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
    popupAddPost.classList.add('popup_active') //делаем попап видимым
}

// === Функция закрывающая попап редактирующий профиль ===

function popupCloseEditProfile() {
    popupEditProfile.classList.remove('popup_active'); //делаем попап невидимым
}

// === Функция закрывающая попап добавляющий новый пост ===

function popupCloseAddPost() {
    popupAddPost.classList.remove('popup_active'); //делаем попап невидимым
}

// === Функция обработчик данных для формы редактирования профиля ====

function handleFormSubmitEditProfile (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameEditArea.value //в имя профиля записываем новые данные
    profileStatus.textContent = statusEditArea.value //в статус профиля записываем новые данные
    popupCloseEditProfile() //закрываем попап
}



editProfileButton.addEventListener('click', popupOpenEditProfile); //клик по кнопке редактирования вызывает функцию открытия попапа
addPostButton.addEventListener('click', popupOpenAddPost); //клик по кнопке добавить пост вызывает функцию открытия попапа
closeEditProfileButton.addEventListener('click', popupCloseEditProfile); //клик по кнопке крестик вызывает функцию закрытия попапа
closeAddPostButton.addEventListener('click', popupCloseAddPost); //клик по кнопке крестик вызывает функцию закрытия попапа

profileEditForm.addEventListener('submit', handleFormSubmitEditProfile);
addPostForm.addEventListener('submit', handleFormSubmitAddPost);


function handleFormSubmitAddPost (evt) {
  evt.preventDefault(); 
  let signature = signatureArea.value;
  let picture = pictureArea.value;
  console.log(picture);

  const elements = document.querySelector('.elements');

  const card = document.createElement('article');
  card.classList.add('card');

  const cardPicture = document.createElement('img');
  cardPicture.classList.add('card__picture');
  cardPicture.src = picture;

  const cardInfo = document.createElement('div');
  cardInfo.classList.add('card__info');

  const cardSignature = document.createElement('h2');
  cardSignature.classList.add('card__signature');
  cardSignature.textContent = signature;

  const cardLikeButton = document.createElement('button');
  cardLikeButton.classList.add('card__like');
  cardLikeButton.type = 'button';

  cardInfo.append(cardSignature, cardLikeButton)
  card.append(cardPicture, cardInfo);
  elements.prepend(card);
  popupCloseAddPost()
}






/* =================================

  let addPostPopupButton = document.querySelector('.profile__add-button');
addPostPopupButton.addEventListener('click', openAddPostPopup);

РАБОЧИЙ МОМЕНТ СОЗДАНИЯ НОВОГО ПОПАПА ПОПАПА

function openAddPostPopup () {
    console.log("Hello");
    const addPostSection = document.createElement('section');
    addPostSection.classList.add('popup')
    addPostSection.classList.add('popup_active')
    popup.after(addPostSection);
    const addPostDivContainer = document.createElement('div');
    addPostDivContainer.classList.add('popup__container')
    addPostSection.append(addPostDivContainer);
    const messageHello = document.createElement('h1');
    messageHello.textContent = 'Hello';
    addPostDivContainer.append(messageHello);
    
}


function handleFormSubmitAddPost (evt) {
    evt.preventDefault(); 
    let signature = signatureArea.value;
    let picture = pictureArea.value;
    console.log(picture);

    const elements = document.querySelector('.elements');

    const card = document.createElement('article');
    card.classList.add('card');

    const cardPicture = document.createElement('img');
    cardPicture.classList.add('card__picture');
    cardPicture.src = picture;

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card__info');

    const cardSignature = document.createElement('h2');
    cardSignature.classList.add('card__signature');
    cardSignature.textContent = signature;

    const cardLikeButton = document.createElement('button');
    cardLikeButton.classList.add('card__like');
    cardLikeButton.type = 'button';

    cardInfo.append(cardSignature, cardLikeButton)
    card.append(cardPicture, cardInfo);
    elements.prepend(card);
    popupCloseAddPost()


//const elementsSection = document.querySelector('.elements');
//const cardTemplate = document.querySelector('.card').content;
//console.log(cardTemplate);
// клонируем содержимое тега template
//const cardElement = cardTemplate.cloneNode(true);
// наполняем содержимым
//console.log(cardElement);
//cardElement.querySelector('.card__picture').src = 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg';
//cardElement.querySelector('.card__signature').textContent = 'Архыз';
// отображаем на странице
//elementsSection.append(cardElement); 
*/

