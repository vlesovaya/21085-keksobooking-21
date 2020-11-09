'use strict';

(function () {
  const map = document.querySelector(`.map`);
  const mapPin = document.querySelector(`.map__pin--main`);

  const card = function () {
    return document.querySelector(`#card`).content.querySelector(`article`);
  };

  const mapOverlay = function () {
    return document.querySelector(`.map__overlay`);
  };

  window.elements = {
    map,
    mapPin,
    card,
    mapOverlay
  };
})();
