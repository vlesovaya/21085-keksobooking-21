'use strict';

(function () {
  const load = function (url, onSuccess, onError) {
    let request = new XMLHttpRequest();

    request.responseType = 'json';

    request.addEventListener('load', function () {
      let error;
      switch (request.status) {
        case 200:
          onSuccess(request.response);
          break;

        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;

        default:
          error = 'Cтатус ответа: : ' + request.status + ' ' + request.statusText;
      }

      if (error) {
        onError(error);
      }
    });

    request.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    request.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + request.timeout + 'мс');
    });

    request.timeout = 10000; // 10s

    request.open('GET', url);
    request.send();
  };

  window.data = {
    load,
  };
})();
