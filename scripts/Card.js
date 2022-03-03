import { openPopup, closePopup, buttonCloseImage } from "./index.js";

const fullSizeImage = document.querySelector('.popup__image-item');
const fullSizeImageCaption = document.querySelector('.popup__title_type_image-caption');
const popupFullSizeImage = document.querySelector('.popup_type_image');


class Card {
    constructor(data, cardSelector) {
      this._name = data.name;
      this._image = data.link;
      this._cardSelector = cardSelector;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      
    // вернуть DOM-элемент карточки
      return cardElement;
    }
    
    //внешний метод, создающий карточку, наполняющий ее данными и возвращающий наружу
    generateCard() {
      this._element = this._getTemplate();
      this._cardDeleteButton = this._element.querySelector('.card__delete-icon');
      this._likeButton = this._element.querySelector('.card__like-icon');
      this._picture = this._element.querySelector('.card__image');
      this._setEventListeners();
    
      // добавить данные
      this._element.querySelector('.card__place-title').textContent = this._name;
      this._picture.src = this._image;
      this._element.querySelector('.card__image').alt = this._name;
      
      // вурнуть элемент наружу
      return this._element;
    }

    //приватный метод установки слушателей на элементы внутри карточки
    _setEventListeners() {
      this._picture.addEventListener('click', (e) => {
        this._handleOpenPopup(e);
      });
      this._likeButton.addEventListener('click', (e) => {
        this._handleLikeButton(e);
      });
      this._cardDeleteButton.addEventListener('click', (e) => {
        this._handleDeleteButton(e);
      });
      buttonCloseImage.addEventListener('click', () => {
        this._handleClosePopup();
      });
    }
  
    _handleLikeButton(e) {
      e.target.classList.toggle('card__like-icon_active');
    }
  
    _handleDeleteButton(e) {
      e.target.closest('.card').remove();
    };
    
    _handleOpenPopup(e) {
      if (e.target === this._picture) {
        fullSizeImage.src = this._image;
        fullSizeImageCaption.textContent = this._name;
        fullSizeImage.alt = this._name;
        openPopup(popupFullSizeImage);
      }
    }

    _handleClosePopup() {
      closePopup(popupFullSizeImage);
    }
  }

  export {Card};