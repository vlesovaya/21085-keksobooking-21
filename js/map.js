'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const getMap = () => {
    return map;
  };

  const removeFaded = () => {
    map.classList.remove(`map--faded`);
  };

  window.map = {
    getMap,
    removeFaded
  };
})();
