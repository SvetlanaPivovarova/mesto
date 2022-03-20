import { initialCards, formConfig } from "./data.js";
import { Card } from "./Card.js";
import { FormValidator } from "./FormValidator.js";
import { formProfile, formNewPlace,
        buttonAddCard, buttonEditProfile,
        fullSizeImage, fullSizeImageCaption,
        popupOpenedClass, popupOpenedSelector, popups,
        nameInput, jobInput, profileName,
        profileProfession, cardInputTitle, cardInputLink,
        cardsWrap } from "../utils/constans.js";
import {Section} from "./Section.js";
import {Popup} from "./Popup.js";
import {PopupWithForm} from "./PopupWithForm.js";
import {PopupWithImage} from "./PopupWithImage.js";

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

//функция отправки данных формы профиля
function handleProfileFormSubmit (evt) {      
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    popupProfile.close();
};

//форма для создания новой карточки пользователем
const handleCardFormSubmit = (evt) => {   
  evt.preventDefault();

  const cardUser = [{
      name: cardInputTitle.value,
      link: cardInputLink.value
  }];
  const cardUserList = new Section({
      data: cardUser,
      renderer:  (item) =>{
          const card = new Card(item, '.card-template-default', handleCardClick);
          const cardElement = card.generateCard();
          cardUserList.addItem(cardElement);
      }
  }, '.elements'
  );

    cardUserList.renderItems();
    popupCard.close();
};

function handleCardClick(name, link) {
  fullSizeImage.src = link;
  fullSizeImageCaption.textContent = name;
  fullSizeImage.alt = name;
  popupFullSizeImage.open();
}

buttonEditProfile.addEventListener ('click', function() {  //слушатель для кнопки "редактировать профиль", открытие поп-ап редактирования профиля
    popupProfile.open();
    nameInput.value = profileName.textContent;  
    jobInput.value = profileProfession.textContent;
});

buttonAddCard.addEventListener ('click',function() {
    popupCard.open();
});

formProfile.addEventListener('submit', handleProfileFormSubmit); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);

//создать для каждого попапа свой экземпляр класса PopupWithForm
const popupProfile = new PopupWithForm('.popup_type_profile', handleProfileFormSubmit);
const popupCard = new PopupWithForm('.popup_type_card', handleCardFormSubmit);
const popupFullSizeImage = new PopupWithImage(handleCardClick);

popupProfile.setEventListeners();
popupCard.setEventListeners();
popupFullSizeImage.setEventListeners();