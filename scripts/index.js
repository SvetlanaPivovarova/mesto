import { initialCards, formConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//формы
const formProfile = document.querySelector('[name="profile-information"]');
const formNewPlace = document.querySelector('[name="new-place-card"]'); //выбрать форму добавления нового места

//создать экземпляр класса FormValidator для каждой формы
const formProfileValidator = new FormValidator(formConfig, formProfile);
const formNewPlaceValidator = new FormValidator(formConfig, formNewPlace);

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

formProfileValidator.enableValidation();
formNewPlaceValidator.enableValidation();

//функция открытия поп-ап
function openPopup(item) {  
    item.classList.add(popupOpenedClass);
    document.addEventListener('keydown', closePopupByEsc);
};

//функции закрытия поп-ап
function closePopup(item) {     
    item.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
    if (event.code === "Escape") {
      const popupElement = document.querySelector(popupOpenedSelector);
      closePopup(popupElement); 
    }
};

//функция отправки данных формы профиля
function handleProfileFormSubmit (evt) {      
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
};

//создание карточки
function createCard(item) {
  const card = new Card(item, '.card-template-default', handleCardClick);
  const cardElement = card.generateCard();
  return cardElement;
}

//добавление карточки в начало списка
const renderCard = (item, wrap) => {     
  const cardElement = createCard(item);
  wrap.prepend(cardElement);
};

//форма для создания новой карточки пользователем
const handleCardFormSubmit = (evt) => {   
  evt.preventDefault();

  const cardUser = {
      name: cardInputTitle.value,
      link: cardInputLink.value
  };
  
  renderCard(cardUser, cardsWrap);          //вызвать функцию создания карточки, передать переменные card из формы и cardsWrap
  closePopup(popupCard);
  formNewPlace.reset();                   //очистить форму
};

initialCards.forEach(item => {          //создать 6 первоначальных карточек, данные хранятся в массиве initialCards
  renderCard(item, cardsWrap)
});

//функция обработки закрытия модальных окон по нажатию на фон или клавишей esс
function handlePopupClosing() {
  const popups = Array.from(document.querySelectorAll('.popup'));

  popups.forEach(popupElement => closePopopOverOverlay(popupElement));
}

function closePopopOverOverlay(popupElement) {
  popupElement.addEventListener ('click', function(event) {  
    if (event.target === popupElement) { 
        closePopup(popupElement);
    } 
  }); 
}

function handleCardClick(name, link) {
  fullSizeImage.src = link;
  fullSizeImageCaption.textContent = name;
  fullSizeImage.alt = name;
  openPopup(popupFullSizeImage);
}

handlePopupClosing();

buttonEditProfile.addEventListener ('click', function() {  //слушатель для кнопки "редактировать профиль", открытие поп-ап редактирования профиля
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;  
    jobInput.value = profileProfession.textContent;
});
buttonCloseProfile.addEventListener ('click', function() {
    closePopup(popupProfile);
});
buttonAddCard.addEventListener ('click',function() {
    openPopup(popupCard);
});
buttonCloseAddCard.addEventListener ('click', function() {
  closePopup(popupCard);
});
buttonCloseImage.addEventListener('click', () => {
  closePopup(popupFullSizeImage);
});
formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);

export {openPopup};