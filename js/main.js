'use strict';

function getRandomInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function getMockAds() {
  let ads = [];
  for (let i = 1; i <= 8; i++) {
    const checkinArr = ['12:00', '13:00', '14:00'];
    const typeArr = ['palace', 'flat', 'house', 'bungalow'];
    const apartFeatures = ["wifi", "dishwasher", "parking", "washer", "elevator", "conditioner"];
    const apartPhotos = ["http://o0.github.io/assets/images/tokyo/hotel1.jpg", "http://o0.github.io/assets/images/tokyo/hotel2.jpg", "http://o0.github.io/assets/images/tokyo/hotel3.jpg"];

    const ad = {
      author: {
        avatar: 'img/avatars/user0' + i + '.png',
      },
      offer: {
        title: 'name ' + i,
        address: getRandomInteger(0, 600) + ', ' + getRandomInteger(0, 600),
        price: getRandomInteger(0, 5000),
        type: typeArr[getRandomInteger(0, typeArr.length)],
        rooms: getRandomInteger(0, 4),
        guests: getRandomInteger(0, 4),
        checkin: checkinArr[getRandomInteger(0, checkinArr.length)],
        features: apartFeatures.slice(0, getRandomInteger(1, apartFeatures.length)),
        description: 'description ' + i,
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

const map = document.querySelector(`.map`);
map.classList.remove(`map--faded`);


