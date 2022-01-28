const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
  ];
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile')
const popupCard = document.querySelector('.popup_type_card');
const popupOpenedClass = 'popup_opened';

let formElement = document.querySelector('.form'); 
let nameInput = formElement.querySelector('.form__text_type_name'); 
let jobInput = formElement.querySelector('.form__text_type_about');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession'); 

const buttonAddCard = document.querySelector('.profile__add-button');


function openPopup(item) {
    item.classList.add(popupOpenedClass);
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
};

function closePopup(item) {
    item.classList.remove(popupOpenedClass);
};

function formSubmitHandler (evt, item) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(item);
};

buttonEditProfile.addEventListener ('click', function() {
    openPopup(popupProfile);
});

buttonCloseProfile.addEventListener ('click', function() {
    closePopup(popupProfile);
});

buttonAddCard.addEventListener ('click',function() {
    openPopup(popupCard);
});

formElement.addEventListener('submit', formSubmitHandler); 

element.addEventListener('event', () => { yourFunction(functionArgument) })