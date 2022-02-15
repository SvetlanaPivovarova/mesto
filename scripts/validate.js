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
    const inputs = [...form.querySelectorAll(config.inputSelector)];
        inputs.forEach(input => input.addEventListener('input', () => {
            toggleButtonState(form, config);
            handleField(form, input, config);
        }));

    form.addEventListener('submit', handleSubmit);

    toggleButtonState(form, config);
    form.addEventListener('reset', () => toggleButtonStateAfterResetForm(form, config));
}

function toggleButtonState(form, config) {
    const button = form.querySelector(config.submitButtonSelector);

    button.disabled = !form.checkValidity();
    button.classList.toggle(config.inactiveButtonClass, !form.checkValidity());
}

function handleField(form, input, config) {
    if (input.validity.valid) {
        hideError(form, input, config);
    }
    else {
        showError(form, input, config);
    }
}

function handleSubmit(event) {
    event.preventDefault();
}

function toggleButtonStateAfterResetForm(form, config) {    //деактивация кнопки отправки формы после очистки полей формы
    const buttonElement = form.querySelector(config.submitButtonSelector);

    buttonElement.disabled = true;
    buttonElement.classList.toggle(config.inactiveButtonClass);
}

function showError(form, input, config) {
    const errorElement = form.querySelector(`#${input.name}-error`);
    
    input.classList.add(config.inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(config.errorClass);
}

function hideError(form, input, config) {
    const errorElement = form.querySelector(`#${input.name}-error`);

    input.classList.remove(config.inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(config.errorClass);
}

enableValidation(formConfig);