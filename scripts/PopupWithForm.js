import {Popup} from "./Popup.js";

export class PopupWithForm extends Popup {
    static selectors = {
        //popupSelector: '.',
        formSelector: '.form',
        inputSelector: '.form__text',
       // inputTitleSelector: '.form__text_type_place-title',
       // inputLinkSelector: '.form__text_type_place-link'
    }
    constructor(popupSelector, handleCardFormSubmit) {
        super(popupSelector);
        this._handleCardFormSubmit = handleCardFormSubmit;
        this._form = this._popupElement.querySelector(PopupWithForm.selectors.formSelector);
    }
    _getInputValues() {
        this._inputs = [...this._form.querySelectorAll(PopupWithForm.selectors.inputSelector).value]; //массив всех инпутов
        //const cardInputTitle = this._form.querySelector(PopupWithForm.selectors.inputTitleSelector); //выбрать поле Название
        //const cardInputLink = this._form.querySelector(PopupWithForm.selectors.inputLinkSelector);    //выбрать поле ссылка
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
