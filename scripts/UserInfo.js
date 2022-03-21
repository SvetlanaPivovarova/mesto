import {formProfile, jobInput, nameInput} from "../utils/constans.js";
//export const nameInput = formProfile.querySelector('.form__text_type_name');
//export const jobInput = formProfile.querySelector('.form__text_type_about');

export class UserInfo {
    constructor({nameSelector, infoSelector, inputNameSelector, inputJobSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._inputName = document.querySelector(inputNameSelector);
        this._inputJob = document.querySelector(inputJobSelector);
    }
    getUserInfo() {
        this._inputName.value = this._name.textContent;
        this._inputJob.value = this._info.textContent;
    }
    setUserInfo() {
        this._name.textContent = this._inputName.value;
        this._info.textContent = this._inputJob.value;
    }
}

//export const nameInput = formProfile.querySelector('.form__text_type_name'); отображение в форме
//export const jobInput = formProfile.querySelector('.form__text_type_about');
//export const profileName = document.querySelector('.profile__name');          отображение на странице
//export const profileProfession = document.querySelector('.profile__profession');