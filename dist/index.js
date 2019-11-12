function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

(function (global, factory) {
  if (typeof define === "function" && define.amd) {
    define(["exports"], factory);
  } else if (typeof exports !== "undefined") {
    factory(exports);
  } else {
    var mod = {
      exports: {}
    };
    factory(mod.exports);
    global.notify = mod.exports;
  }
})((typeof globalThis === "undefined" ? "undefined" : _typeof(globalThis)) === "object" ? globalThis : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : this, function (_exports) {
  'use strict';

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = TabNotify;

  function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

  function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

  function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

  function TabNotify(config) {
    var defaultConfig = {
      message: 'Hey!',
      delay: '1000',
      showOnExit: true
    };
    config = _objectSpread({}, defaultConfig, {}, config, {
      state: {},
      title: document.title,
      interval: null
    });

    var _show = function _show() {
      config.interval = setInterval(function () {
        document.title === config.message ? document.title = config.title : document.title = config.message;
      }, config.delay);
    };

    var _hide = function _hide() {
      clearInterval(config.interval);
      document.title = config.title;
      config.interval = null;
    };

    (function () {
      if (!config.showOnExit) return;
      window.focus();

      var visibilityHandler = function visibilityHandler() {
        if (document[config.state.hidden]) {
          _show();
        } else {
          _hide();
        }
      };

      if (typeof document.hidden !== "undefined") {
        config.state.hidden = "hidden";
        config.state.visibilityChange = "visibilitychange";
      } else if (typeof document.msHidden !== "undefined") {
        config.state.hidden = "msHidden";
        config.state.visibilityChange = "msvisibilitychange";
      } else if (typeof document.webkitHidden !== "undefined") {
        config.state.hidden = "webkitHidden";
        config.state.visibilityChange = "webkitvisibilitychange";
      } else if (typeof document.mozHidden !== "undefined") {
        config.state.hidden = "mozHidden";
        config.state.visibilityChange = "mozvisibilitychange";
      }

      if (typeof document.onfocusin !== "undefined") {
        config.state.hidden = "onfocusin";
        document.onfocusin = _show();
        document.onfocusout = _hide();
      } else if (typeof document.addEventListener !== "undefined" && config.state.hidden !== undefined) {
        document.addEventListener(config.state.visibilityChange, visibilityHandler, false);
      } else {
        window.onpageshow = window.onfocus = _show();
        window.onpagehide = window.onblur = _hide();
      }
    })();

    return {
      show: _show,
      hide: _hide
    };
  }
});
