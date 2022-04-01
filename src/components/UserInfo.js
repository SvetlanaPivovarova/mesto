export class UserInfo {
    constructor({nameSelector, infoSelector}, api) {
        this._name = document.querySelector(nameSelector);
        this._info = document.querySelector(infoSelector);
        this._api = api;
    }
    getUserInfo() {

        this._api.editProfile().then((newUserData) => {
            return newUserData = {
                name: this._name.textContent,
                about: this._info.textContent
            };
            console.log(newUserData);
        })

        //return newUserData;
    }
    setUserInfo({name, about}) {
        this._name.textContent = name;
        this._info.textContent = about;
    }
}