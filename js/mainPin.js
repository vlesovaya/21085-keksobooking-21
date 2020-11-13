'use strict';

(function () {
  let onActivationClickCallback;
  let onMoveCallback;
  let moveEnabled = false;
  let isActive = false;

  let initialCoordinates = {
    top: 0,
    left: 0,
  };

  const MovementLimitations = {
    top: 130,
    bottom: 630 - getPinSize().height,
    left: 0,
    right: 1200 - getPinSize().width,
  };

  function getPinSize() {
    const mapPin = window.elements.mapPin;
    const mapPinRect = mapPin.getBoundingClientRect();
    return {
      height: mapPinRect.height + window.constants.PIN_TIP_HEIGHT,
      width: mapPinRect.width,
    };
  }

  function processMove(newX, newY, mapPin) {
    if (newX < MovementLimitations.right && newX > MovementLimitations.left) {
      mapPin.style.left = newX + `px`;
    }
    if (newY < MovementLimitations.bottom && newY > MovementLimitations.top) {
      mapPin.style.top = newY + `px`;
    }
  }

  function setupClick() {
    const mapPin = window.elements.mapPin;

    mapPin.addEventListener(window.constants.EVENT.mousedown, function (evt) {
      if (evt.button !== 0) {
        return;
      }

      if (isActive) {
        moveEnabled = true;
      }

      if (onActivationClickCallback !== null && !isActive) {
        isActive = true;
        onActivationClickCallback();
      }

      const startX = evt.clientX;
      const startY = evt.clientY;

      const pinLeft = parseInt(mapPin.style.left, 10);
      const pinTop = parseInt(mapPin.style.top, 10);

      const onMouseMove = function (moveEvt) {
        if (evt.button !== 0 || moveEnabled === false) {
          return;
        }
        const shiftX = startX - moveEvt.clientX;
        const shiftY = startY - moveEvt.clientY;

        const currentX = pinLeft - shiftX;
        const currentY = pinTop - shiftY;

        processMove(currentX, currentY, mapPin);
      };

      const onMouseUp = function () {
        if (evt.button !== 0 || moveEnabled === false) {
          return;
        }
        didMove();
        moveEnabled = false;

        window.elements.map.removeEventListener(window.constants.EVENT.mousemove, onMouseMove);
        window.elements.map.removeEventListener(window.constants.EVENT.mouseup, onMouseUp);
      };

      window.elements.map.addEventListener(window.constants.EVENT.mousemove, onMouseMove);
      window.elements.map.addEventListener(window.constants.EVENT.mouseup, onMouseUp);
    });

    mapPin.addEventListener(window.constants.EVENT.keydown, function (evt) {
      if (evt.key !== `Enter`) {
        return;
      }
      if (onActivationClickCallback !== null || isActive) {
        isActive = true;
        onActivationClickCallback();
      }
    });
  }

  function didMove() {
    const mapPin = window.elements.mapPin;
    const overlay = window.elements.mapOverlay;

    const mapPinRect = mapPin.getBoundingClientRect();
    const overlayRect = overlay.getBoundingClientRect();
    const leftPinPosition = Math.round((mapPinRect.width / 2) + mapPinRect.left - overlayRect.left);
    const topPinPosition = Math.round(mapPinRect.top + mapPinRect.height - overlayRect.top);

    if (onMoveCallback !== null) {
      onMoveCallback(leftPinPosition, topPinPosition, window.constants.PIN_TIP_HEIGHT);
    }
  }

  const onActivationClick = function (callback) {
    onActivationClickCallback = callback;
  };

  const onMove = function (callback) {
    onMoveCallback = callback;
  };

  const setup = function () {
    isActive = false;
    moveEnabled = false;
    setupClick();
    didMove();
    const mapPin = window.elements.mapPin;
    initialCoordinates = {
      top: parseInt(mapPin.style.top, 10),
      left: parseInt(mapPin.style.left, 10),
    };
  };

  const reset = function () {
    const mapPin = window.elements.mapPin;
    processMove(initialCoordinates.left, initialCoordinates.top, mapPin);
    setup();
  };

  window.mainPin = {
    setup,
    reset,
    onActivationClick,
    onMove,
  };
})();
