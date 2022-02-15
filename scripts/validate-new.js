const formConfig = {
    formSelector: '.form',
    inputSelector: '.form__text',
    inputErrorClass: 'form__text_type_error',
    errorClass: 'form__error_visible',
    submitButtonSelector: '.form__submit-btn',
    inactiveButtonClass: 'form__submit-btn_disabled'
}

function enableValidation(data) {
    const forms = [...document.querySelectorAll(data.formSelector)];
    forms.forEach(form => addFormListeners(form, data));
    
}

function addFormListeners(form, config) {
    console.log(form, config);

    form.addEventListener('submit', handleSubmit);
  //  form.addEventListener('input', () => toggleButtonState(form, config));

    const inputs = [...form.querySelectorAll(config.inputSelector)];
        inputs.forEach(input => input.addEventListener('input', () => {
            toggleButtonState(form, config);
            handleField(form, input, config);
        }));

    toggleButtonState(form, config);
    form.addEventListener('reset', () => toggleButtonStateAfterResetForm(form, config));
}

function handleSubmit(event) {
    event.preventDefault();
}

function handleField(form, input, config) {
    console.log(input.validity);
    if (input.validity.valid) {
        hideError(form, input, config);
    }
    else {
        showError(form, input, config);
    }
}

function showError(form, input, config) {
    input.classList.add(config.inputErrorClass);

    const errorElement = form.querySelector(`#${input.name}-error`);
    console.log(errorElement);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);

}

function hideError(form, input, config) {
    input.classList.remove(config.inputErrorClass);

    const errorElement = form.querySelector(`#${input.name}-error`);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

function toggleButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);

    console.log(form.checkValidity());

    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function toggleButtonStateAfterResetForm(form, config) {    //деактивация кнопки отправки формы после очистки полей формы
    const buttonElement = form.querySelector(config.submitButtonSelector);
    buttonElement.disabled = true;
    buttonElement.classList.toggle(config.inactiveButtonClass);
}

enableValidation(formConfig);