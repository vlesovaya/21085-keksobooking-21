'use strict';

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMockAds() {
  let ads = [];
  const apartCheckin = ["12:00", "13:00", "14:00"];
  const apartCheckOut = ["12:00", "13:00", "14:00"];
  const apartTypes = ["palace", "flat", "house", "bungalow"];
  const apartFeatures = ["wifi", "dishwasher", "parking ", "washer ", "elevator ", "conditioner"];
  const apartPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

  for (let i = 1; i <= 8; i++) {
    const ad = {
      author: {
        avatar: "img/avatars/user0" + i + ".png",
      },
      offer: {
        title: "name " + i,
        address: getRandomInteger(0, 600) + " , " + getRandomInteger(0, 600),
        price: getRandomInteger(0, 5000),
        type: apartTypes[getRandomInteger(0, apartTypes.length)],
        rooms: getRandomInteger(0, 4),
        guests: getRandomInteger(0, 4),
        checkin: apartCheckin [getRandomInteger(0, apartCheckin.length)],
        checkout: apartCheckOut [getRandomInteger(0, apartCheckOut.length)],
        features: apartFeatures.slice(0, getRandomInteger(1, apartFeatures.length)),
        description: "description " + i,
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

const sayings = new Map();
sayings.set('flat', 'Квартира');
sayings.set('bungalow', 'Бунгало');
sayings.set('house', 'Дом');
sayings.set('palace', 'Дворец');

function localizeType(type) {
  return sayings.get(type);
}

function removeFaded(mapElement) {
  mapElement.classList.remove(`map--faded`);
}

function removeDisabled(advForm) {
  advForm.classList.remove('ad-form--disabled');
}

function addPin(pinData, template, mapElement) {
  const pin = template.cloneNode(true);
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  pin.style.left = pinData.location.x + PIN_WIDTH / 2 + 'px';
  pin.style.top = pinData.location.y - PIN_HEIGHT / 2 + 'px';
  pin.querySelector(`img`).src = pinData.author.avatar;
  pin.querySelector(`img`).alt = pinData.offer.title;
  mapElement.appendChild(pin);
}

function addPins(mapElement) {
  const pinsData = getMockAds();
  const template = document.querySelector(`#pin`).content.querySelector(`button`);
  for (let ad of pinsData) {
    addPin(ad, template, mapElement);
  }
}

const map = document.querySelector(`.map`);
// removeFaded(map);
addPins(map);

// Часть 2

// Отрисовывает DOM-элемент
function addCards(mapElement) {
  const cardDate = getMockAds();
  const template = document.querySelector('#card').content.querySelector('article');
  const ad = cardDate[0];
  addCard(ad, template, mapElement);
}

// Создает карточку и заполняет данными
function addCard(cardDate, template, mapElement) {
  const card = template.cloneNode(true);
  verifyAndAddTextData(card, '.popup__title', cardDate.offer.title, function () {
    return cardDate.offer.title;
  });
  verifyAndAddTextData(card, '.popup__text--address', cardDate.offer.address, function () {
    return cardDate.offer.address;
  });
  verifyAndAddTextData(card, '.popup__text--price', cardDate.offer.price, function () {
    return cardDate.offer.price + '₽/ночь';
  });
  verifyAndAddTextData(card, '.popup__type', cardDate.offer.type, function () {
    return localizeType(cardDate.offer.type);
  });
  verifyAndAddTextData(card, '.popup__text--capacity', cardDate.offer.rooms, function () {
    return cardDate.offer.rooms + ' комнаты для ' + cardDate.offer.guests + ' гостей';
  });
  verifyAndAddTextData(card, '.popup__text--time', cardDate.offer.checkin, function () {
    return 'Заезд после ' + cardDate.offer.checkin + ',' + ' выезд до ' + cardDate.offer.checkout;
  });
  verifyAndAddTextData(card, '.popup__features', cardDate.offer.features, function () {
    return cardDate.offer.features.join(", ");
  });
  verifyAndAddTextData(card, '.popup__description', cardDate.offer.description, function () {
    return cardDate.offer.description;
  });

  let photoElement = card.querySelector('.popup__photos').querySelector('.popup__photo');
  card.querySelector('.popup__photos').removeChild(photoElement);

  for (let photo of cardDate.offer.photos) {
    let newPhotoElement = photoElement.cloneNode(true);
    newPhotoElement.src = photo;
    card.querySelector('.popup__photos').appendChild(newPhotoElement);
  }
  card.querySelector('.popup__avatar').src = cardDate.author.avatar;

  mapElement.insertBefore(card, mapElement.querySelector('.map__filters-container'));
}

// Скрывает элемент без данных
function verifyAndAddTextData(card, selector, data, dataMap) {
  if (data !== null) {
    card.querySelector(selector).textContent = dataMap();
  } else {
    card.querySelector(selector).hidden = true;
  }
}

addCards(map);
// Задание 10

// function disableField() {
//   document.querySelector('.ad-form').disabled = true;
// }

// Активность карты по щелчку мыши (нужен еще счелчок только правой кнопкой)
function setupActiveClick() {
  const mapPin = document.querySelector('.map__pin--main');
  const form = document.querySelector('.ad-form');
  const addressInput = document.getElementById('address');

  const setAddressValue = function () {
    const mapPinRect = mapPin.getBoundingClientRect();
    addressInput.value = (mapPinRect.right + mapPinRect.left) / 2 + ", " + mapPinRect.bottom;
  };

  mapPin.addEventListener('mousedown', function (evt) {
    if (evt.button === 0) {
      removeFaded(map);
      removeDisabled(form);
      setAddressValue();
    }
  });
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      removeFaded(map);
      removeDisabled(form);
      setAddressValue();
    }
  });
}

setupActiveClick();


// Отправка формы

function addValidation() {
  const advHeadInput = document.getElementById('title');
  addInputValidation(advHeadInput);

  const advCapacityElement = document.getElementById('capacity');
  const advRoomElement = document.getElementById('room_number');
  addSelectsValidation(advCapacityElement, advRoomElement);
}

function addInputValidation(input) {
  input.addEventListener('invalid', function () {
    if (input.validity.tooShort) {
      input.setCustomValidity('Заголовок должен состоять минимум из 30-ти символов');
    } else if (input.validity.tooLong) {
      input.setCustomValidity('Заголовок не должен превышать 100 символов');
    } else if (input.validity.valueMissing) {
      input.setCustomValidity('Обязательное поле');
    } else {
      input.setCustomValidity('');
    }
  });
}

function addSelectsValidation(capacitySelect, roomSelect) {
  const onChangeEvent = function (newRoomsValue) {
    const roomCapacityMap = new Map();
    roomCapacityMap.set("1", ["1"]);
    roomCapacityMap.set("2", ["2", "1"]);
    roomCapacityMap.set("3", ["3", "2", "1"]);
    roomCapacityMap.set("100", ["0"]);
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
  roomSelect.addEventListener('change', (event) => {
    const rooms = event.target.value;
    onChangeEvent(rooms);
  });
  onChangeEvent(roomSelect.value);
}

addValidation();
