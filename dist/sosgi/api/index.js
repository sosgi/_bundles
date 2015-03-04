System.register(["./api.js", "./ui.js"], function (_export) {
  var NAMESPACE;
  return {
    setters: [function (_apiJs) {
      for (var _key in _apiJs) {
        _export(_key, _apiJs[_key]);
      }
    }, function (_uiJs) {
      for (var _key2 in _uiJs) {
        _export(_key2, _uiJs[_key2]);
      }
    }],
    execute: function () {
      "use strict";

      NAMESPACE = _export("NAMESPACE", "sosgi.api");
    }
  };
});