export class UserInfo {
    constructor(data){
        this._username = document.querySelector(data.username);
        this._status = document.querySelector(data.status);
        this._avatar = document.querySelector(data.avatar)
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
        this._status.textContent = profileStatus
    }
    setUserAvatar(profileAvatar) {
        this._avatar.style.backgroundImage = `url(${profileAvatar})`
    }
}