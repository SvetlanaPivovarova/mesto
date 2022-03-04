import { initialCards, formConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";

//создать экземпляр класса FormValidator для каждой формы
const formProfileValidator = new FormValidator(formConfig, formProfile);
const formNewPlaceValidator = new FormValidator(formConfig, formNewPlace);

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