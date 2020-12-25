let openPopupButton = document.querySelector('.profile__edit-button') //переменная для кнопки редактирования
let closePopupButton = document.querySelector('.popup__close-button') //переменная для крестика закрытия попапа
let popup = document.querySelector('.popup') //переменная для попапа
let profileName = document.querySelector('.profile__name') //переменная для имени профиля
let profileStatus = document.querySelector('.profile__status') //переменная для статуса профиля
let nameEditArea = document.querySelector('.popup__input_textarea_name') //переменная для строки ввода нового имени
let statusEditArea = document.querySelector('.popup__input_textarea_status') //переменная для строки воода нового статуса

let profileEditForm = document.forms.profileedit //переменная для объекта-формы

// === Функция открывающая попап ===

function popupOpen () {
    popup.classList.add('popup_active') //делаем попап видимым
    nameEditArea.value = profileName.textContent //значения в формах по умолчанию берем из профиля
    statusEditArea.value = profileStatus.textContent //значения в формах по умолчанию берем из профиля
}

// === Функция закрывающая попап ===

function popupClose () {
    popup.classList.remove('popup_active') //делаем попап невидимым
}

// === Функция обработчик данных для формы ====

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    profileName.textContent = nameEditArea.value //в имя профиля записываем новые данные
    profileStatus.textContent = statusEditArea.value //в статус профиля записываем новые данные
    popupClose()
}

openPopupButton.addEventListener('click', popupOpen) //клик по кнопке редактирования вызывает функцию открытия попапа
closePopupButton.addEventListener('click', popupClose) //клик по кнопке крестик вызывает функцию закрытия попапа
profileEditForm.addEventListener('submit', handleFormSubmit)