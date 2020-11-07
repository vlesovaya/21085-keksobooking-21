'use strict';

(function () {
  const map = document.querySelector(`.map`);

  const card = function () {
    return document.querySelector(`#card`).content.querySelector(`article`);
  };

  window.elements = {
    map,
    card,
  };
})();
