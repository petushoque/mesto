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

//=== Функция создания карточки ===

function getNewCard (data) {    
    const clone = cardTemplate.content.cloneNode(true);
    const image = clone.querySelector('.card__picture');

    image.src = data.link;
    image.alt = data.name;
    image.addEventListener('click', openImagePopup);
    clone.querySelector('.card__signature').textContent = data.name;
    clone.querySelector('.card__delete').addEventListener('click', handleDeletePost);
    clone.querySelector('.card__like').addEventListener('click', handleLikePost);
    
    return clone;
}

//=== Функция добавления карточки на страницу ===

function renderPost (data) {
  const card = getNewCard(data)
  elements.prepend(card);
}

//=== Функция создания карточек из стартового массива ===

function renderPosts () {
   const revInitialCards = initialCards.reverse(); //переворачиваем массив, чтобы карточки отображались в нужном порядке
   revInitialCards.forEach(renderPost);
}
 
renderPosts ()

// === Общая функция открытия попапов ===

function openPopup(location) {
  location.classList.add('popup_active'); //делаем нужный попап видимым
  closePopupOverlay(location); //навешиваем обработчик события для клика по оверлею
  closePopupEscape(location); //навешиваем обработчик события для клавиши Esc
}

// === Функция открывающая попап редактирующий профиль ===

function openEditProfilePopup () {
    openPopup(popupEditProfile);
    nameEditArea.value = profileName.textContent //значения в формах по умолчанию берем из профиля
    statusEditArea.value = profileStatus.textContent //значения в формах по умолчанию берем из профиля
}

// === Функция открывающая попап добавляющий пост ===

function openAddPostPopup () {
    openPopup(popupAddPost);
    signatureArea.value = ""; //очищаем поля, если в форму уже что-то вводили
    pictureArea.value = ""; //очищаем поля, если в форму уже что-то вводили

    //при каждом открытии попапа делаем кнопку неактивной, так как поля пустые//
    const submitButton = popupAddPost.querySelector('.popup__save-button');
    submitButton.disabled = true;
    submitButton.classList.remove('popup__save-button_active')
}

// === Функция открывающая попап с крупной картинкой и подписью места ===

function openImagePopup (evt) {
  openPopup(popupImage);
  const image = evt.target.closest('.card__picture');
  bigImage.src = image.src;
  bigImage.alt = image.alt;
  bigImageSignature.textContent = image.alt; 
}

// === Общая функция закрытия попапов ===

function closePopup(location) {
  location.classList.remove('popup_active')

  //дальше тестовая функция
  clearErrors(location);
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
  newPost.forEach(renderPost)
  closePopup(popupAddPost)
}

// === Функция обработчик события, при клике по кнопке корзины карточка удаляется ===

function handleDeletePost (evt) {
    evt.target.closest('.card').remove();
}

// === Функция обработчик события, при клике по кнопке лайка, вид кнопки меняется ===

function handleLikePost (evt) {
    evt.target.classList.toggle('card__like_active')
}

// === Слушатели событий для кнопок ===

editProfileButton.addEventListener('click', openEditProfilePopup); //клик по кнопке редактирования вызывает функцию открытия попапа
addPostButton.addEventListener('click', openAddPostPopup); //клик по кнопке добавить пост вызывает функцию открытия попапа
closeEditProfileButton.addEventListener('click', function(){closePopup(popupEditProfile)}); //клик по кнопке крестик вызывает функцию закрытия попапа
closeAddPostButton.addEventListener('click', function(){closePopup(popupAddPost)}); //клик по кнопке крестик вызывает функцию закрытия попапа
closeImageButton.addEventListener('click', function(){closePopup(popupImage)}); //клик по кнопке крестик вызывает функцию закрытия попапа

// === Слушатели событий для форм ===

profileEditForm.addEventListener('submit', handleFormSubmitEditProfile);
addPostForm.addEventListener('submit', handleFormSubmitAddPost);

// === Функция отображения ошибок ===

const showInputError = (formElement, inputElement, errorMessage, validationList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationList.inputErrorClass);
  errorElement.textContent = errorMessage;
};

// === Функция скрытия ошибок ===

const hideInputError = (formElement, inputElement, validationList) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationList.inputErrorClass);
  errorElement.textContent = '';
};

// === Функция отображения или скрытия сообщений с ошибками ===

function isValid(formElement, inputElement, validationList) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, validationList);
  } else {
    hideInputError(formElement, inputElement, validationList);
  }
}

// === Функция проверки валидности в полях ввода ===

function hasInvalidInput(inputList) {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  })
}

// === Функция изменения состояния кнопки сабмит в зависимости от валидности инпутов ===

const toggleButtonState = (inputList, buttonElement, validationList) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.classList.remove(validationList.activeButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.add(validationList.activeButtonClass);
    buttonElement.disabled = false;
  }
}; 

// === Функция добавдения слушателей событий всем полям ввода ===

const setEventListeners = (formElement, validationList) => {
  const inputList = Array.from(formElement.querySelectorAll(validationList.inputSelector));
  const buttonElement = formElement.querySelector(validationList.submitButtonSelector);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', function () {
      isValid(formElement, inputElement, validationList);
      toggleButtonState(inputList, buttonElement, validationList);
    });
  });
};

// === Функция поиска всех форм на странице ===

function enableValidation(validationList){
  const formList = Array.from(document.querySelectorAll(validationList.formSelector));
  formList.forEach((formElement) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });
    setEventListeners(formElement, validationList);
});
}

// === ЗАПУСК ПРОВЕРКИ ВАЛИДАЦИИ ПОЛЕЙ ВВОДА ===

enableValidation(validationList)

//=== Функция, очищающая поля с ошибками, если закрыть форму и открыть ее заново ===

function clearErrors (formName) {
  const errorList = Array.from(formName.querySelectorAll('.popup__input-error'));
  //стираем все сообщения ошибок
  errorList.forEach((errorMessage) => {
    errorMessage.textContent = "";
  })
  const inputList = Array.from(formName.querySelectorAll('.popup__input'));
  //убираем класс с ошибками у полей ввода
  inputList.forEach((inputArea) => {
    inputArea.classList.remove('popup__input_type_error')
  })
}

// === Функция закрытия попапа при клике по оверлею ===

function closePopupOverlay (formName) {
    formName.addEventListener('click', (evt) => {
      if (evt.target === evt.currentTarget) {
        closePopup(formName) 
      }
    });
}

// === Функция закрытия попапа при нажатии на Esc ===

function closePopupEscape (formName) {
  document.addEventListener('keydown', (evt) => {
    const key = evt.key;
    if (key === 'Escape') {
      closePopup(formName)
    }
  })
}
