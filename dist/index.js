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
      interval: '1000',
      flash: true,
      showOnExit: true,
      onHide: null,
      onShow: null
    };
    config = _objectSpread({}, defaultConfig, {}, config, {
      state: {},
      title: document.title,
      interval: null
    });

    var _showNotification = function _showNotification() {
      if (config.onShow) config.onShow();

      if (!config.flash) {
        document.title = config.message;
        return;
      }

      config.interval = setInterval(function () {
        document.title === config.message ? document.title = config.title : document.title = config.message;
      }, config.interval);
    };

    var _hideNotification = function _hideNotification() {
      if (config.onHide) config.onHide();
      document.title = config.title;

      if (config.flash) {
        clearInterval(config.interval);
        config.interval = null;
      }
    };

    (function () {
      if (!config.showOnExit) return;

      var visibilityHandler = function visibilityHandler() {
        if (document[config.state.hidden]) {
          _showNotification();
        } else {
          _hideNotification();
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
        document.onfocusin = _showNotification();
        document.onfocusout = _hideNotification();
      } else if (typeof document.addEventListener !== "undefined" && config.state.hidden !== undefined) {
        document.addEventListener(config.state.visibilityChange, visibilityHandler, false);
      } else {
        window.onpageshow = window.onfocus = _showNotification();
        window.onpagehide = window.onblur = _hideNotification();
      }
    })();

    return {
      show: _showNotification,
      hide: _hideNotification
    };
  }
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9ub3RpZnkuanMiXSwibmFtZXMiOlsiVGFiTm90aWZ5IiwiY29uZmlnIiwiZGVmYXVsdENvbmZpZyIsIm1lc3NhZ2UiLCJpbnRlcnZhbCIsImZsYXNoIiwic2hvd09uRXhpdCIsIm9uSGlkZSIsIm9uU2hvdyIsInN0YXRlIiwidGl0bGUiLCJkb2N1bWVudCIsIl9zaG93Tm90aWZpY2F0aW9uIiwic2V0SW50ZXJ2YWwiLCJfaGlkZU5vdGlmaWNhdGlvbiIsImNsZWFySW50ZXJ2YWwiLCJ2aXNpYmlsaXR5SGFuZGxlciIsImhpZGRlbiIsInZpc2liaWxpdHlDaGFuZ2UiLCJtc0hpZGRlbiIsIndlYmtpdEhpZGRlbiIsIm1vekhpZGRlbiIsIm9uZm9jdXNpbiIsIm9uZm9jdXNvdXQiLCJhZGRFdmVudExpc3RlbmVyIiwidW5kZWZpbmVkIiwid2luZG93Iiwib25wYWdlc2hvdyIsIm9uZm9jdXMiLCJvbnBhZ2VoaWRlIiwib25ibHVyIiwic2hvdyIsImhpZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7O0FBRWUsV0FBU0EsU0FBVCxDQUFtQkMsTUFBbkIsRUFBMkI7QUFDdEMsUUFBTUMsYUFBYSxHQUFHO0FBQ2xCQyxNQUFBQSxPQUFPLEVBQUUsTUFEUztBQUVsQkMsTUFBQUEsUUFBUSxFQUFFLE1BRlE7QUFHbEJDLE1BQUFBLEtBQUssRUFBRSxJQUhXO0FBSWxCQyxNQUFBQSxVQUFVLEVBQUUsSUFKTTtBQUtsQkMsTUFBQUEsTUFBTSxFQUFFLElBTFU7QUFNbEJDLE1BQUFBLE1BQU0sRUFBRTtBQU5VLEtBQXRCO0FBU0FQLElBQUFBLE1BQU0scUJBQU9DLGFBQVAsTUFBeUJELE1BQXpCO0FBQWlDUSxNQUFBQSxLQUFLLEVBQUUsRUFBeEM7QUFBNENDLE1BQUFBLEtBQUssRUFBRUMsUUFBUSxDQUFDRCxLQUE1RDtBQUFtRU4sTUFBQUEsUUFBUSxFQUFFO0FBQTdFLE1BQU47O0FBUUEsUUFBTVEsaUJBQWlCLEdB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QztBQUNILE9BSkQsTUFJTyxJQUFJLE9BQU9ILFFBQVEsQ0FBQ2EsZ0JBQWhCLEtBQXFDLFdBQXJDLElBQW9EdkIsTUFBTSxDQUFDUSxLQUFQLENBQWFRLE1BQWIsS0FBd0JRLFNBQWhGLEVBQTJGO0FBQzlGZCxRQUFBQSxRQUFRLENBQUNhLGdCQUFULENBQTBCdkIsTUFBTSxDQUFDUSxLQUFQLENBQWFTLGdCQUF2QyxFQUF5REYsaUJBQXpELEVBQTRFLEtBQTVFO0FBQ0gsT0FGTSxNQUVBO0FBQ0hVLFFBQUFBLE1BQU0sQ0FBQ0MsVUFBUCxHQUFvQkQsTUFBTSxDQUFDRSxPQUFQLEdBQWlCaEIsaUJBQWlCLEVBQXREO0FBQ0FjLFFBQUFBLE1BQU0sQ0FBQ0csVUFBUCxHQUFvQkgsTUFBTSxDQUFDSSxNQUFQLEdBQWdCaEIsaUJBQWlCLEVBQXJEO0FBQ0g7QUFDSixLQXpDRDs7QUEyQ0EsV0FBTztBQUNIaUIsTUFBQUEsSUFBSSxFQUFFbkIsaUJBREg7QUFFSG9CLE1BQUFBLElBQUksRUFBRWxCO0FBRkgsS0FBUDtBQUlIIiwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBzdHJpY3QnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBUYWJOb3RpZnkoY29uZmlnKSB7XG4gICAgY29uc3QgZGVmYXVsdENvbmZpZyA9IHtcbiAgICAgICAgbWVzc2FnZTogJ0hleSEnLFxuICAgICAgICBpbnRlcnZhbDogJzEwMDAnLFxuICAgICAgICBmbGFzaDogdHJ1ZSxcbiAgICAgICAgc2hvd09uRXhpdDogdHJ1ZSxcbiAgICAgICAgb25IaWRlOiBudWxsLFxuICAgICAgICBvblNob3c6IG51bGxcbiAgICB9XG5cbiAgICBjb25maWcgPSB7Li4uZGVmYXVsdENvbmZpZywgLi4uY29uZmlnLCBzdGF0ZToge30sIHRpdGxlOiBkb2N1bWVudC50aXRsZSwgaW50ZXJ2YWw6IG51bGx9XG5cbiAgICAvLy8vLy8vLy8vLy8vLy8vLy9cbiAgICAvLyBQdWJsaWMgQVBJXG4gICAgLy8vLy8vLy8vLy8vLy8vLy9cblxuICAgIC8vLy8vLy8vLy8vLy8vL1xuICAgIC8vIEluaXRpYWxpemVcbiAgICBjb25zdCBfc2hvd05vdGlmaWNhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZy5vblNob3cpIGNvbmZpZy5vblNob3coKVxuICAgICAgICBcbiAgICAgICAgaWYgKCFjb25maWcuZmxhc2gpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LnRpdGxlID0gY29uZmlnLm1lc3NhZ2VcbiAgICAgICAgICAgIHJldHVyblxuICAgICAgICB9XG5cbiAgICAgICAgY29uZmlnLmludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgICAgICAgZG9jdW1lbnQudGl0bGUgPT09IGNvbmZpZy5tZXNzYWdlXG4gICAgICAgICAgICAgICAgPyBkb2N1bWVudC50aXRsZSA9IGNvbmZpZy50aXRsZVxuICAgICAgICAgICAgICAgIDogZG9jdW1lbnQudGl0bGUgPSBjb25maWcubWVzc2FnZVxuICAgICAgICB9LCBjb25maWcuaW50ZXJ2YWwpXG4gICAgfVxuXG4gICAgLy8vLy8vLy8vLy8vL1xuICAgIC8vIEtpbGxcbiAgICBjb25zdCBfaGlkZU5vdGlmaWNhdGlvbiA9ICgpID0+IHtcbiAgICAgICAgaWYgKGNvbmZpZy5vbkhpZGUpIGNvbmZpZy5vbkhpZGUoKVxuXG4gICAgICAgIGRvY3VtZW50LnRpdGxlID0gY29uZmlnLnRpdGxlXG5cbiAgICAgICAgaWYgKGNvbmZpZy5mbGFzaCkge1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChjb25maWcuaW50ZXJ2YWwpXG4gICAgICAgICAgICBjb25maWcuaW50ZXJ2YWwgPSBudWxsXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICAoKCkgPT4ge1xuICAgICAgICBpZiAoIWNvbmZpZy5zaG93T25FeGl0KSByZXR1cm5cblxuICAgICAgICAvLyB3aW5kb3cuZm9jdXMoKVxuXG4gICAgICAgIGNvbnN0IHZpc2liaWxpdHlIYW5kbGVyID0gKCkgPT4ge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50W2NvbmZpZy5zdGF0ZS5oaWRkZW5dKSB7XG4gICAgICAgICAgICAgICAgX3Nob3dOb3RpZmljYXRpb24oKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBfaGlkZU5vdGlmaWNhdGlvbigpXG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vLy8vXG4gICAgICAgIC8vIERldGVybWluZSB0aGUgdXNlciBicm93c2VyIHZpYSBQYWdlIFZpc2liaWx0aXkgQVBJXG4gICAgICAgIC8vIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9QYWdlX1Zpc2liaWxpdHlfQVBJXG4gICAgICAgIC8vIFNldCB0aGUgbmFtZSBvZiB0aGUgaGlkZGVuIHByb3BlcnR5IGFuZCB0aGUgY2hhbmdlIGV2ZW50IGZvciB2aXNpYmlsaXR5XG4gICAgICAgIGlmICh0eXBlb2YgZG9jdW1lbnQuaGlkZGVuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25maWcuc3RhdGUuaGlkZGVuID0gXCJoaWRkZW5cIlxuICAgICAgICAgICAgY29uZmlnLnN0YXRlLnZpc2liaWxpdHlDaGFuZ2UgPSBcInZpc2liaWxpdHljaGFuZ2VcIlxuICAgICAgICB9IGVsc2UgaWYgKHR5cGVvZiBkb2N1bWVudC5tc0hpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uZmlnLnN0YXRlLmhpZGRlbiA9IFwibXNIaWRkZW5cIlxuICAgICAgICAgICAgY29uZmlnLnN0YXRlLnZpc2liaWxpdHlDaGFuZ2UgPSBcIm1zdmlzaWJpbGl0eWNoYW5nZVwiXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LndlYmtpdEhpZGRlbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uZmlnLnN0YXRlLmhpZGRlbiA9IFwid2Via2l0SGlkZGVuXCJcbiAgICAgICAgICAgIGNvbmZpZy5zdGF0ZS52aXNpYmlsaXR5Q2hhbmdlID0gXCJ3ZWJraXR2aXNpYmlsaXR5Y2hhbmdlXCJcbiAgICAgICAgfSBlbHNlIGlmICh0eXBlb2YgZG9jdW1lbnQubW96SGlkZGVuICE9PSBcInVuZGVmaW5lZFwiKSB7XG4gICAgICAgICAgICBjb25maWcuc3RhdGUuaGlkZGVuID0gXCJtb3pIaWRkZW5cIlxuICAgICAgICAgICAgY29uZmlnLnN0YXRlLnZpc2liaWxpdHlDaGFuZ2UgPSBcIm1venZpc2liaWxpdHljaGFuZ2VcIlxuICAgICAgICB9XG4gICAgICAgIFxuICAgICAgICBpZiAodHlwZW9mIGRvY3VtZW50Lm9uZm9jdXNpbiAhPT0gXCJ1bmRlZmluZWRcIikge1xuICAgICAgICAgICAgY29uZmlnLnN0YXRlLmhpZGRlbiA9IFwib25mb2N1c2luXCJcbiAgICAgICAgICAgIGRvY3VtZW50Lm9uZm9jdXNpbiA9IF9zaG93Tm90aWZpY2F0aW9uKClcbiAgICAgICAgICAgIGRvY3VtZW50Lm9uZm9jdXNvdXQgPSBfaGlkZU5vdGlmaWNhdGlvbigpXG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIgIT09IFwidW5kZWZpbmVkXCIgJiYgY29uZmlnLnN0YXRlLmhpZGRlbiAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKGNvbmZpZy5zdGF0ZS52aXNpYmlsaXR5Q2hhbmdlLCB2aXNpYmlsaXR5SGFuZGxlciwgZmFsc2UpXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB3aW5kb3cub25wYWdlc2hvdyA9IHdpbmRvdy5vbmZvY3VzID0gX3Nob3dOb3RpZmljYXRpb24oKVxuICAgICAgICAgICAgd2luZG93Lm9ucGFnZWhpZGUgPSB3aW5kb3cub25ibHVyID0gX2hpZGVOb3RpZmljYXRpb24oKVxuICAgICAgICB9XG4gICAgfSkoKTtcblxuICAgIHJldHVybiB7XG4gICAgICAgIHNob3c6IF9zaG93Tm90aWZpY2F0aW9uLFxuICAgICAgICBoaWRlOiBfaGlkZU5vdGlmaWNhdGlvblxuICAgIH1cbn1cbiJdfQ==
