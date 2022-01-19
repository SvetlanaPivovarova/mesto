let buttonEditProfile = document.querySelector('.profile__edit-button');
let buttonCloseProfile = document.querySelector('.popup__close-btn');
let popup = document.querySelector('.popup');
const popupOpenedClass = 'popup_opened';


function openPopup() {
    popup.classList.add(popupOpenedClass);
    document.body.style.overflow = 'hedden';
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

let formElement = document.querySelector('.form');
let nameInput = formElement.querySelector('.form__text_type_name'); 
let jobInput = formElement.querySelector('.form__text_type_about');


function formSubmitHandler (evt) {
    evt.preventDefault();

    let nameInputValue = nameInput.value;
    let jobInputValue = jobInput.value;  
    var profileName = document.querySelector('.profile__name');
    var profileProfession = document.querySelector('.profile__profession'); 

    profileName.textContent = nameInputValue;
    profileProfession.textContent = jobInputValue;
    
    closePopup();
}

formElement.addEventListener('submit', formSubmitHandler); 