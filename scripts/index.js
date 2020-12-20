let openPopupButton = document.querySelector('.profile__edit-button')
let overlay = document.querySelector('.overlay')
let closePopupButton = document.querySelector('.popup__close-button')

openPopupButton.addEventListener('click', () => {
    overlay.classList.add('overlay_active')
})

closePopupButton.addEventListener('click', () => {
    overlay.classList.remove('overlay_active')
})


// Находим форму в DOM
let saveButton = document.querySelector('.popup__save-button')

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function handleFormSubmit (evt) {
    evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                        // Так мы можем определить свою логику отправки.
                        // О том, как это делать, расскажем позже.

    // Находим поля формы в DOM
    let nameEdit = document.querySelector('.popup__name-edit').value
    let statusEdit = document.querySelector('.popup__status-edit').value

    //nameEdit.value = '';
    //statusEdit.value = '123'

    let profileName = document.querySelector('.profile__name')
    let profileStatus = document.querySelector('.profile__status')

    profileName.innerHTML = `${nameEdit}`
    profileStatus.innerHTML = `${statusEdit}`
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
saveButton.addEventListener('click', handleFormSubmit); 