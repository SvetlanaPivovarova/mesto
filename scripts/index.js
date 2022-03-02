import { initialCards } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

const formConfig = {
  formSelector: '.form',
  inputSelector: '.form__text',
  inputErrorClass: 'form__text_type_error',
  errorClass: 'form__error_visible',
  submitButtonSelector: '.form__submit-btn',
  inactiveButtonClass: 'form__submit-btn_disabled'
}

//формы
const formProfile = document.querySelector('[name="profile-information"]');
const formNewPlace = document.querySelector('[name="new-place-card"]'); //выбрать форму добавления нового места

const formProfileValidator = new FormValidator(formConfig, formProfile);
const formNewPlaceValidator = new FormValidator(formConfig, formNewPlace);

formProfileValidator.enableValidation();
formNewPlaceValidator.enableValidation();

//кнопки
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = document.querySelector('.popup__close-btn_type_card');
const buttonCloseImage = document.querySelector('.popup__close-btn_type_image');

//DOM-элементы модальных окон
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
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

function openPopup(item) {  //функция открытия поп-ап
    item.classList.add(popupOpenedClass);
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(item) {     //функция закрытия поп-ап
    item.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
    if (event.code === "Escape") {
      const popupElement = document.querySelector(popupOpenedSelector);
      closePopup(popupElement); 
    }
};

function formSubmitUserHandler (evt) {      //функция отправки данных формы профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
};

const renderCard = (item, wrap) => {     //добавление карточки в начало списка
  const card = new Card(item, '.card-template-default');
  const cardElement = card.generateCard();
  wrap.prepend(cardElement);
};

const handleCardFormSubmit = (evt) => {   //форма для создания новой карточки пользователем
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

formProfile.addEventListener('submit', formSubmitUserHandler); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);


export {openPopup, closePopup, buttonCloseImage};