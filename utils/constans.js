//формы
const formProfile = document.querySelector('[name="profile-information"]');
const formNewPlace = document.querySelector('[name="new-place-card"]'); //выбрать форму добавления нового места

//кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = document.querySelector('.popup__close-btn_type_card');
const buttonCloseImage = document.querySelector('.popup__close-btn_type_image');

//DOM-элементы модальных окон
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupFullSizeImage = document.querySelector('.popup_type_image');
const fullSizeImage = document.querySelector('.popup__image-item');
const fullSizeImageCaption = document.querySelector('.popup__title_type_image-caption');
const popupOpenedClass = 'popup_opened';
const popupOpenedSelector = '.popup_opened';

//DOM-элементы форм
const nameInput = formProfile.querySelector('.form__text_type_name'); 
const jobInput = formProfile.querySelector('.form__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession'); 
const cardInputTitle = document.querySelector('.form__text_type_place-title'); //выбрать поле Название
const cardInputLink = document.querySelector('.form__text_type_place-link');    //выбрать поле ссылка

// обертка для карточек
const cardsWrap = document.querySelector('.elements');
