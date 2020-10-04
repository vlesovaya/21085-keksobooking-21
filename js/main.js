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

function localizeType(type) {
  const sayings = new Map();
  sayings.set('flat', 'Квартира');
  sayings.set('bungalow', 'Бунгало');
  sayings.set('house', 'Дом');
  sayings.set('palace', 'Дворец');
  return sayings.get(type);
}

function removeFaded(mapElement) {
  mapElement.classList.remove(`map--faded`);
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
removeFaded(map);
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
  card.querySelector('.popup__title').textContent = cardDate.offer.title;
  card.querySelector('.popup__text--address').textContent = cardDate.offer.address;
  card.querySelector('.popup__text--price').textContent = cardDate.offer.price + '₽/ночь';

  card.querySelector('.popup__text--capacity').textContent = cardDate.offer.rooms + ' комнаты для ' + cardDate.offer.guests + ' гостей';
  card.querySelector('.popup__type').textContent = localizeType(cardDate.offer.type);
  card.querySelector('.popup__text--time').textContent = 'Заезд после ' + cardDate.offer.checkin + ' выезд до ' + cardDate.offer.checkout;
  card.querySelector('.popup__features').textContent = cardDate.offer.features.join(", ");
  card.querySelector('.popup__description').textContent = cardDate.offer.description;

  let photoElement = card.querySelector('.popup__photos').querySelector('.popup__photo');
  card.querySelector('.popup__photos').removeChild(photoElement);

  for (let photo of cardDate.offer.photos) {
    let newPhotoElement = photoElement.cloneNode(true);
    photoElement.src = photo;
    card.querySelector('.popup__photos').appendChild(newPhotoElement);
  }
  card.querySelector('.popup__avatar').src = cardDate.author.avatar;

  mapElement.insertBefore(card, mapElement.querySelector('.map__filters-container'));
}

// Скрывает элемент без данных
window.onload = function () {
  if (document.getElementsByClassName('')[0].textContent === "") {
    document.classList.add('hidden');
  }
};
addCards(map);
