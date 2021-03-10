export const validationList = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__input-error'
}

export class FormValidator {

  constructor(validationList, form){
    this._validationList = validationList;
    this._formCheck = form;
  }

  _showInputError (inputElement, errorMessage) {
    const errorElement = this._formCheck.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._validationList.inputErrorClass);
    errorElement.textContent = errorMessage;
  };
  
  _hideInputError (inputElement) {
    const errorElement = this._formCheck.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._validationList.inputErrorClass);
    errorElement.textContent = '';
  };

  _isValid (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement, inputElement.validationMessage);
    } else {
      this._hideInputError(inputElement);
    }
}

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
}

  _toggleButtonState(inputList, buttonElement) {
    if (this._hasInvalidInput(inputList)) {
      this.disableSubmitButton(buttonElement);
    } else {
      this._enableSubmitButton(buttonElement);
    }
};

  _setEventListeners(){
    const inputList = Array.from(this._formCheck.querySelectorAll(this._validationList.inputSelector));
    const buttonElement = this._formCheck.querySelector(this._validationList.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._isValid(inputElement);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
  }

  enableValidation(){
    this._formCheck.addEventListener('submit', (evt) => {
        evt.preventDefault();
    });
    this._setEventListeners();
  }

  disableSubmitButton(buttonElement){
    buttonElement.classList.remove(this._validationList.activeButtonClass);
    buttonElement.disabled = true;
  }

  _enableSubmitButton(buttonElement){
    buttonElement.classList.add(this._validationList.activeButtonClass);
    buttonElement.disabled = false;
  }

  //=== Функция, очищающая поля с ошибками, если закрыть форму и открыть ее заново ===

  clearErrors () {
    const errorList = Array.from(this._formCheck.querySelectorAll('.popup__input-error'));
  //стираем все сообщения ошибок
    errorList.forEach((errorMessage) => {
      errorMessage.textContent = "";
    })
    const inputList = Array.from(this._formCheck.querySelectorAll('.popup__input'));
  //убираем класс с ошибками у полей ввода
    inputList.forEach((inputArea) => {
      inputArea.classList.remove('popup__input_type_error')
    })
  }
}

