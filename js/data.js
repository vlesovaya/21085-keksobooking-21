'use strict';

(function () {
  function getRandomInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  const getMockAds = function () {
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
  };

  window.data = {
    getMockAds
  };
})();
