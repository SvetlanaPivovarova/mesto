export class FormValidator {
    constructor(settings, form) {
        this._form = form;
        this._config = settings;
    }
    
    _handleSubmit(event) {
        event.preventDefault();
    }

    _toggleButtonState() {
        this._button.disabled = !this._form.checkValidity();
        this._button.classList.toggle(this._config.inactiveButtonClass, !this._form.checkValidity());
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
            this._hideError(input);
        }
        else {
            this._showError(input);
        }
    }

    _disableButton() {    //деактивация кнопки отправки формы после очистки полей формы
        this._button.disabled = true;
        this._button.classList.add(this._config.inactiveButtonClass);
    }

    _addFormListeners() {
        this._button = this._form.querySelector(this._config.submitButtonSelector);
        this._inputs = [...this._form.querySelectorAll(this._config.inputSelector)];
            
        this._inputs.forEach(input => input.addEventListener('input', () => {   
            this._toggleButtonState();
            this._handleField(input); 
        }));
    
        this._form.addEventListener('submit', this._handleSubmit);
    
        this._toggleButtonState();
        this._form.addEventListener('reset', () => this._disableButton());
    }
    
    enableValidation() {
        this._addFormListeners();
    }
}
