export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() {
        this._userData = {
            name: this._name.textContent,
            about: this._info.textContent
        };
        return this._userData;
    }
    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._info.textContent = about;
    }
}