import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    static selectors = {
        popupSelector: '.popup_type_image',
        //formNewPlace: '[name="new-place-card"]',
        //imageSelector: '.popup__image-item',
        //captionSelector: '.popup__title_type_image-caption'
    }
    constructor() {
        super(PopupWithImage.selectors.popupSelector);
        //this._previewImage = document.querySelector(PopupWithImage.selectors.imageSelector);
        //this._previewCaption = document.querySelector(PopupWithImage.selectors.captionSelector);
        //this._handleCardClick = handleCardClick;
    }
    open() {
        super.open();
        //this._previewImage.src = link;
        //this._previewCaption.textContent = name;
        //this._previewImage.alt = name;
        //this._handleCardClick(); //?
    }
}
