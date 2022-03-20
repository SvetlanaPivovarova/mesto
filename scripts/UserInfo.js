import {jobInput, nameInput, profileName, profileProfession} from "../utils/constans";

export class UserInfo {
    constructor({name, info}) {
        this._name = name;
        this._info = info;
    }
    getUserInfo() {

    }
    setUserInfo() {
        nameInput.value = profileName.textContent;
        jobInput.value = profileProfession.textContent;
    }
}