let openPopupButton = document.querySelector('.profile__edit-button')
let overlay = document.querySelector('.overlay')
let closePopupButton = document.querySelector('.popup__close-button')

openPopupButton.addEventListener('click', () => {
    overlay.classList.add('overlay_active')
})

closePopupButton.addEventListener('click', () => {
    overlay.classList.remove('overlay_active')
})