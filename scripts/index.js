let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonCloseProfile = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_opened';

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_type_name'); 
let jobInput = formElement.querySelector('.form__text_type_about');

let profileName = document.querySelector('.profile__name');
let profileProfession = document.querySelector('.profile__profession'); 


function openPopup() {
    popup.classList.add(popupOpenedClass);
    document.body.style.overflow = 'hidden';
    nameInput.value = profileName.textContent;
    jobInput.value = profileProfession.textContent;
};

function closePopup() {
    popup.classList.remove(popupOpenedClass);
    document.body.style.overflow = '';
}

buttonEditProfile.addEventListener ('click', function() {
    openPopup();
});

buttonCloseProfile.addEventListener ('click', function() {
    closePopup();
});

popup.addEventListener ('click', function(event) { 
    if (event.target === popup) {
        closePopup();
    }
});

document.addEventListener ('keydown', function(event) {
    console.log(event);
    if (event.code === "Escape") {
        closePopup();
    }
});

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = nameInput.value;
    profileProfession.textContent = jobInput.value;
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 