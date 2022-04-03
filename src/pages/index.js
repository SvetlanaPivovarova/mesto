import '../pages/index.css';

import {formConfig, initialCards} from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { buttonAddCard, buttonEditProfile,
        inputUser, inputAbout,
        userName, userAbout
         } from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";

let userId;

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
    //console.log(card._id);
    if (item.owner._id !== userId) {
        const cardDeleteButton = cardElement.querySelector('.card__delete-icon');
        cardDeleteButton.disabled = true;
        cardDeleteButton.classList.add('card__delete-icon_unactive');
    }
    return cardElement;
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38/cards', {
    headers: {
        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

api.getInitialData().then((cards) => {
    const initialCardList = new Section({
            renderer: (item) =>{
                console.log(item);

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
            //const owner = {};
            cardUser.owner = userId;
            initialCardList.addItem(cardElement);
            popupCard.close();
        },
        api: api
    });

    popupCard.setEventListeners();

    buttonAddCard.addEventListener ('click',function() {
        popupCard.open();
    });
});

const apiProfile = new Api('https://mesto.nomoreparties.co/v1/cohort-38/users/me', {
    headers: {
        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

apiProfile.getInitialData().then((info) => {
    userName.textContent = info.name;
    userAbout.textContent = info.about;
    userId = info._id;
    console.log(userId);
    const popupProfile = new PopupWithForm({
        popupSelector: '.popup_type_profile',
        handleFormSubmit: (info) => {

            userInfoProfile.setUserInfoApi(info);
            popupProfile.close();
        },
        api: apiProfile
    });

    buttonEditProfile.addEventListener ('click', function() {
        popupProfile.open();
        //const {name, about} = userInfoProfile.getUserInfo()
        inputUser.value = info.name;
        inputAbout.value = info.about;
    });

    popupProfile.setEventListeners();
})

//создать экземпляр класса UserInfo
const userInfoProfile = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__profession',
}, apiProfile);

//функция открывания попап с картинкой при клике на карточку
function handleCardClick(name, link) {
  popupFullSizeImage.open(name, link);
}

const popupFullSizeImage = new PopupWithImage('.popup_type_image');

popupFullSizeImage.setEventListeners();

