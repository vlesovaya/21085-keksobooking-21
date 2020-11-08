'use strict';

(function () {
  let onActivationClickCallback;
  let onMoveCallback;
  let moveMoveEnabled = false;
  let isActive = false;

  function didMove() {
    const mapPin = window.elements.mapPin;
    const overlay = window.elements.mapOverlay();
    const PIN_TIP_HEIGHT = 15;

    const overlayRect = overlay.getBoundingClientRect();
    const mapPinRect = mapPin.getBoundingClientRect();
    const leftPinPosition = Math.round((mapPinRect.width / 2) + mapPinRect.left - overlayRect.left);
    const topPinPosition = Math.round(mapPinRect.top + mapPinRect.height - overlayRect.top);

    if (onMoveCallback !== null) {
      onMoveCallback(leftPinPosition, topPinPosition, PIN_TIP_HEIGHT);
    }
  };

  function processMove(shiftX, shiftY) {
    const mapPin = window.elements.mapPin;
    let left = mapPin.style.left - `px`;
    let top = mapPin.style.top - `px`;
    mapPin.style.left = (left + shiftX) + `px`;
    mapPin.style.top = (top + shiftY) + `px`;
  };

  function setupClick() {
    const mapPin = window.elements.mapPin;

    mapPin.addEventListener(`mousedown`, function (evt) {
      if (evt.button !== 0) {
        return;
      }

      if (isActive) {
        moveMoveEnabled = true;
      }

      if (onActivationClickCallback !== null && !isActive) {
        isActive = true;
        onActivationClickCallback();
      }

      const startX = evt.clientX;
      const startY = evt.clientY;

      mapPin.addEventListener(`mousemove`, function (moveEvt) {
        if (evt.button !== 0 || moveMoveEnabled === false) {
          return;
        }
        const shiftX = startX - moveEvt.clientX;
        const shiftY = startY - moveEvt.clientY;

        processMove(shiftX, shiftY);
      });

      mapPin.addEventListener(`mouseup`, function (evt) {
        if (evt.button === 0) {
          didMove();
        }
        moveMoveEnabled = false;
      });
    });

    mapPin.addEventListener(`keydown`, function (evt) {
      if (evt.key !== `Enter`) {
        return;
      }
      if (onActivationClickCallback !== null || isActive) {
        isActive = true;
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
    didMove();
  };

  window.mainPin = {
    setup,
    onActivationClick,
    onMove,
  };
})();
