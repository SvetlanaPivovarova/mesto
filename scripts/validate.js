//данные настроек валидации в виде объекта хранятся в data.js
//в data.js выполнена деструктуризация объекта настроек

function enableValidation() {
    const forms = [...document.querySelectorAll(formSelector)];

    forms.forEach(form => addFormListeners(form));
}

function addFormListeners(form) {
    const inputs = [...form.querySelectorAll(inputSelector)];
        inputs.forEach(input => input.addEventListener('input', () => {
            toggleButtonState(form);
            handleField(form, input);
        }));

    form.addEventListener('submit', handleSubmit);

    toggleButtonState(form);
    form.addEventListener('reset', () => toggleButtonStateAfterResetForm(form));
}

function toggleButtonState(form) {
    const button = form.querySelector(submitButtonSelector);

    button.disabled = !form.checkValidity();
    button.classList.toggle(inactiveButtonClass, !form.checkValidity());
}

function handleField(form, input) {
    if (input.validity.valid) {
        hideError(form, input);
    }
    else {
        showError(form, input);
    }
}

function handleSubmit(event) {
    event.preventDefault();
}

function toggleButtonStateAfterResetForm(form) {    //деактивация кнопки отправки формы после очистки полей формы
    const buttonElement = form.querySelector(submitButtonSelector);

    buttonElement.disabled = true;
    buttonElement.classList.toggle(inactiveButtonClass);
}

function showError(form, input) {
    const errorElement = form.querySelector(`#${input.name}-error`);
    
    input.classList.add(inputErrorClass);
    errorElement.textContent = input.validationMessage;
    errorElement.classList.add(errorClass);
}

function hideError(form, input) {
    const errorElement = form.querySelector(`#${input.name}-error`);

    input.classList.remove(inputErrorClass);
    errorElement.textContent = '';
    errorElement.classList.remove(errorClass);
    console.log(errorElement);
}

enableValidation();