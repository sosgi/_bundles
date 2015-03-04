System.register([], function (_export) {
    var _prototypeProperties, _classCallCheck, URL_CHANGE, Browser, Router, Route;

    return {
        setters: [],
        execute: function () {
            "use strict";

            _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            URL_CHANGE = _export("URL_CHANGE", "url.change");
            Browser = _export("Browser", (function () {
                function Browser() {
                    _classCallCheck(this, Browser);
                }

                _prototypeProperties(Browser, null, {
                    url: {
                        value: function url(params) {},
                        writable: true,
                        configurable: true
                    },
                    frature: {
                        value: function frature() {},
                        writable: true,
                        configurable: true
                    }
                });

                return Browser;
            })());
            Router = _export("Router", (function () {
                function Router() {
                    _classCallCheck(this, Router);
                }

                _prototypeProperties(Router, null, {
                    addRoute: {
                        value: function addRoute(route) {},
                        writable: true,
                        configurable: true
                    },
                    removeRoute: {
                        value: function removeRoute(route) {},
                        writable: true,
                        configurable: true
                    }
                });

                return Router;
            })());
            Route = _export("Route", (function () {
                function Route(rule, callback) {
                    _classCallCheck(this, Route);
                }

                _prototypeProperties(Route, null, {
                    match: {
                        value: function match(url) {},
                        writable: true,
                        configurable: true
                    },
                    run: {
                        value: function run() {},
                        writable: true,
                        configurable: true
                    }
                });

                return Route;
            })());
        }
    };
});