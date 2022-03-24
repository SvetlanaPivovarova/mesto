export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        //this._inputName = document.querySelector(inputNameSelector);
        //this._inputJob = document.querySelector(inputJobSelector);
    }
    getUserInfo() {
        this._userData = {
            user: this._name.textContent,
            about: this._info.textContent
        };
       // this._userData[input.name] = input.value
       // this._inputName.value = this._name.textContent;
       // this._inputJob.value = this._info.textContent;
        return this._userData;
    }
    setUserInfo({user, about}) {
        this._name.textContent = user;
        this._info.textContent = about;
    }
}