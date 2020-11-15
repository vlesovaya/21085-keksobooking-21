'use strict';

(() => {
  const filterType = window.elements.mapFilters.querySelector(`#housing-type`);
  const filterPrice = window.elements.mapFilters.querySelector(`#housing-price`);
  const filterRooms = window.elements.mapFilters.querySelector(`#housing-rooms`);
  const filterGuests = window.elements.mapFilters.querySelector(`#housing-guests`);
  const filterFeatures = () => window.elements.mapFilters.querySelectorAll(`.map__checkbox:checked`);
  const selects = window.elements.mapFilters.querySelectorAll(`.map__filter`);
  const features = window.elements.mapFilters.querySelectorAll(`.map__features`);

  let onChangeObservers = [];

  const disable = () => {
    [...selects, ...features].forEach((element) => element.setAttribute(`disabled`, true));
  };
  const enable = () => {
    [...selects, ...features].forEach((element) => element.removeAttribute(`disabled`));
  };

  const isTypeApplicable = (ad) => {
    if (filterType.value === window.constants.ANY) {
      return true;
    }
    return filterType.value === ad.offer.type;
  };

  const areRoomsApplicable = (ad) => {
    if (filterRooms.value === window.constants.ANY) {
      return true;
    }
    return parseInt(filterRooms.value, 10) === ad.offer.rooms;
  };

  const areGuestsApplicable = (ad) => {
    if (filterGuests.value === window.constants.ANY) {
      return true;
    }
    return parseInt(filterGuests.value, 10) <= ad.offer.guests;
  };

  const isPriceApplicable = (ad) => {
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
  };

  const areFeaturesApplicable = (ad) => {
    const enabledFeatures = Array.from(filterFeatures());
    return enabledFeatures.every((feature) => {
      return ad.offer.features.includes(feature.value);
    });
  };

  const isAdApplicable = (ad) => isTypeApplicable(ad)
    && isPriceApplicable(ad)
    && areRoomsApplicable(ad)
    && areGuestsApplicable(ad)
    && areFeaturesApplicable(ad);

  const filterData = (data) => data.filter(isAdApplicable).slice(0, window.constants.MAX_PINS_COUNT);

  const addOnChangeFilterObserver = (observer) => {
    onChangeObservers.push(observer);
  };

  const onChangeFilter = window.utils.debounce(() => {
    onChangeObservers.forEach((observer) => observer());
  });

  window.elements.mapFilters.addEventListener(window.constants.EVENT.change, onChangeFilter);
  disable();

  window.filters = {
    filterData,
    addOnChangeFilterObserver,
    disable,
    enable
  };
})();
