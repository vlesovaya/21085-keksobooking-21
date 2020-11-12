'use strict';

(function () {
  const filterType = window.elements.mapFilters().querySelector(`#housing-type`);
  const filterPrice = window.elements.mapFilters().querySelector(`#housing-price`);
  const filterRooms = window.elements.mapFilters().querySelector(`#housing-rooms`);
  const filterGuests = window.elements.mapFilters().querySelector(`#housing-guests`);

  const filterData = function (data) {
    return data;
  };

  window.filters = {
    filterData,
  };
})();
