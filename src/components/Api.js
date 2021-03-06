export class Api {
    constructor(url, {headers}) {
        this._url = url;
        this._headers = headers;
    }

    _makeRequest(promise) {
        return promise.then((res) => {
            if (res.ok) {
                return res.json();
            }
            else {
                return Promise.reject(`Ошибка: ${res.status}`);
                throw 'Ошибка запроса';
            }
        })
            .then((result) => {
                console.log(result);
                return result;
            })
    }

    getInitialData() {
        const promise = fetch((`${this._url}/cards`), {
            method: 'GET',
            headers: this._headers,
                });
        return this._makeRequest(promise);
    }

    getProfile() {
        const promise = fetch((`${this._url}/users/me`), {
            method: 'GET',
            headers: this._headers,
        });
        return this._makeRequest(promise);
    }

   createNewCard(newCard) {
        const promise = fetch((`${this._url}/cards`), {
            method: 'POST',
            headers: this._headers,
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link,
                owner: newCard.owner
            })
        });
        return this._makeRequest(promise);
   }

   deleteCard(id) {
        const promise = fetch((`${this._url}/cards/${id}`), {
            method: 'DELETE',
            headers: this._headers,
        });
        return this._makeRequest(promise);
    }

    editProfile(newUser) {
        const promise = fetch((`${this._url}/users/me`), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                name: newUser.user,
                about: newUser.about
            })
        });
        console.log(newUser);
        return this._makeRequest(promise);
    }

    putLike(id) {
        const promise = fetch((`${this._url}/cards/${id}/likes`), {
            method: 'PUT',
            headers: this._headers
        });
        return this._makeRequest(promise);
    }

    deleteLike(id) {
        const promise = fetch((`${this._url}/cards/${id}/likes`), {
            method: 'DELETE',
            headers: this._headers,
        });
        return this._makeRequest(promise);
    }

    editAvatar(newAvatar) {
        const promise = fetch((`${this._url}/users/me/avatar`), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newAvatar.avatar
            })
        });
        return this._makeRequest(promise);
    }
}

