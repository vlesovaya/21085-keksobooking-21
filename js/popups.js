'use strict';

(function () {
  const showError = function (error) {
    const main = window.elements.main;
    const errorPopup = window.elements.errorPopup().cloneNode(true);

    const errorText = errorPopup.querySelector(`.error__message`);
    errorText.textContent = error;

    const errorButton = errorPopup.querySelector(`.error__button`);

    const removePopup = function () {
      main.removeChild(errorPopup);
      document.removeEventListener(`keydown`, onEscKeydown);
    };
    const onClick = function () {
      if (main.contains(errorButton)) {
        removePopup();
      }
    };
    const onEscKeydown = function (evt) {
      if (evt.key === `Escape` && main.contains(errorButton)) {
        removePopup();
      }
    };

    errorButton.addEventListener(`click`, onClick);
    document.addEventListener(`keydown`, onEscKeydown);

    main.appendChild(errorPopup);
  };

  const showSuccess = function () {
    const main = window.elements.main;
    const successPopup = window.elements.successPopup().cloneNode(true);

    const removePopup = function () {
      main.removeChild(successPopup);
      document.removeEventListener(`keydown`, onEscKeydown);
    };
    const onClick = function () {
      if (main.contains(successPopup)) {
        removePopup();
      }
    };
    const onEscKeydown = function (evt) {
      if (evt.key === `Escape` && main.contains(successPopup)) {
        removePopup();
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
