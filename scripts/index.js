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
const buttonCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const popup = document.querySelector('.popup');
const popupProfile = document.querySelector('.popup_type_profile')
const popupCard = document.querySelector('.popup_type_card');
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


function openPopup(item) {  //функция открытия поп-ап профила
    item.classList.add(popupOpenedClass);
    nameInput.value = profileName.textContent;  
    jobInput.value = profileProfession.textContent;
};

function closePopup(item) {     //функция закрытия поп-ап
    item.classList.remove(popupOpenedClass);
};

function formSubmitUserHandler (evt) {
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
  
  return card;
}

const renderCard = (item, wrap) => {
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
  formNewPlace.reset();
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

formProfile.addEventListener('submit', formSubmitUserHandler); 

formNewPlace.addEventListener('submit', handleCardFormSubmit);