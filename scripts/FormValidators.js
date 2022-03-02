export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._config = settings;
    }
    _handleSubmit(event) {
        event.preventDefault();
    }
    _toggleButtonState() {
        const button = this._form.querySelector(this._config.submitButtonSelector);
    
        button.disabled = !this._form.checkValidity();
        button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
    }
    _showError(input) {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
        
        input.classList.add(this._config.inputErrorClass);
        errorElement.textContent = input.validationMessage;
        errorElement.classList.add(this._config.errorClass);
    }
    
    _hideError(input) {
        const errorElement = this._form.querySelector(`#${input.name}-error`);
    
        input.classList.remove(this._config.inputErrorClass);
        errorElement.textContent = '';
        errorElement.classList.remove(this._config.errorClass);
    }
    _handleField(input) {
        if (input.validity.valid) {
            this._hideError(this._form, input, this._config);
        }
        else {
            this._showError(this._form, input, this._config);
        }
    }
    _toggleButtonStateAfterResetForm() {    //деактивация кнопки отправки формы после очистки полей формы
        const buttonElement = this._form.querySelector(this._config.submitButtonSelector);
    
        buttonElement.disabled = true;
        buttonElement.classList.toggle(this._config.inactiveButtonClass);
    }
    _addFormListeners() {
        this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
            this._inputs.forEach(input => input.addEventListener('input', () => {
                this._toggleButtonState();
                this._handleField(input);
            }));
    
        this._form._addEventListener('submit', _handleSubmit);
    
        this._toggleButtonState(form, config);
        this._form.addEventListener('reset', () => this._toggleButtonStateAfterResetForm());
    }
    
    enableValidation() {
        this._form._addFormListeners();
    }
}
