'use strict';

const cardTemplate = document.querySelector(`#card`).content.querySelector(`article`);
const map = document.querySelector(`.map`);

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMockAds() {
  let ads = [];
  const apartCheckin = [`12:00`, `13:00`, `14:00`];
  const apartCheckOut = [`12:00`, `13:00`, `14:00`];
  const apartTypes = [`palace`, `flat`, `house`, `bungalow`];
  const apartFeatures = [`wifi`, `dishwasher`, `parking `, `washer `, `elevator `, `conditioner`];
  const apartPhotos = [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`];

  for (let i = 1; i <= 8; i++) {
    const ad = {
      author: {
        avatar: `img/avatars/user0` + i + `.png`,
      },
      offer: {
        title: `name ` + i,
        address: getRandomInteger(0, 600) + ` , ` + getRandomInteger(0, 600),
        price: getRandomInteger(0, 5000),
        type: apartTypes[getRandomInteger(0, apartTypes.length)],
        rooms: getRandomInteger(0, 4),
        guests: getRandomInteger(0, 4),
        checkin: apartCheckin [getRandomInteger(0, apartCheckin.length)],
        checkout: apartCheckOut [getRandomInteger(0, apartCheckOut.length)],
        features: apartFeatures.slice(0, getRandomInteger(1, apartFeatures.length)),
        description: `description ` + i,
        photos: apartPhotos.slice(0, getRandomInteger(1, apartPhotos.length)),
      },
      location: {
        x: getRandomInteger(0, 1200),
        y: getRandomInteger(130, 630),
      },
    };
    ads.push(ad);
  }
  return ads;
}

const data = getMockAds();

const sayings = new Map();
sayings.set(`flat`, `Квартира`);
sayings.set(`bungalow`, `Бунгало`);
sayings.set(`house`, `Дом`);
sayings.set(`palace`, `Дворец`);

function localizeType(type) {
  return sayings.get(type);
}

function removeFaded(mapElement) {
  mapElement.classList.remove(`map--faded`);
}

function removeDisabled(advForm) {
  advForm.classList.remove(`ad-form--disabled`);
}

function addPin(pinData, template, mapElement) {
  const pin = template.cloneNode(true);
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  pin.style.left = pinData.location.x + PIN_WIDTH / 2 + `px`;
  pin.style.top = pinData.location.y - PIN_HEIGHT / 2 + `px`;
  pin.querySelector(`img`).src = pinData.author.avatar;
  pin.querySelector(`img`).alt = pinData.offer.title;
  pin.addEventListener('click', function() {
      updateCard(pinData)
      openCard()
    })
  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      updateCard(pinData)
      openCard()
    }
  });
  mapElement.appendChild(pin);
}

function addPins(mapElement) {
  const template = document.querySelector(`#pin`).content.querySelector(`button`);
  for (let ad of data) {
    addPin(ad, template, mapElement);
  }
}


// Обновляет данные в карточке
function updateCard(cardData) {
  const fields = [
    {
      className: `.popup__title`,
      field: cardData.offer.title,
      text: cardData.offer.title
    },
    {
      className: `.popup__text--address`,
      field: cardData.offer.address,
      text: cardData.offer.address
    },
    {
      className: `.popup__text--price`,
      field: cardData.offer.price,
      text: `${cardData.offer.price} ₽/ночь`
    },
    {
      className: `.popup__type`,
      field: cardData.offer.type,
      text: localizeType(cardData.offer.type)
    },
    {
      className: `.popup__text--capacity`,
      field: cardData.offer.rooms,
      text: `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`
    },
    {
      className: `.popup__text--time`,
      field: cardData.offer.checkin,
      text: `Заезд после ${cardData.offer.checkin}, выезд до ${cardData.offer.checkout}`
    },
    {
      className: `.popup__features`,
      field: cardData.offer.features,
      text: cardData.offer.features.join(`, `)
    },
    {
      className: `.popup__description`,
      field: cardData.offer.description,
      text: cardData.offer.description
    }
  ]
  fields.forEach(field => verifyAndAddTextData(card, field.className, field.field, field.text))

  let photoElement = card.querySelector(`.popup__photos`).querySelector(`.popup__photo`);
  card.querySelector(`.popup__photos`).removeChild(photoElement);

  for (let photo of cardData.offer.photos) {
    let newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.src = photo;
    card.querySelector(`.popup__photos`).appendChild(newPhotoElement);
  }
  card.querySelector(`.popup__avatar`).src = cardData.author.avatar;
}

// Скрывает элемент без данных
function verifyAndAddTextData(card, selector, data, dataMap) {
  if (data !== null) {
    card.querySelector(selector).textContent = dataMap;
  } else {
    card.querySelector(selector).hidden = true;
  }
}

// Задание 10

// Блокировка формы в неактивном состоянии

function setAdFormsInteractionAvailability(isAvailable) {
  const advForm = document.querySelector(`.ad-form`);
  const formElements = advForm.elements;
  for (let i = 0; i < formElements.length; ++i) {
    formElements[i].disabled = !isAvailable;
  }
}
setAdFormsInteractionAvailability(false);

// Активность карты по щелчку мыши
function setupActiveClick() {
  const mapPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const addressInput = document.getElementById(`address`);
  const overlay = document.querySelector(`.map__overlay`);
  const PIN_TIP_HEIGHT = 15;

  const setAddressValue = function () {
    const overlayRect = overlay.getBoundingClientRect();
    const mapPinRect = mapPin.getBoundingClientRect();
    const leftPinPosition = Math.round((mapPinRect.width / 2) + mapPinRect.left - overlayRect.left);
    const topPinPosition = Math.round(mapPinRect.top + mapPinRect.height - overlayRect.top);
    addressInput.value = leftPinPosition + `, ` + (topPinPosition + PIN_TIP_HEIGHT);
  };

  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      removeFaded(map);
      removeDisabled(form);
      setAdFormsInteractionAvailability(true);
    }
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      removeFaded(map);
      removeDisabled(form);
      setAdFormsInteractionAvailability(true);
    }
  });
  setAddressValue();
}

