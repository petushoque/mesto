export class UserInfo {
    constructor(data){
        this._username = document.querySelector(data.username);
        this._status = document.querySelector(data.status)
    }
    getUserInfo() {
        const info = {
            username: this._username.textContent,
            status: this._status.textContent
        }
        return info
    }
    setUserInfo(profileName, profileStatus) {
        this._username.textContent = profileName;
        this._status.textContent = profileStatus;
    }
}