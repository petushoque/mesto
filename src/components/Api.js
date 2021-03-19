import { avatar } from "../utils/constants";

export class Api {
    construcror(){

    }
    getCards(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/cards', {
            headers: {
            authorization: '57e386f4-1a89-4d89-a10b-b49e88b17870'
            }
        })        
        .then(res => res.json())
    }
    getUserInfo(){
        return fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
            headers: {
            authorization: '57e386f4-1a89-4d89-a10b-b49e88b17870'
            }
        })
        .then(res => res.json())
    }
    patchAvatar(picture){
        fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me/avatar', {
            headers: {
            method: 'PATCH',
            authorization: '57e386f4-1a89-4d89-a10b-b49e88b17870',
            'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                avatar: `'${picture}'`
              })
        })
    }

    //ИЗМЕНЕНИЕ ИМЕНИ И СТАТУСА РАБОТАЕТ, ССЫЛКА НА АВУ НЕ ПРИКРЕПЛЯЕТСЯ
    patchTest(int){
        fetch('https://mesto.nomoreparties.co/v1/cohort-21/users/me', {
        method: 'PATCH',
        headers: {
        authorization: '57e386f4-1a89-4d89-a10b-b49e88b17870',
        'Content-Type': 'application/json'
        },
        body: JSON.stringify({
        name: 'Marie Skłodowska Curie',
        about: 'Hello, World',
        avatar: int
        })
        }); 
    }
}