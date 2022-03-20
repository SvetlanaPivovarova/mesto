export class Popup {
    static selectors = {
        popupOpenedClass: 'popup_opened',
        popupOpenedSelector: '.popup_opened',
        closeBtnSelector: 'popup__close-btn'
    }
    constructor(popupSelector) {
        this._popupSelector = popupSelector;
        this._popupElement = document.querySelector(this._popupSelector);
    }
    open() {
        this._popupElement.classList.add(Popup.selectors.popupOpenedClass);
        document.addEventListener('keydown', this._handleEscClose);
    }
    close() {
        this._popupElement.classList.remove(Popup.selectors.popupOpenedClass);
        document.removeEventListener('keydown', this._handleEscClose);
    }
    _handleEscClose = (event) => {
        if (event.code === "Escape") {
            const popupElement = document.querySelector(Popup.selectors.popupOpenedSelector);
            this.close(popupElement);
        }
    }
    setEventListeners() {
        this._popupElement.addEventListener('mousedown', (evt) => {
            if (evt.target.classList.contains(Popup.selectors.popupOpenedClass)) {
                this.close();
            }
            if (evt.target.classList.contains(Popup.selectors.closeBtnSelector)) {
                this.close();
            }
        })
    }
}
