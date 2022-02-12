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
}

function addFormListeners(form, config) {       //функция добавления слушателей к событиям submit, input, и каждому элементу массива всех полей
    form.addEventListener('submit', enableValidation);
    form.addEventListener('input', () => toggleButtonState(form, config));
    const inputs = Array.from(document.querySelectorAll(config.inputSelector));
    inputs.forEach(input => input.addEventListener('input', () => handleField(form, input, config)));
    toggleButtonState(form, config);
}

function handleSubmit(evt) {                    //функция обработки события Submit формы - отменя отправки форму по умолчанию
    evt.preventDefault();
}

function handleField(form, input, config) {     //функция проверки валидности полей
   if (input.validity.valid) {
    hideError(form, input, config);
   }
   else {
    showError(form, input, config);
   }
}

function showError(form, input, config) {       //функция показа сообщения об ошибке заполнения поля
    input.classList.add(config.inputErrorClass);
    const errorElement = form.querySelector(`#${input.name}-error`);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(form, input, config) {       //функция скрытия сообщения об ошибке
    input.classList.remove(config.inputErrorClass);
    const errorElement = form.querySelector(`#${input.name}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(congig.errorClass);
}

function toggleButtonState(form, config) {      //функция дезактивации.активации кнопки отправки формы
    const buttonElement = form.querySelector(config.submitButtonSelector);
    buttonElement.disabled = !form.checkValidity();
    buttonElement.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

//включение валидации вызовом enableValidation, все настройки передаются при вызове ссылкой на объект

enableValidation(formConfig);