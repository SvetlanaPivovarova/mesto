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
            throw 'Ошибка'
        })
            .then((result) => {
                console.log(result);
                return result;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getInitialData() {
        const promise = fetch(this._url, {
            method: 'GET',
            headers: this._headers,
                });
        return this._makeRequest(promise);
    }

   createNewCard(newCard) {
        const promise = fetch((this._url), {
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
        const promise = fetch((`${this._url}/${id}`), {
            method: 'DELETE',
            headers: this._headers,
        });
        return this._makeRequest(promise);
    }

    editProfile(newUser) {
        const promise = fetch((this._url), {
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
        const promise = fetch((`${this._url}/${id}/likes`), {
            method: 'PUT',
            headers: this._headers
        });
        return this._makeRequest(promise);
    }

    deleteLike(id) {
        const promise = fetch((`${this._url}/${id}/likes`), {
            method: 'DELETE',
            headers: this._headers,
        });
        return this._makeRequest(promise);
    }

    editAvatar(newUser) {
        const promise = fetch((`${this._url}/avatar`), {
            method: 'PATCH',
            headers: this._headers,
            body: JSON.stringify({
                avatar: newUser.avatar
            })
        });
        console.log(newUser);
        return this._makeRequest(promise);
    }
}

