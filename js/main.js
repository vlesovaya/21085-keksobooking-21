'use strict';

// const map = document.querySelector(`.map`);

const data = window.data.getMockAds();

function removeDisabled(advForm) {
  advForm.classList.remove(`ad-form--disabled`);
}

function addPin(pinData, template, mapElement) {
  const pin = template.cloneNode(true);
  const PIN_WIDTH = 40;
  const PIN_HEIGHT = 40;
  pin.style.left = pinData.location.x + PIN_WIDTH / 2 + `px`;
  pin.style.top = pinData.location.y - PIN_HEIGHT / 2 + `px`;
  pin.querySelector(`img`).src = pinData.author.avatar;
  pin.querySelector(`img`).alt = pinData.offer.title;
  pin.addEventListener(`click`, function () {
    window.card.openCard();
    window.card.updateCard(pinData);
  });
  pin.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.card.openCard();
      window.card.updateCard(pinData);
    }
  });
  mapElement.appendChild(pin);
}

function addPins(mapElement) {
  const template = document.querySelector(`#pin`).content.querySelector(`button`);
  for (let ad of data) {
    addPin(ad, template, mapElement);
  }
}

// Блокировка формы в неактивном состоянии

function setAdFormsInteractionAvailability(isAvailable) {
  const advForm = document.querySelector(`.ad-form`);
  const formElements = advForm.elements;
  for (let i = 0; i < formElements.length; ++i) {
    formElements[i].disabled = !isAvailable;
  }
}

setAdFormsInteractionAvailability(false);

// Активность карты по щелчку мыши
function setupActiveClick() {
  const mapPin = document.querySelector(`.map__pin--main`);
  const form = document.querySelector(`.ad-form`);
  const addressInput = document.getElementById(`address`);
  const overlay = document.querySelector(`.map__overlay`);
  const PIN_TIP_HEIGHT = 15;

  const setAddressValue = function () {
    const overlayRect = overlay.getBoundingClientRect();
    const mapPinRect = mapPin.getBoundingClientRect();
    const leftPinPosition = Math.round((mapPinRect.width / 2) + mapPinRect.left - overlayRect.left);
    const topPinPosition = Math.round(mapPinRect.top + mapPinRect.height - overlayRect.top);
    addressInput.value = leftPinPosition + `, ` + (topPinPosition + PIN_TIP_HEIGHT);
  };

  mapPin.addEventListener(`mousedown`, function (evt) {
    if (evt.button === 0) {
      window.map.removeFaded();
      removeDisabled(form);
      setAdFormsInteractionAvailability(true);
    }
  });
  document.addEventListener(`keydown`, function (evt) {
    if (evt.key === `Enter`) {
      window.map.removeFaded();
      removeDisabled(form);
      setAdFormsInteractionAvailability(true);
    }
  });
  setAddressValue();
}

setupActiveClick();


// Отправка формы
window.form.addValidation();

addPins(window.map.getMap());
