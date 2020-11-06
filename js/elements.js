'use strict';

(function () {
  const map = function () {
    return document.querySelector(`.map`);
  };

  const card = function () {
    return document.querySelector(`#card`).content.querySelector(`article`);
  };

  window.elements = {
    map,
    card,
  };
})();
