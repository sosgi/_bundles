System.register([], function (_export) {
    var _prototypeProperties, _classCallCheck, ManagerService, Shell, Command, COMMAND_PARAMS;

    function validateArguments(cmd, params) {
        var param, name, type, require, value;
        for (var i = 0; i < COMMAND_PARAMS.length; i++) {
            param = COMMAND_PARAMS[i];
            name = param.name;
            type = param.type || "string";
            require = param.require || false;
            if (name in params) {
                value = params[name];
                if (type && typeof params[name] !== type) {
                    throw new Error("Variable \"" + name + "\" should be \"" + type + "\"");
                }
                if (type === "function") {
                    cmd[name] = params[name];
                    continue;
                }
                if (require && type === "string" && !value) {
                    throw new Error("Empty variable \"" + name + "\"");
                }
                Object.defineProperty(cmd, name, {
                    value: params[name],
                    enumerable: true
                });
            } else if (require) {
                throw new Error("Variable \"" + name + "\" is require in command definition");
            }
        }
    }
    return {
        setters: [],
        execute: function () {
            "use strict";

            _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            ManagerService = _export("ManagerService", function ManagerService() {
                _classCallCheck(this, ManagerService);
            });
            Shell = _export("Shell", (function () {
                function Shell() {
                    _classCallCheck(this, Shell);
                }

                _prototypeProperties(Shell, null, {
                    hasCommand: {
                        value: function hasCommand(name) {},
                        writable: true,
                        configurable: true
                    },
                    addCommand: {
                        /**
                         *
                         * @param {Object|sosgi.api.Command} cmd
                         */

                        value: function addCommand(cmd) {},
                        writable: true,
                        configurable: true
                    },
                    removeCommand: {
                        /**
                         *
                         * @param {String|sosgi.api.Command} cmd Command or command name
                         */

                        value: function removeCommand(cmd) {},
                        writable: true,
                        configurable: true
                    },
                    getCommands: {
                        /**
                         * @return {Array} Return list of commands services
                         */

                        value: function getCommands() {},
                        writable: true,
                        configurable: true
                    },
                    getCommandsName: {

                        /**
                         * @return {Array} Return list of commands services name
                         */

                        value: function getCommandsName() {},
                        writable: true,
                        configurable: true
                    },
                    getCommand: {
                        /**
                         * @param {String} name Command name
                         */

                        value: function getCommand(name) {},
                        writable: true,
                        configurable: true
                    },
                    getCommandUsage: {

                        /**
                         *
                         * @param {String} name Command name
                         * @return {String} Command usage
                         */

                        value: function getCommandUsage(name) {},
                        writable: true,
                        configurable: true
                    },
                    getCommandDescription: {

                        /**
                         *
                         * @param {String} name Command name
                         * @return {String} Command description
                         */

                        value: function getCommandDescription(name) {},
                        writable: true,
                        configurable: true
                    },
                    execute: {

                        /**
                         *
                         * @param {String} cmdLine
                         * @param {Callback} out
                         * @param {Callback} err
                         */

                        value: function execute(cmdLine, out, err) {},
                        writable: true,
                        configurable: true
                    },
                    complete: {
                        value: function complete(cmdLine, callback) {},
                        writable: true,
                        configurable: true
                    }
                });

                return Shell;
            })());

            Command = function Command(params) {
                _classCallCheck(this, Command);

                validateArguments(this, params);
            };

            COMMAND_PARAMS = [{
                name: "name",
                require: true,
                type: "string"
            }, {
                name: "description",
                require: false
            }, {
                name: "man",
                require: false
            }, {
                name: "params",
                require: false,
                type: "object"
            }, {
                name: "order",
                require: false,
                type: "number"
            }, {
                name: "execute",
                require: true,
                type: "function"
            }, {
                name: "complete",
                require: false,
                type: "function"
            }];
        }
    };
});