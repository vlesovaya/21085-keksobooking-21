'use strict';

(function () {
  const main = document.querySelector(`main`);
  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const card = function () {
    return document.querySelector(`#card`).content.querySelector(`article`);
  };

  const errorPopup = function () {
    return document.querySelector(`#error`).content.querySelector(`.error`);
  };

  const successPopup = function () {
    return document.querySelector(`#success`).content.querySelector(`.success`);
  };

  const mapOverlay = function () {
    return document.querySelector(`.map__overlay`);
  };

  window.elements = {
    main,
    map,
    mapPin,
    card,
    mapOverlay,
    errorPopup,
    successPopup,
  };
})();
