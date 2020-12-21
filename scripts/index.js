let openPopupButton = document.querySelector('.profile__edit-button')
let overlay = document.querySelector('.overlay')
let closePopupButton = document.querySelector('.popup__close-button')

let nameEdit = document.querySelector('.popup__name-edit')
let statusEdit = document.querySelector('.popup__status-edit')
let profileName = document.querySelector('.profile__name')
let profileStatus = document.querySelector('.profile__status')

// === Функция открывающая попап ===

openPopupButton.addEventListener('click', () => {
    overlay.classList.add('overlay_active')
    nameEdit.value = `${profileName.textContent}` //значения в формах по умолчанию берем из HTML
    statusEdit.value = `${profileStatus.textContent}` //значения в формах по умолчанию берем из HTML
})

// ===Функция закрывающая попап

closePopupButton.addEventListener('click', () => {
    overlay.classList.remove('overlay_active')
})

let saveButton = document.querySelector('.popup__save-button')

function handleFormSubmit (evt) {
    evt.preventDefault(); 
    let nameEditValue = document.querySelector('.popup__name-edit').value //берем текст в поле имя
    let statusEditValue = document.querySelector('.popup__status-edit').value //берем текст в поле статус
    profileName.innerHTML = `${nameEditValue}` //вставляем новые значения в HTML
    profileStatus.innerHTML = `${statusEditValue}` //вставляем новые значения в HTML
    overlay.classList.remove('overlay_active') //зыкраываем попап
}

saveButton.addEventListener('click', handleFormSubmit); 



/* ================ Запасная рабочая кнопка сохранить ===================

let saveButton = document.querySelector('.popup__save-button')

function handleFormSubmit (evt) {
    evt.preventDefault(); 

    let nameEdit = document.querySelector('.popup__name-edit').value
    let statusEdit = document.querySelector('.popup__status-edit').value

    let profileName = document.querySelector('.profile__name')
    let profileStatus = document.querySelector('.profile__status')

    profileName.innerHTML = `${nameEdit}`
    profileStatus.innerHTML = `${statusEdit}`
}

saveButton.addEventListener('click', handleFormSubmit); 
*/