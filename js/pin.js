'use strict';

(() => {
  const addPin = (pinData, template, mapElement) => {
    const pin = template.cloneNode(true);
    pin.style.left = pinData.location.x + window.constants.PIN_WIDTH / 2 + `px`;
    pin.style.top = pinData.location.y - window.constants.PIN_HEIGHT / 2 + `px`;
    pin.querySelector(`img`).src = pinData.author.avatar;
    pin.querySelector(`img`).alt = pinData.offer.title;
    pin.addEventListener(window.constants.EVENT.click, () => {
      window.card.open();
      window.card.update(pinData);
    });
    pin.addEventListener(window.constants.EVENT.keydown, (evt) => {
      if (evt.key === `Enter`) {
        window.card.open();
        window.card.update(pinData);
      }
    });
    mapElement.querySelector(`.map__pins`).appendChild(pin);
  };

  const add = () => {
    const template = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
    const onSuccess = (data) => {
      window.filters.enable();
      const filteredData = window.filters.filterData(data);
      const map = window.elements.map;
      for (let ad of filteredData) {
        addPin(ad, template, map);
      }
    };
    const onError = (error) => {
      window.popups.showError(error);
      window.filters.disable();
    };
    window.data.load(window.constants.DATA_URL, onSuccess, onError);
  };

  const remove = () => {
    const pins = document.querySelectorAll(`.map__pin:not(.map__pin--main)`);
    pins.forEach((pin) => window.elements.map.querySelector(`.map__pins`).removeChild(pin));
  };

  window.filters.addOnChangeFilterObserver(() => {
    remove();
    add();
  });

  window.pins = {
    add,
    remove,
  };
})();
