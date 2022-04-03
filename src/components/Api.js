export class Api {
    constructor(url, headers) {
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
                //console.log(result);
                return result;
            })
            .catch((err) => {
                console.error(err);
            });
    }

    getInitialData() {
        const promise = fetch(this._url, {
                    method: 'GET',
            headers: {
                authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
                });
        return this._makeRequest(promise);
    }

   createNewCard(newCard) {
        const promise = fetch((this._url), {
            method: 'POST',
            headers: {
                authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                name: newCard.name,
                link: newCard.link
            })
        });
        return this._makeRequest(promise);
   }

   deleteCard(id) {
        const promise = fetch((`${this._url}/${id}`), {
            method: 'DELETE',
            headers: this._headers
        });
        return this._makeRequest(promise);
    }

    editProfile(newUser) {
        const promise = fetch((this._url), {
            method: 'PATCH',
            headers: {
                authorization: 'e0e4f956-51a1-4eae-85fd-7abacc4211a4',
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify({
                name: newUser.user,
                about: newUser.about
            })
        });
        console.log(newUser);
        return this._makeRequest(promise);
    }
}

