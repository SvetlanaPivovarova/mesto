import '../pages/index.css';

import {formConfig} from "../utils/data.js";
import { Card } from "../components/Card.js";
import { FormValidator } from "../components/FormValidator.js";
import { buttonAddCard, buttonEditProfile, buttonEditAvatar,
        inputUser, inputAbout,
        userAvatar
         } from "../utils/constants.js";
import {Section} from "../components/Section.js";
import {PopupWithForm} from "../components/PopupWithForm.js";
import {PopupWithImage} from "../components/PopupWithImage.js";
import {UserInfo} from "../components/UserInfo.js";
import {Api} from "../components/Api.js";
import {ConfirmationPopup} from "../components/ConfirmationPopup.js";

//создать переменную
let userId;
let deletedCardData = {};

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
    const card = new Card(item, '.card-template-default', handleCardClick, api, handleDeleteCard);
    const cardElement = card.generateCard();
    if (item.owner._id !== userId) {
        const cardDeleteButton = cardElement.querySelector('.card__delete-icon');
        cardDeleteButton.disabled = true;
        cardDeleteButton.classList.add('card__delete-icon_unactive');
    }
    return cardElement;
}

const api = new Api('https://mesto.nomoreparties.co/v1/cohort-38', {
    headers: {
        authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=utf-8'
    }
});

Promise.all([api.getProfile(), api.getInitialData()])
    .then(([info, cards]) => {
        //установка данных пользователя
        userInfoProfile.setUserInfo(info);
        userId = info._id;
        const popupProfile = new PopupWithForm({
            popupSelector: '.popup_type_profile',
            handleFormSubmit: (info) => {
                popupProfile.submitButton().textContent = 'Сохранение...';
                api.editProfile(info).then((res) => {
                    userInfoProfile.setUserInfo(res);
                })
                    .then(() => {
                        popupProfile.close();
                    })
                    .catch((err) => {
                        console.error(err);
                        throw err;
                    })
                    .finally(() => {
                        popupProfile.submitButton().textContent = 'Сохранить';
                    })
            }
        });

        buttonEditProfile.addEventListener ('click', function() {
            popupProfile.open();
            inputUser.value = info.name;
            inputAbout.value = info.about;
        });

        popupProfile.setEventListeners();

        //отрисовка карточек
        const initialCardList = new Section({
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
                popupCard.submitButton().textContent = 'Сохранение...';
                api.createNewCard(cardUser).then((res) => {
                    const cardElement = createCard(res);
                    cardUser.owner = userId;
                    initialCardList.addItem(cardElement);
                    })
                    .then(() => {
                        popupCard.close();
                    })
                    .catch((err) => {
                    console.error(err);
                    throw err;
                    })
                    .finally(() => {
                        popupCard.submitButton().textContent = 'Создать';
                    })
            }
        });

        popupCard.setEventListeners();

        buttonAddCard.addEventListener ('click',function() {
            popupCard.open();
        });
    })
    .catch((err) => {
        console.error(err);
        throw err;
    });

//создать экземпляр класса UserInfo
const userInfoProfile = new UserInfo({
    nameSelector: '.profile__name',
    infoSelector: '.profile__profession',
    avatarSelector: '.profile__avatar-image'
});

//функция открывания попап с картинкой при клике на карточку
function handleCardClick(name, link) {
  popupFullSizeImage.open(name, link);
}

function handleDeleteCard(cardId, event) {
    popupDeleteCard.open();
    deletedCardData.deletedCardId = cardId;
    deletedCardData.deletedCardEvent = event;
    return deletedCardData;
}

const popupFullSizeImage = new PopupWithImage('.popup_type_image');

const popupDeleteCard = new ConfirmationPopup({
    popupSelector: '.popup_type_delete-card',
    handleFormSubmit: () => {
        popupDeleteCard.submitButton().textContent = 'Сохранение...';
        api.deleteCard(deletedCardData.deletedCardId)
            .then(() => {
            deletedCardData.deletedCardEvent.target.closest('.card').remove();
        })
            .then(() => {
                popupDeleteCard.close();
            })
            .catch((err) => {
                console.error(err);
                throw err;
            })
            .finally(() => {
                popupDeleteCard.submitButton().textContent = 'Да'
            })
    }
});

const popupEditAvatar = new PopupWithForm({
    popupSelector: '.popup_type_avatar',
    handleFormSubmit: (newAvatar) => {
        popupEditAvatar.submitButton().textContent = 'Сохранение...';
        api.editAvatar(newAvatar).then((res) => {
                userAvatar.src = res.avatar;
            })
                .then(() => {
                    popupEditAvatar.close();
                })
                .catch((err) => {
                    console.error(err);
                    throw err;
                })
                .finally(() => {
                popupEditAvatar.submitButton().textContent = 'Сохранить';
            })
    },
    api: api
});

popupFullSizeImage.setEventListeners();

popupDeleteCard.setEventListeners();

buttonEditAvatar.addEventListener('click', function () {
    popupEditAvatar.open();
});

popupEditAvatar.setEventListeners();
