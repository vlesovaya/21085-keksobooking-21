'use strict';

(function () {
  let onActivationClickCallback;
  let onMoveCallback;

  function processMove() {
    const mapPin = window.elements.mapPin;
    const overlay = window.elements.mapOverlay();
    const PIN_TIP_HEIGHT = 15;

    const overlayRect = overlay.getBoundingClientRect();
    const mapPinRect = mapPin.getBoundingClientRect();
    const leftPinPosition = Math.round((mapPinRect.width / 2) + mapPinRect.left - overlayRect.left);
    const topPinPosition = Math.round(mapPinRect.top + mapPinRect.height - overlayRect.top);
    onMoveCallback(leftPinPosition, topPinPosition, PIN_TIP_HEIGHT);
  };

  function setupClick() {
    const mapPin = window.elements.mapPin;
    mapPin.addEventListener(`mousedown`, function (evt) {
      if (evt.button === 0) {
        onActivationClickCallback();
      }
    });
    mapPin.addEventListener(`keydown`, function (evt) {
      if (evt.key === `Enter`) {
        onActivationClickCallback();
      }
    });
  };

  const onActivationClick = function (callback) {
    onActivationClickCallback = callback;
  };

  const onMove = function (callback) {
    onMoveCallback = callback;
  };

  const setup = function () {
    setupClick();
    processMove();
  };

  window.mainPin = {
    setup,
    onActivationClick,
    onMove
  };
})();
