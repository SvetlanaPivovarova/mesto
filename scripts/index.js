const buttonEditProfile = document.querySelector('.profile__edit-button');
const buttonCloseProfile = document.querySelector('.popup__close-btn');
const popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_opened';

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_type_name'); 
let jobInput = formElement.querySelector('.form__text_type_about');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession'); 


function openPopup() {
    popup.classList.add(popupOpenedClass);
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
};

function closePopup() {
    popup.classList.remove(popupOpenedClass);
};

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
};

buttonEditProfile.addEventListener ('click', function() {
    openPopup();
});

buttonCloseProfile.addEventListener ('click', function() {
    closePopup();
});

formElement.addEventListener('submit', formSubmitHandler); 