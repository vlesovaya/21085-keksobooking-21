'use strict';

(function () {
  function onActivationClick() {
    removeFaded();
    window.form.removeDisabled();
    window.form.setAdFormsInteractionAvailability(true);
    window.pins.addPins();
  }

  function onMove(leftPinPosition, topPinPosition, tipHeight) {
    window.form.setAddressValue(leftPinPosition + `, ` + (topPinPosition + tipHeight));
  }

  const removeFaded = function () {
    window.elements.map.classList.remove(`map--faded`);
  };

  const addFaded = function () {
    window.elements.map.classList.add(`map--faded`);
  };

  const setupActivationClick = function () {
    window.mainPin.onMove(onMove);
    window.mainPin.onActivationClick(onActivationClick);
    window.mainPin.setup();
  };

  const reset = function () {
    addFaded();
    window.card.hideCard();
    window.mainPin.reset();
    window.pins.removePins();
    setupActivationClick();
  };

  window.map = {
    setupActivationClick,
    reset,
  };
})();