setupActiveClick();


// Отправка формы

function addValidation() {
  const advHeadInput = document.getElementById(`title`);
  addInputValidation(advHeadInput);

  const advCapacityElement = document.getElementById(`capacity`);
  const advRoomElement = document.getElementById(`room_number`);
  addSelectsValidation(advCapacityElement, advRoomElement);

  const advCheckIn = document.getElementById(`timein`);
  const advCheckOut = document.getElementById(`timeout`);
  addTimeValidation(advCheckIn, advCheckOut);

  const advPrice = document.getElementById(`price`);
  const advTypeOfHouse = document.getElementById('type');
  addTypeValidation(advTypeOfHouse, advPrice);
}

function addInputValidation(input) {
  input.addEventListener(`invalid`, function () {
    if (input.validity.tooShort) {
      input.setCustomValidity(`Заголовок должен состоять минимум из 30-ти символов`);
    } else if (input.validity.tooLong) {
      input.setCustomValidity(`Заголовок не должен превышать 100 символов`);
    } else if (input.validity.valueMissing) {
      input.setCustomValidity(`Обязательное поле`);
    } else {
      input.setCustomValidity(``);
    }
  });
}

function priceInputValidation(priceInput, maxValue, minValue) {
  priceInput.max = maxValue;
  priceInput.min = minValue;
  priceInput.placeholder = minValue;
  priceInput.addEventListener(`change`, function () {
    if (priceInput.value > maxValue) {
      priceInput.value = maxValue;
    }

    if (priceInput.value < minValue) {
      priceInput.value = minValue;
    }
  });
}

