import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    static selectors = {
        formSelector: '.form',
        inputSelector: '.form__text',
    }
    constructor(popupSelector, handleCardFormSubmit) {
        super(popupSelector);
        this._handleCardFormSubmit = handleCardFormSubmit;
        this._form = this._popupElement.querySelector(PopupWithForm.selectors.formSelector);
    }
    _getInputValues() {
        const inputValues = {};
        this._inputs = [...this._form.querySelectorAll(PopupWithForm.selectors.inputSelector)];
        this._inputs.forEach((inputElement) => {
            const inputName = inputElement.getAttribute('name');
            inputValues[inputName] = inputElement.value;
        });
        return inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', this._handleCardFormSubmit);
    }
    close() {
        super.close();
        this._form.reset();
    }
}
