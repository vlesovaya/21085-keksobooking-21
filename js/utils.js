'use strict';

(() => {
  const debounce = (callback) => {
    let lastTimeout = null;

    return (parameters) => {
      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }
      lastTimeout = window.setTimeout(() => {
        callback(parameters);
      }, window.constants.DEBOUNCE_INTERVAL);
    };
  };

  window.utils = {
    debounce,
  };
})();
