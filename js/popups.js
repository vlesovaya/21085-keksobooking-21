'use strict';

(function () {
  function removePopup(popup, listenerFunction) {
    window.elements.main.removeChild(popup);
    document.removeEventListener(`keydown`, listenerFunction);
  }

  const showError = function (error) {
    const main = window.elements.main;
    const errorPopup = window.elements.errorPopup().cloneNode(true);

    const errorText = errorPopup.querySelector(`.error__message`);
    errorText.textContent = error;

    const errorButton = errorPopup.querySelector(`.error__button`);

    const onClick = function () {
      if (main.contains(errorButton)) {
        removePopup(errorPopup, onEscKeydown);
      }
    };
    const onEscKeydown = function (evt) {
      if (evt.key === `Escape` && main.contains(errorButton)) {
        removePopup(errorPopup, onEscKeydown);
      }
    };

    errorButton.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscKeydown);

    main.appendChild(errorPopup);
  };

  const showSuccess = function () {
    const main = window.elements.main;
    const successPopup = window.elements.successPopup().cloneNode(true);

    const onClick = function () {
      if (main.contains(successPopup)) {
        removePopup(successPopup, onEscKeydown);
      }
    };
    const onEscKeydown = function (evt) {
      if (evt.key === `Escape` && main.contains(successPopup)) {
        removePopup(successPopup, onEscKeydown);
      }
    };

    successPopup.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscKeydown);

    main.appendChild(successPopup);
  };

  window.popups = {
    showError,
    showSuccess,
  };
})();
