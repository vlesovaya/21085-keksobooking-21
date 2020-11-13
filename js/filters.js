'use strict';

(function () {
  const filterType = window.elements.mapFilters.querySelector(`#housing-type`);
  const filterPrice = window.elements.mapFilters.querySelector(`#housing-price`);
  const filterRooms = window.elements.mapFilters.querySelector(`#housing-rooms`);
  const filterGuests = window.elements.mapFilters.querySelector(`#housing-guests`);
  const filterFeatures = function () {
    return window.elements.mapFilters.querySelectorAll(`.map__checkbox:checked`);
  };

  let onChangeObservers = [];

  function isTypeApplicable(ad) {
    if (filterType.value === window.constants.ANY) {
      return true;
    }
    return filterType.value === ad.offer.type;
  }

  function areRoomsApplicable(ad) {
    if (filterRooms.value === window.constants.ANY) {
      return true;
    }
    return parseInt(filterRooms.value, 10) === ad.offer.rooms;
  }

  function areGuestsApplicable(ad) {
    if (filterGuests.value === window.constants.ANY) {
      return true;
    }
    return parseInt(filterGuests.value, 10) <= ad.offer.guests;
  }

  function isPriceApplicable(ad) {
    if (filterPrice.value === window.constants.ANY) {
      return true;
    }

    const ranges = {
      "middle": {
        min: 10000,
        max: 50000,
      },
      "low": {
        min: 0,
        max: 10000,
      },
      "high": {
        min: 50000,
        max: Number.MAX_SAFE_INTEGER,
      },
    };

    const filterRange = ranges[filterPrice.value];
    return filterRange.min <= ad.offer.price && filterRange.max >= ad.offer.price;
  }

  function areFeaturesApplicable(ad) {
    const enabledFeatures = Array.from(filterFeatures());
    return enabledFeatures.every((feature) => {
      return ad.offer.features.includes(feature.value);
    });
  }

  const isAdApplicable = function (ad) {
    return isTypeApplicable(ad)
      && isPriceApplicable(ad)
      && areRoomsApplicable(ad)
      && areGuestsApplicable(ad)
      && areFeaturesApplicable(ad);
  };

  const filterData = function (data) {
    return data.filter(isAdApplicable).slice(0, window.constants.MAX_PINS_COUNT);
  };

  const addOnChangeFilterObserver = function (observer) {
    onChangeObservers.push(observer);
  };

  const onChangeFilter = window.utils.debounce(function () {
    onChangeObservers.forEach((observer) => observer());
  });

  window.elements.mapFilters.addEventListener(window.constants.EVENT.change, onChangeFilter);

  window.filters = {
    filterData,
    addOnChangeFilterObserver,
  };
})();
