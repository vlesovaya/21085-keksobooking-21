'use strict';

(() => {
  function removePopup(popup, listenerFunction) {
    window.elements.main.removeChild(popup);
    document.removeEventListener(window.constants.EVENT.keydown, listenerFunction);
  }

  const showError = (error) => {
    const main = window.elements.main;
    const errorPopup = window.elements.errorPopup.cloneNode(true);

    const errorText = errorPopup.querySelector(`.error__message`);
    errorText.textContent = error;

    const errorButton = errorPopup.querySelector(`.error__button`);

    const onClick = () => {
      if (main.contains(errorButton)) {
        removePopup(errorPopup, onEscKeydown);
      }
    };
    const onEscKeydown = (evt) => {
      if (evt.key === `Escape` && main.contains(errorButton)) {
        removePopup(errorPopup, onEscKeydown);
      }
    };

    errorButton.addEventListener(window.constants.EVENT.click, onClick);
    document.addEventListener(window.constants.EVENT.keydown, onEscKeydown);

    main.appendChild(errorPopup);
  };

  const showSuccess = () => {
    const main = window.elements.main;
    const successPopup = window.elements.successPopup.cloneNode(true);

    const onClick = () => {
      if (main.contains(successPopup)) {
        removePopup(successPopup, onEscKeydown);
      }
    };
    const onEscKeydown = (evt) => {
      if (evt.key === `Escape` && main.contains(successPopup)) {
        removePopup(successPopup, onEscKeydown);
      }
    };

    successPopup.addEventListener(window.constants.EVENT.click, onClick);
    document.addEventListener(window.constants.EVENT.keydown, onEscKeydown);

    main.appendChild(successPopup);
  };

  window.popups = {
    showError,
    showSuccess,
  };
})();
