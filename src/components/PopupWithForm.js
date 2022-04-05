import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    static selectors = {
        formSelector: '.form',
        inputSelector: '.form__text',
    }
    constructor({ popupSelector, handleFormSubmit, api }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(PopupWithForm.selectors.formSelector);
        this._inputList = this._form.querySelectorAll(PopupWithForm.selectors.inputSelector);
        this._api = api;
    }
    _getInputValues() {
        this._inputValues = {};
        this._inputList.forEach(input => this._inputValues[input.name] = input.value);
        return this._inputValues;
    }
    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();

            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues

            if (Object.keys(this._getInputValues()).length !== 0) {
                console.log(this._getInputValues());
                this._handleFormSubmit(this._getInputValues());
            }
            else {
                this._handleFormSubmit(evt);
            }
        });
    }
    close() {
        super.close();
        this._form.reset();
    }
}
