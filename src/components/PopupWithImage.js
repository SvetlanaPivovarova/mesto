import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    static selectors = {
        imageSelector: '.popup__image-item',
        captionSelector: '.popup__title_type_image-caption'
    }
    constructor(popupSelector) {
        super(popupSelector);
        this._fullSizeImage = this._popupElement.querySelector(PopupWithImage.selectors.imageSelector);
        this._fullSizeImageCaption = this._popupElement.querySelector(PopupWithImage.selectors.captionSelector);

    }
    open(name, link) {
        super.open();
        this._fullSizeImage.src = link;
        this._fullSizeImageCaption.textContent = name;
        this._fullSizeImage.alt = name;
    }
}
