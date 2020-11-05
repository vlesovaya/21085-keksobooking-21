'use strict';

(function () {
  const cardTemplate = document.querySelector(`#card`).content.querySelector(`article`);
  const map = window.map.getMap();

  const createCard = () => {
    const card = cardTemplate.cloneNode(true);
    closeCard(card);
    const closeButton = card.querySelector(`.popup__close`);
    closeButton.addEventListener(`click`, () => closeCard(card));
    closeButton.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        closeCard(card);
      }
    });
    map.insertBefore(card, map.querySelector(`.map__filters-container`));
    return card;
  };

  const card = createCard();

  function closeCard(cardElement) {
    cardElement.classList.add(`hidden`);
  }

  // Скрывает элемент без данных
  function verifyAndAddTextData(cardElement, selector, textData, dataMap) {
    if (textData !== null) {
      cardElement.querySelector(selector).textContent = dataMap;
    } else {
      cardElement.querySelector(selector).hidden = true;
    }
  }

  // Обновляет данные в карточке
  const updateCard = (cardData) => {
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

    let photoElement = card.querySelector(`.popup__photos`).querySelector(`.popup__photo`);
    card.querySelector(`.popup__photos`).removeChild(photoElement);

    for (let photo of cardData.offer.photos) {
      let newPhotoElement = photoElement.cloneNode(true);
      newPhotoElement.src = photo;
      card.querySelector(`.popup__photos`).appendChild(newPhotoElement);
    }
    card.querySelector(`.popup__avatar`).src = cardData.author.avatar;
  };

  const openCard = () => {
    card.classList.remove(`hidden`);
  };

  window.card = {
    openCard,
    updateCard
  };
})();