function addTypeValidation(typeOfHousing, priceInput) {
  const onChangeEvent = function (newTypeValue) {
    const checkTypeMap = new Map();
    checkTypeMap.set("bungalow", 0);
    checkTypeMap.set("flat", 1000);
    checkTypeMap.set("house", 5000);
    checkTypeMap.set("palace", 10000);
    const minValue = checkTypeMap.get(newTypeValue);
    priceInputValidation(priceInput, 1000000, minValue);
  };
  typeOfHousing.addEventListener(`change`, (event) => {
    const type = event.target.value;
    onChangeEvent(type);
  });
  onChangeEvent(typeOfHousing.value);
}

function addTimeValidation(checkInSelect, checkOutSelect) {
  const onChangeEvent = function (newTimesValue) {
    const checkTimeMap = new Map();
    checkTimeMap.set(`12:00`, [`12:00`]);
    checkTimeMap.set(`13:00`, [`13:00`]);
    checkTimeMap.set(`14:00`, [`14:00`]);
    const timesForCheck = checkTimeMap.get(newTimesValue);

    for (let i = 0; i < checkOutSelect.options.length; i++) {
      if (timesForCheck.includes(checkOutSelect.options[i].value)) {
        checkOutSelect.options[i].disabled = false;
        checkOutSelect.options[i].selected = true;
      } else {
        checkOutSelect.options[i].disabled = true;
      }
    }
  };
  checkInSelect.addEventListener(`change`, (event) => {
    const times = event.target.value;
    onChangeEvent(times);
  });
  onChangeEvent(checkOutSelect.value);
}

function addSelectsValidation(capacitySelect, roomSelect) {
  const onChangeEvent = function (newRoomsValue) {
    const roomCapacityMap = new Map();
    roomCapacityMap.set(`1`, [`1`]);
    roomCapacityMap.set(`2`, [`2`, `1`]);
    roomCapacityMap.set(`3`, [`3`, `2`, `1`]);
    roomCapacityMap.set(`100`, [`0`]);
    const capacityForRooms = roomCapacityMap.get(newRoomsValue);

    for (let i = 0; i < capacitySelect.options.length; i++) {
      if (capacityForRooms.includes(capacitySelect.options[i].value)) {
        capacitySelect.options[i].disabled = false;
        capacitySelect.options[i].selected = true;
      } else {
        capacitySelect.options[i].disabled = true;
      }
    }
  };
  roomSelect.addEventListener(`change`, (event) => {
    const rooms = event.target.value;
    onChangeEvent(rooms);
  });
  onChangeEvent(roomSelect.value);
}

addValidation();

addPins(map);

function closeCard (card) {
  card.classList.add('hidden')
}

function openCard() {
  card.classList.remove('hidden')
}

const createCard = () => {
  const card = cardTemplate.cloneNode(true);
  closeCard(card)
  const closeButton = card.querySelector('.popup__close');
  closeButton.addEventListener('click', () => closeCard(card))
  closeButton.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      closeCard(card)
    }
  });
  map.insertBefore(card, map.querySelector(`.map__filters-container`));
  return card;
}

const card = createCard();

// Карточки объявлений открытие / закрытие

// const popupOpen = document.querySelector(".map__pin");
// const mapPopup = document.querySelector(".map__card");
// const popupClose = document.querySelector(".popup__close");
//
// const onPopupEscPress = function (evt) {
//   if (evt.key === 'Escape') {
//     evt.preventDefault();
//     closePopup();
//   }
// };
//
// const openPopup = function () {
//   mapPopup.classList.remove('hidden');
//   document.addEventListener('keydown', onPopupEscPress);
// };
//
// const closePopup = function () {
//   mapPopup.classList.add('hidden');
//   document.removeEventListener('keydown', onPopupEscPress);
// };
//
// popupOpen.addEventListener('click', function () {
//   openPopup();
// });
//
// popupOpen.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Enter') {
//     openPopup();
//   }
// });
//
// popupClose.addEventListener('click', function () {
//   closePopup();
// });
//
// popupClose.addEventListener('keydown', function (evt) {
//   if (evt.key === 'Enter') {
//     closePopup();
//   }
// });
