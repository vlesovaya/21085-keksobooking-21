'use strict';

(() => {
  const keksRequest = (onSuccess, onError) => {
    let request = new XMLHttpRequest();
    request.timeout = window.constants.TIMEOUT;

    request.addEventListener(window.constants.EVENT.load, () => {
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

    request.addEventListener(window.constants.EVENT.error, () => {
      onError(window.localization.localizeError(`error_connection`));
    });

    request.addEventListener(window.constants.EVENT.timeout, () => {
      onError(window.localization.localizeError(`error_timeout`) + request.timeout + `ms`);
    });

    return request;
  };

  const load = (url, onSuccess, onError) => {
    let request = keksRequest(onSuccess, onError);
    request.responseType = window.constants.REQUEST.json;
    request.open(window.constants.REQUEST.get, url);
    request.send();
  };

  const post = (url, data, onSuccess, onError) => {
    let request = keksRequest(onSuccess, onError);
    request.responseType = window.constants.REQUEST.json;
    request.open(window.constants.REQUEST.post, url);
    request.send(data);
  };

  window.data = {
    load,
    post,
  };
})();
