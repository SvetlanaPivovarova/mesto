export class UserInfo {
    constructor({nameSelector, infoSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
    }
    getUserInfo() {
        this._userData = {
            user: this._name.textContent,
            about: this._info.textContent
        };
        return this._userData;
    }
    setUserInfo({user, about}) {
        this._name.textContent = user;
        this._info.textContent = about;
    }
}