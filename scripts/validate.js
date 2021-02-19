/*
const validationList = {
  formSelector: '.popup',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  activeButtonClass: 'popup__save-button_active',
  inputErrorClass: 'popup__input_type_error',
  errorClass: '.popup__input-error'
}

class FormValidator {

  constructor(){
    this._validationList = validationList;
  }
  
  showInputError = (formElement, inputElement, errorMessage, _validationList) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationList.inputErrorClass);
    errorElement.textContent = errorMessage;
  };

  hideInputError = (formElement, inputElement, _validationList) => {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationList.inputErrorClass);
    errorElement.textContent = '';
  };

  isValid(formElement, inputElement, _validationList) {
    if (!inputElement.validity.valid) {
      showInputError(formElement, inputElement, inputElement.validationMessage, validationList);
    } else {
      hideInputError(formElement, inputElement, _validationList);
    }
  }

  hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    })
  }

  toggleButtonState (inputList, buttonElement, _validationList) {
    if (hasInvalidInput(inputList)) {
      buttonElement.classList.remove(validationList.activeButtonClass);
      buttonElement.disabled = true;
    } else {
      buttonElement.classList.add(validationList.activeButtonClass);
      buttonElement.disabled = false;
    }
  };

  setEventListeners = (formElement, _validationList) => {
    const inputList = Array.from(formElement.querySelectorAll(validationList.inputSelector));
    const buttonElement = formElement.querySelector(validationList.submitButtonSelector);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        isValid(formElement, inputElement, validationList);
        toggleButtonState(inputList, buttonElement, _validationList);
      });
    });
  };

  enableValidation(_validationList){
    const formList = Array.from(document.querySelectorAll(validationList.formSelector));
    formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
      setEventListeners(formElement, _validationList);
    });
  }

  enableValidation(_validationList);

}


//const test = new FormValidator

//test.enableValidation

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


*/


const validationList = {
    formSelector: '.popup',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save-button',
    activeButtonClass: 'popup__save-button_active',
    inputErrorClass: 'popup__input_type_error',
    errorClass: '.popup__input-error'
}

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