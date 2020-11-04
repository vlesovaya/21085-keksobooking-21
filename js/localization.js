'use strict';

(function () {
  const sayings = new Map();
  sayings.set(`flat`, `Квартира`);
  sayings.set(`bungalow`, `Бунгало`);
  sayings.set(`house`, `Дом`);
  sayings.set(`palace`, `Дворец`);

  const localizeType = function localizeType(type) {
    return sayings.get(type);
  };
  window.localization = {
    localizeType
  };
})();
