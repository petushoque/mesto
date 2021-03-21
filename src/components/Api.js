export class Api {
    constructor(token, groupId){
        this._token = token;
        this._groupId = groupId
    }
    getCards(){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards`, {
            headers: {
            authorization: this._token
            }
        })        
        .then(res => res.json())
    }
    getUserInfo(){
        return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
            headers: {
            authorization: this._token
            }
        })
        .then(res => res.json())
    }
    patchProfileAvatar(picture){
        fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me/avatar`, {
        method: 'PATCH',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            avatar: picture
        })
        })
    }
    patchProfileInfo(username, status){
        fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/users/me`, {
        method: 'PATCH',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: username,
            about: status
        })
        }); 
    }
    postNewCard(text, url) {
        return fetch(`https://mesto.nomoreparties.co/v1/${this._groupId}/cards `, {
        method: 'POST',
        headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: text,
            link: url
        })
        })
        .then(res => res.json())
    }
}