// === Кнопки ===

export const editProfileButton = document.querySelector('.profile__edit-button'); //переменная для кнопки редактирования профиля
export const addPostButton = document.querySelector('.profile__add-button'); //переменная для кнопки добавления нового поста

// === Элементы страницы ===

export const popupEditProfile = document.querySelector('.popup_type_edit-profile'); //переменная для попапа с редактированием профиля
export const popupAddPost = document.querySelector('.popup_type_add-post'); //переменная для попапа с добавлением нового поста
export const popupImage = document.querySelector('.popup_type_image'); //переменная для попапа с просмотром картинки в большом разрешении
export const profileName = document.querySelector('.profile__name'); //переменная для имени профиля
export const profileStatus = document.querySelector('.profile__status') //переменная для статуса профиля

export const nameEditArea = document.querySelector('.popup__input_textarea_name'); //переменная для строки ввода нового имени
export const statusEditArea = document.querySelector('.popup__input_textarea_status'); //переменная для строки воода нового статуса

export const signatureArea = document.querySelector('.popup__input_textarea_signature'); //переменная для строки ввода подписи к новому посту
export const pictureArea = document.querySelector('.popup__input_textarea_picture'); //переменная для строки ввода ссылки на картинку для нового поста
export const cardTemplate = document.querySelector('.card-template') //переменная для шаблона карточки поста
export const bigImage = document.querySelector('.popup__big-image'); //переменная для картинки в высоком разрешении
export const bigImageSignature = document.querySelector('.popup__big-image-signature'); //переменная для подписи к картинке в высоком разрешении

//=== Формы с вводом данных ===

export const profileEditForm = document.forms.profileedit; //переменная для объекта-формы редактирования профиля
export const addPostForm = document.forms.addpost; //переменная для объекта-формы добавления нового поста

export const editAvatarForm = document.forms.editavatar;
export const deletePostForm = document.forms.deletepost;