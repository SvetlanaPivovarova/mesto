import { initialCards, formConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { formProfile, formNewPlace,
        buttonAddCard, buttonEditProfile,
        popupProfile, popupCard, popupFullSizeImage,
        fullSizeImage, fullSizeImageCaption,
        popupOpenedClass, popupOpenedSelector, popups,
        nameInput, jobInput, profileName,
        profileProfession, cardInputTitle, cardInputLink,
        cardsWrap } from "../utils/constans.js";
import {Section} from "./Section.js";

//Создать объект, где будут храниться экземпляры валидаторов всех форм
const formValidators = {}

// Включение валидации
const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));

  formList.forEach((formElement) => {
    const validator = new FormValidator(config, formElement);
    const formName = formElement.getAttribute('name');

    formValidators[formName] = validator;
    validator.enableValidation();
  });
};

enableValidation(formConfig);

//создать экземпляр класса Section
const initialCardList = new Section({
    data: initialCards,
    renderer: (item) =>{
        const card = new Card(item, '.card-template-default', handleCardClick);
        const cardElement = card.generateCard();
        initialCardList.addItem(cardElement);
    }
    }, '.elements'
);

//создать 6 первоначальных карточек, данные хранятся в массиве initialCards
initialCardList.renderItems();

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

//initialCards.forEach(item => {
//  renderCard(item, cardsWrap)
//});


function handleCardClick(name, link) {
  fullSizeImage.src = link;
  fullSizeImageCaption.textContent = name;
  fullSizeImage.alt = name;
  openPopup(popupFullSizeImage);
}

popups.forEach((popup) => {
    popup.addEventListener('mousedown', (evt) => {
        if (evt.target.classList.contains(popupOpenedClass)) {
            closePopup(popup);
        }
        if (evt.target.classList.contains('popup__close-btn')) {
          closePopup(popup);
        }
    })
})

buttonEditProfile.addEventListener ('click', function() {  //слушатель для кнопки "редактировать профиль", открытие поп-ап редактирования профиля
    openPopup(popupProfile);
    nameInput.value = profileName.textContent;  
    jobInput.value = profileProfession.textContent;
});

buttonAddCard.addEventListener ('click',function() {
    openPopup(popupCard);
});

formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);