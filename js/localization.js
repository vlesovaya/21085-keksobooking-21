'use strict';

(function () {
  const sayings = new Map();
  sayings.set(`flat`, `Квартира`);
  sayings.set(`bungalow`, `Бунгало`);
  sayings.set(`house`, `Дом`);
  sayings.set(`palace`, `Дворец`);

  const errors = new Map();
  errors.set(`error_400`, 'Неверный запрос');
  errors.set(`error_401`, 'Пользователь не авторизован');
  errors.set(`error_404`, 'Ничего не найдено');
  errors.set(`error_status`, 'Cтатус ответа');
  errors.set(`error_connection`, 'Произошла ошибка соединения');
  errors.set(`error_timeout`, 'Запрос не успел выполниться за');

  const localizeType = function (type) {
    return sayings.get(type);
  };

  const localizeError = function (error) {
    return errors.get(error);
  };

  window.localization = {
    localizeType,
    localizeError,
  };
})();
