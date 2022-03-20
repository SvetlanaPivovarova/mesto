//формы
export const formProfile = document.querySelector('[name="profile-information"]');
export const formNewPlace = document.querySelector('[name="new-place-card"]');

//кнопки
export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddCard = document.querySelector('.profile__add-button');

//DOM-элементы модальных окон
//export const popupProfile = document.querySelector('.popup_type_profile');
//export const popupCard = document.querySelector('.popup_type_card');
//export const popupFullSizeImage = document.querySelector('.popup_type_image');
export const fullSizeImage = document.querySelector('.popup__image-item');
export const fullSizeImageCaption = document.querySelector('.popup__title_type_image-caption');
export const popupOpenedClass = 'popup_opened';
export const popupOpenedSelector = '.popup_opened';
export const popups = Array.from(document.querySelectorAll('.popup'));

//DOM-элементы форм
export const nameInput = formProfile.querySelector('.form__text_type_name'); 
export const jobInput = formProfile.querySelector('.form__text_type_about');
export const profileName = document.querySelector('.profile__name');
export const profileProfession = document.querySelector('.profile__profession'); 
export const cardInputTitle = document.querySelector('.form__text_type_place-title'); //выбрать поле Название
export const cardInputLink = document.querySelector('.form__text_type_place-link');    //выбрать поле ссылка

// обертка для карточек
export const cardsWrap = document.querySelector('.elements');
