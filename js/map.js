'use strict';

(function () {
  function onActivationClick() {
    removeFaded();
    window.form.removeDisabled();
    window.form.setAdFormsInteractionAvailability(true);
    window.pins.addPins();
  };

  function onMove(leftPinPosition, topPinPosition, tipHeight) {
    window.form.setAddressValue(leftPinPosition + `, ` + (topPinPosition + tipHeight));
  };

  const removeFaded = function () {
    const map = window.elements.map;
    map.classList.remove(`map--faded`);
  };

  const setupActivationClick = function () {
    window.mainPin.onMove(onMove);
    window.mainPin.onActivationClick(onActivationClick);
    window.mainPin.setup();
  };

  window.map = {
    setupActivationClick,
  };
})();
