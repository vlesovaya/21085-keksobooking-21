'use strict';

(() => {
  const form = document.querySelector(`.ad-form`);
  const resetFormButton = document.querySelector(`.ad-form__reset`);
  const addressInput = document.getElementById(`address`);

  const setAddressValue = (value) => {
    addressInput.value = value;
  };

  function addInputValidation(input) {
    input.addEventListener(window.constants.EVENT.invalid, () => {
      if (input.validity.tooShort) {
        input.setCustomValidity(`Заголовок должен состоять минимум из 30-ти символов`);
      } else if (input.validity.tooLong) {
        input.setCustomValidity(`Заголовок не должен превышать 100 символов`);
      } else if (input.validity.valueMissing) {
        input.setCustomValidity(`Обязательное поле`);
      } else {
        input.setCustomValidity(``);
      }
    });
  }

  function priceInputValidation(priceInput, maxValue, minValue) {
    priceInput.max = maxValue;
    priceInput.min = minValue;
    priceInput.placeholder = minValue;
    priceInput.addEventListener(window.constants.EVENT.change, () => {
      if (priceInput.value > maxValue) {
        priceInput.value = maxValue;
      }
      if (priceInput.value < minValue) {
        priceInput.value = minValue;
      }
    });
  }

  function addTypeValidation(typeOfHousing, priceInput) {
    const onChangeEvent = (newTypeValue) => {
      const checkTypeMap = new Map();
      checkTypeMap.set(`bungalow`, 0);
      checkTypeMap.set(`flat`, 1000);
      checkTypeMap.set(`house`, 5000);
      checkTypeMap.set(`palace`, 10000);
      const minValue = checkTypeMap.get(newTypeValue);
      priceInputValidation(priceInput, 1000000, minValue);
    };
    typeOfHousing.addEventListener(window.constants.EVENT.change, (event) => {
      const type = event.target.value;
      onChangeEvent(type);
    });
    onChangeEvent(typeOfHousing.value);
  }

  function addTimeValidation(checkInSelect, checkOutSelect) {
    const onChangeEvent = (newTimesValue) => {
      const checkTimeMap = new Map();
      checkTimeMap.set(`12:00`, [`12:00`]);
      checkTimeMap.set(`13:00`, [`13:00`]);
      checkTimeMap.set(`14:00`, [`14:00`]);
      const timesForCheck = checkTimeMap.get(newTimesValue);

      for (let i = 0; i < checkOutSelect.options.length; i++) {
        if (timesForCheck.includes(checkOutSelect.options[i].value)) {
          checkOutSelect.options[i].disabled = false;
          checkOutSelect.options[i].selected = true;
        } else {
          checkOutSelect.options[i].disabled = true;
        }
      }
    };
    checkInSelect.addEventListener(window.constants.EVENT.change, (event) => {
      const times = event.target.value;
      onChangeEvent(times);
    });
    onChangeEvent(checkOutSelect.value);
  }

  function addSelectsValidation(capacitySelect, roomSelect) {
    const onChangeEvent = (newRoomsValue) => {
      const roomCapacityMap = new Map();
      roomCapacityMap.set(`1`, [`1`]);
      roomCapacityMap.set(`2`, [`2`, `1`]);
      roomCapacityMap.set(`3`, [`3`, `2`, `1`]);
      roomCapacityMap.set(`100`, [`0`]);
      const capacityForRooms = roomCapacityMap.get(newRoomsValue);

      for (let i = 0; i < capacitySelect.options.length; i++) {
        if (capacityForRooms.includes(capacitySelect.options[i].value)) {
          capacitySelect.options[i].disabled = false;
          capacitySelect.options[i].selected = true;
        } else {
          capacitySelect.options[i].disabled = true;
        }
      }
    };
    roomSelect.addEventListener(window.constants.EVENT.change, (event) => {
      const rooms = event.target.value;
      onChangeEvent(rooms);
    });
    onChangeEvent(roomSelect.value);
  }

  function sendForm(evt) {
    evt.preventDefault();
    const onSuccess = () => {
      window.popups.showSuccess();
      resetForm(evt);
    };
    const onError = (error) => {
      window.popups.showError(error);
    };
    window.data.post(window.constants.postFormUrl, new FormData(form), onSuccess, onError);
  }

  function resetForm(evt) {
    evt.preventDefault();
    form.reset();
    addValidation();
    setAdFormsInteractionAvailability(false);
    addDisabled();
    window.map.reset();
  }

  const addValidation = () => {
    const advHeadInput = document.getElementById(`title`);
    addInputValidation(advHeadInput);

    const advCapacityElement = document.getElementById(`capacity`);
    const advRoomElement = document.getElementById(`room_number`);
    addSelectsValidation(advCapacityElement, advRoomElement);

    const advCheckIn = document.getElementById(`timein`);
    const advCheckOut = document.getElementById(`timeout`);
    addTimeValidation(advCheckIn, advCheckOut);

    const advPrice = document.getElementById(`price`);
    const advTypeOfHouse = document.getElementById(`type`);
    addTypeValidation(advTypeOfHouse, advPrice);
  };

  const removeDisabled = () => {
    form.classList.remove(`ad-form--disabled`);
  };

  const addDisabled = () => {
    form.classList.add(`ad-form--disabled`);
  };

  const setAdFormsInteractionAvailability = (isAvailable) => {
    const formElements = form.elements;
    for (let i = 0; i < formElements.length; ++i) {
      formElements[i].disabled = !isAvailable;
    }
  };

  const addFormProcessing = () => {
    form.addEventListener(window.constants.EVENT.submit, sendForm);
    resetFormButton.addEventListener(window.constants.EVENT.click, resetForm);
  };

  window.form = {
    setAddressValue,
    addValidation,
    removeDisabled,
    addDisabled,
    setAdFormsInteractionAvailability,
    addFormProcessing,
  };
})();
