export class UserInfo {
    constructor(data){
        this._username = document.querySelector(data.username).textContent;
        this._status = document.querySelector(data.status).textContent
    }
    getUserInfo() {
        const info = {
            username: this._username,
            status: this._status
        }
        return info
    }
    setUserInfo() {
        this._username = document.querySelector('.popup__input_textarea_name').value;
        this._status = document.querySelector('.popup__input_textarea_status').value;
    }
}