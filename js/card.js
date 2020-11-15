'use strict';

(() => {
  const closeCard = (cardElement) => {
    cardElement.classList.add(`hidden`);
  };

  const createCard = () => {
    const cardElement = window.elements.card;
    const card = cardElement.cloneNode(true);
    closeCard(card);
    const closeButton = card.querySelector(`.popup__close`);
    closeButton.addEventListener(window.constants.EVENT.click, () => closeCard(card));
    closeButton.addEventListener(window.constants.EVENT.keydown, (evt) => {
      if (evt.key === `Enter`) {
        closeCard(card);
      }
    });
    const map = window.elements.map;
    map.insertBefore(card, map.querySelector(`.map__filters-container`));
    return card;
  };

  const card = createCard();

  // Скрывает текстовые поля без данных
  const verifyAndAddTextData = (cardElement, selector, textData, dataMap) => {
    if (textData !== null) {
      cardElement.querySelector(selector).textContent = dataMap;
    } else {
      cardElement.querySelector(selector).hidden = true;
    }
  };

  // Скрывает фотографии без данных
  const verifyAndAddPhotos = (cardElement, photos) => {
    const popupPhotos = cardElement.querySelector(`.popup__photos`);
    if (photos === null || photos.length === 0) {
      popupPhotos.classList.add(`hidden`);
    } else {
      cardElement.querySelector(`.popup__photos`).classList.remove(`hidden`);
      let photoElement = popupPhotos.querySelector(`.popup__photo`);
      popupPhotos.querySelectorAll(`.popup__photo`).forEach((photo) => photo.remove());

      for (let photo of photos) {
        let newPhotoElement = photoElement.cloneNode(true);
        newPhotoElement.src = photo;
        popupPhotos.appendChild(newPhotoElement);
      }
    }
  };

  // Обновляет данные в карточке
  const update = (cardData) => {
    const fields = [
      {
        className: `.popup__title`,
        field: cardData.offer.title,
        text: cardData.offer.title,
      },
      {
        className: `.popup__text--address`,
        field: cardData.offer.address,
        text: cardData.offer.address,
      },
      {
        className: `.popup__text--price`,
        field: cardData.offer.price,
        text: `${cardData.offer.price} ₽/ночь`,
      },
      {
        className: `.popup__type`,
        field: cardData.offer.type,
        text: window.localization.localizeType(cardData.offer.type),
      },
      {
        className: `.popup__text--capacity`,
        field: cardData.offer.rooms,
        text: `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`,
      },
      {
        className: `.popup__text--time`,
        field: cardData.offer.checkin,
        text: `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`,
      },
      {
        className: `.popup__features`,
        field: cardData.offer.features,
        text: cardData.offer.features.join(`, `),
      },
      {
        className: `.popup__description`,
        field: cardData.offer.description,
        text: cardData.offer.description,
      },
    ];
    fields.forEach((field) => verifyAndAddTextData(card, field.className, field.field, field.text));

    card.querySelector(`.popup__avatar`).src = cardData.author.avatar;

    verifyAndAddPhotos(card, cardData.offer.photos);
  };

  const open = () => {
    card.classList.remove(`hidden`);
  };

  const hide = () => {
    closeCard(card);
  };

  window.filters.addOnChangeFilterObserver(() => {
    hide();
  });

  window.card = {
    open,
    update,
    hide,
  };
})();
