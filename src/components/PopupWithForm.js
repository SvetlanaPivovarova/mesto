import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    static selectors = {
        formSelector: '.form',
        inputSelector: '.form__text',
        btnSubSelector: '.form__submit-btn'
    }
    constructor({ popupSelector, handleFormSubmit, api }) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(PopupWithForm.selectors.formSelector);
        this._inputList = this._form.querySelectorAll(PopupWithForm.selectors.inputSelector);
        this._api = api;
        this._subButton = this._form.querySelector(PopupWithForm.selectors.btnSubSelector);
        this._subButtontxt = this._subButton.textContent;
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
            this._api.renderLoading({
                isLoading: true,
                btnSubProgress: () => {
                    this._subButton.textContent = 'Сохранение...'
                },
                btnSub: () => {
                    this._subButton.textContent = this._subButtontxt;
                }
            } )
            // добавим вызов функции _handleFormSubmit
            // передадим ей объект — результат работы _getInputValues
            if (Object.keys(this._getInputValues()).length !== 0) {
                this._handleFormSubmit(this._getInputValues());
            }
            else {
                this._handleFormSubmit(evt);
            }
        });
    }
    close() {
        super.close();
        this._api.renderLoading({
            isLoading: false,
            btnSubProgress: () => {
                this._subButton.textContent = 'Сохранение...'
            },
            btnSub: () => {
                this._subButton.textContent = this._subButtontxt;
            }
        } )
        this._form.reset();
    }
}
