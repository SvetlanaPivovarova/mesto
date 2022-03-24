import '../pages/index.css';

import { initialCards, formConfig } from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { buttonAddCard, buttonEditProfile,
        inputUser, inputAbout,
        fullSizeImage, fullSizeImageCaption,
        cardInputTitle, cardInputLink,
         } from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {Popup} from "../components/Popup.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";

//Создать объект, где будут храниться экземпляры валидаторов всех форм
const formValidators = {}

//Включение валидации
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

//создать экземпляр класса UserInfo, который
//отвечает за управление отображением информации о пользователе на странице
const userInfoProfile = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__profession',
  //  inputNameSelector: '.form__text_type_name',
  //  inputJobSelector: '.form__text_type_about'
});

//функция открывания попап с картинкой при клике на карточку
function handleCardClick(name, link) {
  //fullSizeImage.src = link;
  //fullSizeImageCaption.textContent = name;
  //fullSizeImage.alt = name;
  popupFullSizeImage.open(name, link);
}

//создать для каждого попапа свой экземпляр класса PopupWithForm
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (userInfo) => {
        console.log(userInfo);
        userInfoProfile.setUserInfo(userInfo);
        popupProfile.close();
    }
});

const popupCard = new PopupWithForm({
    popupSelector: '.popup_type_card',
    handleFormSubmit:  (cardUser) => {
        const cardUserList = new Section({
                data: [cardUser],
                renderer:  (item) =>{
                    const card = new Card(item, '.card-template-default', handleCardClick);
                    const cardElement = card.generateCard();
                    cardUserList.addItem(cardElement);
                }
            }, '.elements'
        );

        cardUserList.renderItems();
        popupCard.close();
    }
});

console.log(popupCard._getInputValues());

const popupFullSizeImage = new PopupWithImage(handleCardClick);

//слушатели
buttonEditProfile.addEventListener ('click', function() {
    popupProfile.open();
    inputUser.value = userInfoProfile.getUserInfo().user;
    inputAbout.value = userInfoProfile.getUserInfo().about;
});

buttonAddCard.addEventListener ('click',function() {
    popupCard.open();
});

popupProfile.setEventListeners();

popupCard.setEventListeners();

popupFullSizeImage.setEventListeners();