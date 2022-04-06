class Card {
    static selectors = {
        likeActiveClass: 'card__like-icon_active'
    }
    constructor(data, cardSelector, handleCardClick, api, handleDeleteCard) {
      this._name = data.name;
      this._image = data.link;
      this._id = data._id;
      this._likes = data.likes;

      this._cardSelector = cardSelector;
      this._handleCardClick = handleCardClick;
      this._api = api;
      this._handleDeleteCard = handleDeleteCard;
    }
  
    _getTemplate() {
      const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.card')
      .cloneNode(true);
      
    // вернуть DOM-элемент карточки
      return cardElement;
    }
    
    //внешний метод, создающий карточку, наполняющий ее данными и возвращающий наружу
    generateCard() {
      this._element = this._getTemplate();
      this._cardDeleteButton = this._element.querySelector('.card__delete-icon');
      this._likeButton = this._element.querySelector('.card__like-icon');
      this._picture = this._element.querySelector('.card__image');
      this._likesAmount = this._element.querySelector('.card__like-amount');
      this._setEventListeners();
    
      // добавить данные
        this._element.querySelector('.card__place-title').textContent = this._name;
        this._picture.src = this._image;
        this._picture.alt = this._name;
        this._likesAmount.textContent = this._likes.length;

        // вурнуть элемент наружу
        return this._element;
    }

    //приватный метод установки слушателей на элементы внутри карточки
    _setEventListeners() {
      this._picture.addEventListener('click', () => {
        this._handleCardClick(this._name, this._image);
      });
      this._likeButton.addEventListener('click', (e) => {
          if (!e.target.classList.contains(Card.selectors.likeActiveClass)) {
              this._api.putLike(this._id).then((res) => {
                  this._handleLikeButton(e);
                  this._likesAmount.textContent = res.likes.length;
              })
                  .catch((err) => {
                  console.error(err);
                  throw err;
              })
          }
          else {
              this._api.deleteLike(this._id).then((res) => {
                  this._handleLikeButton(e);
                  this._likesAmount.textContent = res.likes.length;
              })
                  .catch((err) => {
                  console.error(err);
                  throw err;
              });
          }
      });
      this._cardDeleteButton.addEventListener('click', (event) => {
          this._handleDeleteCard(this._id, event);
      });
    }

    _handleLikeButton(e) {
      e.target.classList.toggle(Card.selectors.likeActiveClass);
    }
  }

  export {Card};