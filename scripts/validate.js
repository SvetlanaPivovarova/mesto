const formConfig = {                            //параметры проверки валидности форм на странице
    formSelector: '.form',
    inputSelector: '.form__text',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__error_visible',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled'
}

function enableValidation(data) {               //функция проверки валидации
    const forms = Array.from(document.querySelectorAll(data.formSelector));  //создать массив из всех форм на странице
    forms.forEach(form => addFormListeners(form, data));    //обойти методом forEach 
    console.log(forms);
}

function addFormListeners(form, config) {       //функция добавления слушателей к событиям submit, input, и каждому элементу массива всех полей
    form.addEventListener('submit', handleSubmit);
    const inputs = Array.from(document.querySelectorAll(config.inputSelector));
    inputs.forEach((input) => {
        input.addEventListener('input', (form, inputElement, config) => {
            handleField(form, inputElement, config);
            toggleButtonState(form, config);
            }    
        )
    });
    toggleButtonState(form, config);
    form.addEventListener('reset', () => toggleButtonStateAfterResetForm(form, config));
}

const setEventListeners = (formElement) => {
   // const inputList = Array.from(formElement.querySelectorAll('.form__input'));
    const buttonElement = formElement.querySelector('.form__submit');
    toggleButtonState(inputList, buttonElement);
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', function () {
        checkInputValidity(formElement, inputElement);
        toggleButtonState(inputList, buttonElement);
        
      });
    });
  };

function handleSubmit(evt) {                    //функция обработки события Submit формы - отменя отправки форму по умолчанию
    evt.preventDefault();
}

const handleField = (form, input, config) => {     //функция проверки валидности полей
   if (input.validity.valid) {
    hideError(form, input, config);
   }
   else {
    showError(form, input, config);
   }
}

//function handleField(form, input, config) {     //функция проверки валидности полей 
   // if (input.validity.valid) { 
   //  hideError(form, input, config); 
//} 
   // else { 
  //   showError(form, input, config); 
  //  } 
 //} 


function showError(form, input, config) {       //функция показа сообщения об ошибке заполнения поля
    const errorElement = form.querySelector(`#${input.id}-error`);
    console.log(errorElement);
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(form, input, config) {       //функция скрытия сообщения об ошибке
    input.classList.remove(config.inputErrorClass);
    const errorElement = form.querySelector(`#${input.id}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(form, config) {      //функция дезактивации/активации кнопки отправки формы
    const buttonElement = form.querySelector(config.submitButtonSelector);
    buttonElement.disabled = !form.checkValidity();
    buttonElement.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function toggleButtonStateAfterResetForm(form, config) {    //деактивация кнопки отправки формы после очистки полей формы
    const buttonElement = form.querySelector(config.submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.toggle(config.inactiveButtonClass);
}


//включение валидации вызовом enableValidation, все настройки передаются при вызове ссылкой на объект

enableValidation(formConfig);