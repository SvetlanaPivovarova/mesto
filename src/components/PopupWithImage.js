import {Popup} from "./Popup.js";

export class PopupWithImage extends Popup {
    static selectors = {
        popupSelector: '.popup_type_image',
    }
    constructor() {
        super(PopupWithImage.selectors.popupSelector);
    }
    open() {
        super.open();
    }
}
