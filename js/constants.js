'use strict';

(function () {
  const dataUrl = `https://21.javascript.pages.academy/keksobooking/data`;
  const postFormUrl = `https://21.javascript.pages.academy/keksobooking`;

  const MAX_PINS_COUNT = 5;
  const PIN_TIP_HEIGHT = 15;

  const REQUEST = {
    get: `GET`,
    post: `POST`,
    json: `json`,
  };

  const EVENT = {
    change: `change`,
    click: `click`,
    keydown: `keydown`,
    mousemove: `mousemove`,
    mouseup: `mouseup`,
    mousedown: `mousedown`,
    invalid: `invalid`,
    load: `load`,
    error: `error`,
    timeout: `timeout`,
    submit: `submit`,
  };

  const TIMEOUT = 10000; // 10s

  const ANY = `any`;

  window.constants = {
    dataUrl,
    postFormUrl,
    MAX_PINS_COUNT,
    PIN_TIP_HEIGHT,
    TIMEOUT,
    REQUEST,
    EVENT,
    ANY,
  };
})();
