'use strict';


function mockData() {
  const advertisments = [
    {
      author: {
        avatar: `img/avatars/user01.png`,
      },
      offer: {
        title: `title 1`,
        address: `600, 350`,
        price: 100,
        type: `palace`,
        rooms: 2,
        guests: 100,
        checkin: `14:00`,
        checkout: `14:00`,
        features: [`wifi`, `dishwasher`, `washer`, `elevator`, `conditioner`],
        description: `description 1`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 170,
        y: 600,
      },
    },
    {
      author: {
        avatar: `img/avatars/user02.png`,
      },
      offer: {
        title: `title 2`,
        address: `600, 350`,
        price: 200,
        type: `flat`,
        rooms: 2,
        guests: 4,
        checkin: `12:00`,
        checkout: `12:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 2`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 280,
        y: 550,
      },
    },
    {
      author: {
        avatar: `img/avatars/user03.png`,
      },
      offer: {
        title: `title 3`,
        address: `600, 350`,
        price: 350,
        type: `house`,
        rooms: 3,
        guests: 8,
        checkin: `12:00`,
        checkout: `13:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 3`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 376,
        y: 280,
      },
    },
    {
      author: {
        avatar: `img/avatars/user04.png`,
      },
      offer: {
        title: `title 4`,
        address: `600, 350`,
        price: 150,
        type: `bungalow`,
        rooms: 1,
        guests: 2,
        checkin: `14:00`,
        checkout: `12:00`,
        features: [`wifi`, `dishwasher`, `washer`, `elevator`, `conditioner`],
        description: `description 4`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 198,
        y: 356,
      },
    },
    {
      author: {
        avatar: `img/avatars/user05.png`,
      },
      offer: {
        title: `title 5`,
        address: `600, 350`,
        price: 175,
        type: `palace`,
        rooms: 1,
        guests: 2,
        checkin: `14:00`,
        checkout: `13:00`,
        features: [`wifi`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 5`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 448,
        y: 365,
      },
    },
    {
      author: {
        avatar: `img/avatars/user06.png`,
      },
      offer: {
        title: `title 6`,
        address: `600, 350`,
        price: 210,
        type: `flat`,
        rooms: 1,
        guests: 4,
        checkin: `14:00`,
        checkout: `12:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 6`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 470,
        y: 415,
      },
    },
    {
      author: {
        avatar: `img/avatars/user07.png`,
      },
      offer: {
        title: `title 7`,
        address: `600, 350`,
        price: 300,
        type: `house`,
        rooms: 3,
        guests: 6,

        checkin: `12:00`,
        checkout: `14:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 7`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 300,
        y: 510,
      },
    },
    {
      author: {
        avatar: `img/avatars/user08.png`,
      },
      offer: {
        title: `title 8`,
        address: `600, 350`,
        price: 280,
        type: `bungalow`,
        rooms: 3,
        guests: 6,
        checkin: `12:00`,
        checkout: `14:00`,
        features: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
        description: `description 8`,
        photos: [`http://o0.github.io/assets/images/tokyo/hotel1.jpg`, `http://o0.github.io/assets/images/tokyo/hotel2.jpg`, `http://o0.github.io/assets/images/tokyo/hotel3.jpg`],
      },
      location: {
        x: 215,
        y: 360,
      },
    },
  ];
  return advertisments;
}

const map = document.querySelector('.map');
map.classList.remove(`map--faded`);
