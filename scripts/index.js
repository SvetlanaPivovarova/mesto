const buttonEditProfile = document.querySelector('.profile__edit-button');
const popup = document.querySelector('.popup');
const buttonCloseProfile = document.querySelector('.popup__close-btn_type_profile');
const popupProfile = document.querySelector('.popup_type_profile');
const popupCard = document.querySelector('.popup_type_card');
const popupFullSizeImage = document.querySelector('.popup_type_image');
const popupOpenedClass = 'popup_opened';
const popupOpenedSelector = '.popup_opened';
const formProfile = document.querySelector('[name="profile-information"]');
const nameInput = formProfile.querySelector('.form__text_type_name'); 
const jobInput = formProfile.querySelector('.form__text_type_about');
const profileName = document.querySelector('.profile__name');
const profileProfession = document.querySelector('.profile__profession'); 
const cardsWrap = document.querySelector('.elements');    // обертка для карточек
const formNewPlace = document.querySelector('[name="new-place-card"]'); //выбрать форму добавления нового места
const cardInputTitle = document.querySelector('.form__text_type_place-title'); //выбрать поле Название
const cardInputLink = document.querySelector('.form__text_type_place-link');    //выбрать поле ссылка
const cardTemplate = document.querySelector('#card-template').content.querySelector('.card'); //выбрать элемент темплейта для создания карточки
const buttonAddCard = document.querySelector('.profile__add-button');
const buttonCloseAddCard = document.querySelector('.popup__close-btn_type_card');
const fullSizeImage = document.querySelector('.popup__image-item');
const fullSizeImageCaption = document.querySelector('.popup__title_type_image-caption');
const buttonCloseImage = document.querySelector('.popup__close-btn_type_image');

function openPopup(item) {  //функция открытия поп-ап
    item.classList.add(popupOpenedClass);
    document.addEventListener('keydown', closePopupByEsc);
};

function closePopup(item) {     //функция закрытия поп-ап
    item.classList.remove(popupOpenedClass);
    document.removeEventListener('keydown', closePopupByEsc);
};

function closePopupByEsc(event) {
    if (event.code === "Escape") {
      const popupElement = document.querySelector(popupOpenedSelector);
      closePopup(popupElement); 
    }
};

function formSubmitUserHandler (evt) {      //функция отправки данных формы профиля
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup(popupProfile);
};

//const handleLikeButton = (e) => {
//  e.target.classList.add('card__like-icon_active');
//};

//const handleDeleteButton = (e) => {
//  e.target.closest('.card').remove();
//};


class Card {
  constructor(data, cardSelector) {
    this._name = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector; // записали селектор в приватное поле
    
  }

  _getTemplate() {
    // забираем разметку из HTML и клонируем элемент
    const cardElement = document
    .querySelector(this._cardSelector)
    .content
    .querySelector('.card')
    .cloneNode(true);
    
  // вернём DOM-элемент карточки
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._cardDeleteButton = this._element.querySelector('.card__delete-icon');
    this._likeButton = this._element.querySelector('.card__like-icon');
    this._picture = this._element.querySelector('.card__image');
    this._setEventListeners();
  
    // Добавим данные
    this._element.querySelector('.card__place-title').textContent = this._name;
    this._element.querySelector('.card__image').src = this._image;
    this._element.querySelector('.card__image').alt = this._name;
    
    
    // Вернём элемент наружу
    return this._element;
  } 
  _setEventListeners() {
    this._element.addEventListener('click', (e) => {
      this._handleOpenPopup(e);
    })
    buttonCloseImage.addEventListener('click', () => {
      this._handleClosePopup();
    })
    this._likeButton.addEventListener('click', (e) => {
      this._handleLikeButton(e);
    } );
    this._cardDeleteButton.addEventListener('click', (e) => {
      this._handleDeleteButton(e);
    } );
  }

  _handleLikeButton(e) {
    e.target.classList.add('card__like-icon_active');
  }

  _handleDeleteButton(e) {
    e.target.closest('.card').remove();
  };
  
  _handleOpenPopup(e) {
    if (e.target === this._picture) {
      fullSizeImage.src = this._image;
      fullSizeImageCaption.textContent = this._name;
      fullSizeImage.alt = this._name;
      openPopup(popupFullSizeImage);
    }
  }
  _handleClosePopup() {
    closePopup(popupFullSizeImage);
  }
}

initialCards.forEach((item) => {
  // Создадим экземпляр карточки
  const card = new Card(item, '.card-template-default');
  // Создаём карточку и возвращаем наружу
  const cardElement = card.generateCard();

  // Добавляем в DOM
  cardsWrap.append(cardElement);
}); 

//const getCardElement = (item) => {                            //получить элемент для карточки
//  const card = cardTemplate.cloneNode(true);
//  const cardTitle = card.querySelector('.card__place-title');
//  const cardImage = card.querySelector('.card__image');
//  const cardLikeButton = card.querySelector('.card__like-icon');
//  const cardDeleteButton = card.querySelector('.card__delete-icon');
  
//  cardLikeButton.addEventListener('click', handleLikeButton);
 // cardDeleteButton.addEventListener('click', handleDeleteButton);
  
//  cardTitle.textContent = item.name;     //наполнить содержимым - название
//  cardImage.src = item.link;             //наполнить содержимым - ссылка
//  cardImage.alt = item.name;             //наполнить содержимым - alt
  
//  cardImage.addEventListener('click', function() {
//  fullSizeImage.src = item.link;
//  fullSizeImageCaption.textContent = item.name;
 // fullSizeImage.alt = item.name;
//  openPopup(popupFullSizeImage);
//  });

//  return card;
//};

//const renderCard = (item, wrap) => {     //добавление карточки в начало списка
 // const card = getCardElement(item);
 // wrap.prepend(card);
//};

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
buttonCloseImage.addEventListener ('click', function() {
  closePopup(popupFullSizeImage);
});

formProfile.addEventListener('submit', formSubmitUserHandler); 
formNewPlace.addEventListener('submit', handleCardFormSubmit);


