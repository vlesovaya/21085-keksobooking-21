'use strict';

(function () {
  const load = function (url, onSuccess, onError) {
    let request = new XMLHttpRequest();

    request.responseType = `json`;

    request.addEventListener(`load`, function () {
      let error;
      switch (request.status) {
        case 200:
          onSuccess(request.response);
          break;
        case 400:
          error = window.localization.localizeError(`error_400`);
          break;
        case 401:
          error = window.localization.localizeError(`error_401`);
          break;
        case 404:
          error = window.localization.localizeError(`error_404`);
          break;

        default:
          error = window.localization.localizeError(`error_timeout`) + `: ` + request.status + ` ` + request.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    request.addEventListener(`error`, function () {
      onError(window.localization.localizeError(`error_connection`));
    });

    request.addEventListener(`timeout`, function () {
      onError(window.localization.localizeError(`error_timeout`) + request.timeout + `ms`);
    });

    request.timeout = 10000; // 10s

    request.open(`GET`, url);
    request.send();
  };

  window.data = {
    load,
  };
})();
