'use strict';

(function () {
  const filterType = window.elements.mapFilters().querySelector(`#housing-type`);
  /* Future filters
  const filterPrice = window.elements.mapFilters().querySelector(`#housing-price`);
  const filterRooms = window.elements.mapFilters().querySelector(`#housing-rooms`);
  const filterGuests = window.elements.mapFilters().querySelector(`#housing-guests`);
  const filterFeatures = function () {
    return window.elements.mapFilters().querySelectorAll(`.map__checkbox:checked`);
  };
   */

  let onChangeObservers = [];

  const isTypeApplicable = function (ad) {
    if (filterType.value === window.constants.ANY) {
      return true;
    }
    return filterType.value === ad.offer.type;
  };

  const filterData = function (data) {
    return data.filter(isTypeApplicable).slice(0, window.constants.MAX_PINS_COUNT);
  };

  const addOnChangeFilterObserver = function (observer) {
    onChangeObservers.push(observer);
  };

  window.elements.mapFilters().addEventListener(window.constants.EVENT.change, function () {
    onChangeObservers.forEach((observer) => observer());
  });

  window.filters = {
    filterData,
    addOnChangeFilterObserver,
  };
})();
