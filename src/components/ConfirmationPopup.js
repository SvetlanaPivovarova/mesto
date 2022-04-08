import {Popup} from "./Popup";

export class ConfirmationPopup extends Popup{
    static selectors = {
        formSelector: '.form',
        btnSubSelector: '.form__submit-btn'
    }
    constructor({popupSelector, handleFormSubmit}) {
        super(popupSelector);
        this._handleFormSubmit = handleFormSubmit;
        this._form = this._popupElement.querySelector(ConfirmationPopup.selectors.formSelector);
        this._subButton = this._form.querySelector(ConfirmationPopup.selectors.btnSubSelector);
    }
    submitButton() {
        return this._subButton;
    }

    setEventListeners() {
        super.setEventListeners();
        this._form.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit();
        })
    }
}