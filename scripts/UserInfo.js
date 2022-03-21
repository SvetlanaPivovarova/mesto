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