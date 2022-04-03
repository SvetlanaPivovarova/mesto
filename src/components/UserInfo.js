export class UserInfo {
    constructor({nameSelector, infoSelector}, api) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._api = api;
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
    setUserInfoApi() {
        this._api.getInitialData().then((res) => {
            this._name.textContent = res.name;
            this._info.textContent = res.about;
        })
    }
}