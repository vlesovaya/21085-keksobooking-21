'use strict';

(function () {
  const main = document.querySelector(`main`);
  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const card = document.querySelector(`#card`).content.querySelector(`article`);

  const errorPopup = document.querySelector(`#error`).content.querySelector(`.error`);

  const successPopup = document.querySelector(`#success`).content.querySelector(`.success`);

  const mapOverlay = document.querySelector(`.map__overlay`);

  const mapFilters = map.querySelector(`.map__filters`);


  window.elements = {
    main,
    map,
    mapPin,
    card,
    mapOverlay,
    errorPopup,
    successPopup,
    mapFilters,
  };
})();
