export class UserInfo {
    constructor({nameSelector, infoSelector, avatarSelector}) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._avatar = document.querySelector(avatarSelector);
    }
    getUserInfo() {
        this._userData = {
            user: this._name.textContent,
            about: this._info.textContent
        };
        return this._userData;
    }
    setUserInfo(userInfo) {
        this._name.textContent = userInfo.name;
        this._info.textContent = userInfo.about;
        this._avatar.src = userInfo.avatar;
    }
}