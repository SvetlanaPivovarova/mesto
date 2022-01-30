const initialCards = [
    {
      name: 'Стокгольм, Швеция',
      link: 'https://images.unsplash.com/photo-1642969177971-98f9902f66fe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Теотиуакан, штат Мехико, Мексика',
      link: 'https://images.unsplash.com/photo-1643177159923-94f0917f3dbd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80'
    },
    {
      name: 'Венеция, Италия',
      link: 'https://images.unsplash.com/photo-1643128847945-7d25aa40a60b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=874&q=80'
    },
    {
      name: 'Амстердам, Нидерланды',
      link: 'https://images.unsplash.com/photo-1639690086835-719591757bc4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80'
    },
    {
      name: 'Муссури, Уттаракханд, Индия',
      link: 'https://images.unsplash.com/photo-1643017599693-64caa559e08f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80'
    },
    {
      name: 'Акурейри, Исландия',
      link: 'https://images.unsplash.com/photo-1642781518748-0e2fce1c733f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=928&q=80'
    }
  ];
const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupFullSizeImage = document.querySelector('.popup_type_image');
const popupOpenedClass = 'popup_opened';
let formElement = document.querySelector('.form'); 
let formProfile = document.querySelector('[name="profile-information"]');
let nameInput = formElement.querySelector('.form__text_type_name'); 
let jobInput = formElement.querySelector('.form__text_type_about');
let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession'); 
const cardsWrap = document.querySelector('.elements');    // обертка для карточек
const formNewPlace = document.querySelector('[name="new-place-card"]'); //выбрать форму добавления нового места
let cardInputTitle = document.querySelector('.form__text_type_place-title'); //выбрать поле Название
let cardInputLink = document.querySelector('.form__text_type_place-link');    //выбрать поле ссылка
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); //выбрать элемент темплейта для создания карточки
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = document.querySelector('.popup__close-btn_type_card');
const fullSizeImage = document.querySelector('.popup__image-item');
const fullSizeImageCaption = document.querySelector('.popup__title_type_image-caption');
const buttonCloseImage = document.querySelector('.popup__close-btn_type_image');

function openPopup(item) {  //функция открытия поп-ап профила
    item.classList.add(popupOpenedClass);
    nameInput.value = profileName.textContent;  
    jobInput.value = profileProfession.textContent;
};

function closePopup(item) {     //функция закрытия поп-ап
    item.classList.remove(popupOpenedClass);
};

function formSubmitUserHandler (evt) {      //функция отправки данных формы профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
};

const handleLikeButton = (e) => {
  e.target.classList.add('card__like-icon_active');
}

const handleDeleteButton = (e) => {
  e.target.closest('.card').remove();
}

const getCardElement = (item) => {                            //получить элемент для карточки
  const card = cardTemplate.cloneNode(true);
  const cardTitle = card.querySelector('.card__place-title');
  const cardImage = card.querySelector('.card__image');
  const cardLikeButton = card.querySelector('.card__like-icon');
  const cardDeleteButton = card.querySelector('.card__delete-icon');
  
  cardLikeButton.addEventListener('click', handleLikeButton);
  cardDeleteButton.addEventListener('click', handleDeleteButton);
  
  cardTitle.textContent = item.name;     //наполнить содержимым - название
  cardImage.src = item.link;             //наполнить содержимым - ссылка
  cardImage.alt = item.name;             //наполнить содержимым - alt
  
  cardImage.addEventListener('click', function() {
  fullSizeImage.src = item.link;
  fullSizeImageCaption.textContent = item.name;
  fullSizeImage.alt = item.name;
  openPopup(popupFullSizeImage);
  });
  return card;
}

const renderCard = (item, wrap) => {     //добавление карточки в начало списка
  const card = getCardElement(item)
  wrap.prepend(card)
}

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

buttonEditProfile.addEventListener ('click', function() {  //слушатель для кнопки "редактировать профиль"
    openPopup(popupProfile);
});

buttonCloseProfile.addEventListener ('click', function() {
    closePopup(popupProfile);
});

buttonAddCard.addEventListener ('click',function() {
    openPopup(popupCard);
});

buttonCloseAddCard.addEventListener ('click', function() {
  closePopup(popupCard);
})
buttonCloseImage.addEventListener ('click', function() {
  closePopup(popupFullSizeImage);
})
formProfile.addEventListener('submit', formSubmitUserHandler); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);