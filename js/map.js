'use strict';

(function () {
  const removeFaded = function () {
    const map = window.elements.map();
    map.classList.remove(`map--faded`);
  };

  const setupActiveClick = function () {
    const mapPin = document.querySelector(`.map__pin--main`);
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

    const onEvent = function () {
      removeFaded();
      window.form.removeDisabled();
      window.form.setAdFormsInteractionAvailability(true);
      window.pins.addPins();
    };

    mapPin.addEventListener(`mousedown`, function (evt) {
      if (evt.button === 0) {
        onEvent();
      }
    });
    document.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        onEvent();
      }
    });
    setAddressValue();
  };

  window.map = {
    setupActiveClick,
  };
})();
