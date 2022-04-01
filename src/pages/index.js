import '../pages/index.css';

import {formConfig, initialCards} from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { buttonAddCard, buttonEditProfile,
        inputUser, inputAbout
         } from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";

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

//функция создания карточки
function createCard(item) {
    const card = new Card(item, '.card-template-default', handleCardClick, api);
    const cardElement = card.generateCard();
    return cardElement;
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38/cards', {
    headers: {
        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

api.getInitialCards().then((cards) => {
    const initialCardList = new Section({
            //data: cards,
            renderer: (item) =>{
                const cardElement = createCard(item);
                initialCardList.addItem(cardElement);
            }
        }, '.elements'
    );
    initialCardList.renderItems(cards);


    const popupCard = new PopupWithForm({
        popupSelector: '.popup_type_card',
        handleFormSubmit:  (cardUser) => {
            const cardElement = createCard(cardUser);

            initialCardList.addItem(cardElement);
            popupCard.close();
        }
    });

    popupCard.setEventListeners();

    buttonAddCard.addEventListener ('click',function() {
        popupCard.open();
    });
});



//const apiProfile = new Api('https://mesto.nomoreparties.co/v1/cohort-38/users/me', {
//    headers: {
//        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
//        'Accept': 'application/json',
//        'Content-Type': 'application/json; charset=utf-8'
//    }
//});

//apiProfile.getInitialCards().then((info) => {
//    console.log(info);
    //создать для каждого попапа свой экземпляр класса PopupWithForm, PopupWithImage
   // const popupProfile = new PopupWithForm({
    //    popupSelector: '.popup_type_profile',
    //    handleFormSubmit: (info) => {
    //        userInfoProfile.setUserInfo(info);
     //       popupProfile.close();
    //    }
    //});
 //   return popupProfile;
//})

//создать экземпляр класса UserInfo
const userInfoProfile = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__profession',
});

//функция открывания попап с картинкой при клике на карточку
function handleCardClick(name, link) {
  popupFullSizeImage.open(name, link);
}

//создать для каждого попапа свой экземпляр класса PopupWithForm, PopupWithImage
const popupProfile = new PopupWithForm({
    popupSelector: '.popup_type_profile',
    handleFormSubmit: (userInfo) => {
        userInfoProfile.setUserInfo(userInfo);
        popupProfile.close();
    }
});

//const popupCard = new PopupWithForm({
//    popupSelector: '.popup_type_card',
//    handleFormSubmit:  (cardUser) => {
//        const cardElement = createCard(cardUser);

//        initialCardList.addItem(cardElement);
//        popupCard.close();
//    }
//});

const popupFullSizeImage = new PopupWithImage('.popup_type_image');

//слушатели
buttonEditProfile.addEventListener ('click', function() {
    popupProfile.open();
    const {user, about} = userInfoProfile.getUserInfo()
    inputUser.value = user;
    inputAbout.value = about;
});



popupProfile.setEventListeners();



popupFullSizeImage.setEventListeners();

//const api = new Api({
//    baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-38',
 //   headers: {
 //       authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
 //       'Content-Type': 'application/json'
 //   }
//});



//создать экземпляр класса Section и набор первоначальных карточек
fetch('https://mesto.nomoreparties.co/v1/cohort-38/cards', {
    headers: {
        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4'
    }
})
    .then(res => res.json())
    .then((result) => {
        console.log(result);
    });