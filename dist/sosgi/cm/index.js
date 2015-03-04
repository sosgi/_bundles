System.register(["sosgi-api"], function (_export) {
    var Command, _prototypeProperties, _get, _inherits, _classCallCheck, cmds, MCommand, Tracker, Manager, Activator;

    return {
        setters: [function (_sosgiApi) {
            Command = _sosgiApi.Command;
        }],
        execute: function () {
            "use strict";

            _prototypeProperties = function (child, staticProps, instanceProps) { if (staticProps) Object.defineProperties(child, staticProps); if (instanceProps) Object.defineProperties(child.prototype, instanceProps); };

            _get = function get(object, property, receiver) { var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc && desc.writable) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

            _inherits = function (subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) subClass.__proto__ = superClass; };

            _classCallCheck = function (instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } };

            cmds = [{
                name: "config:set",
                man: "config:set <name> <value>",
                description: "Set property",
                execute: function execute(args, out) {
                    this.manager.setProperty(args[0], args[1]);
                }
            }, {
                name: "config:list",
                man: "config:list",
                description: "Properties list",
                execute: function execute(args, out) {
                    var stringify = function stringify(obj) {
                        if (typeof obj === "function") {
                            return obj.valueOf();
                        }
                        return obj + "";
                    };
                    var props = this.manager.getProperties(),
                        s = "";
                    for (var name in props) {
                        s += name + " = " + stringify(props[name]) + "\n";
                    }
                    out(s);
                }
            }];

            MCommand = (function (Command) {
                function MCommand(manager, params) {
                    _classCallCheck(this, MCommand);

                    _get(Object.getPrototypeOf(MCommand.prototype), "constructor", this).call(this, params);
                    this.manager = manager;
                }

                _inherits(MCommand, Command);

                return MCommand;
            })(Command);

            Tracker = function Tracker(ctx) {
                _classCallCheck(this, Tracker);

                var props = ctx.framework.properties();

                var services = [];
                var add = function add(service) {
                    services.push(service);
                    service.updated(props);
                };
                var remove = function remove(reference) {
                    services.remove(reference);
                };
                this.getProperties = function () {
                    return ctx.framework.properties();
                };
                this.update = function (name, value) {
                    if (name in props || props[name] !== value) {
                        for (var i = 0; i < services.length; i++) {
                            services[i].updated(props);
                        }
                    }
                };
                this.close = function () {
                    tracker.close();
                };
                var tracker = ctx.services.tracker($sosgi.api.ManagerService, {
                    addingService: function addingService(reference, service) {
                        add(service);
                    },
                    removedService: function removedService(reference, service) {
                        remove(service);
                    }
                });
                tracker.open();
            };

            Manager = (function () {
                function Manager(tracker) {
                    _classCallCheck(this, Manager);

                    this.tracker = tracker;
                }

                _prototypeProperties(Manager, null, {
                    setProperty: {
                        value: function setProperty(name, value) {
                            this.tracker.update(name, value);
                        },
                        writable: true,
                        configurable: true
                    },
                    getProperties: {
                        value: function getProperties() {
                            return this.tracker.getProperties();
                        },
                        writable: true,
                        configurable: true
                    }
                });

                return Manager;
            })();

            Activator = (function () {
                function Activator() {
                    _classCallCheck(this, Activator);
                }

                _prototypeProperties(Activator, null, {
                    start: {
                        value: function start(ctx) {
                            this.tracker = new Tracker(ctx);
                            this.manager = new Manager(tracker);
                            for (var i = 0; i < cmds.length; i++) {
                                ctx.services.register(Command, new MCommand(manager, cmds[i]));
                            }
                        },
                        writable: true,
                        configurable: true
                    },
                    stop: {
                        value: function stop(ctx) {
                            this.tracker.close();
                            this.tracker = null;
                            this.manager = null;
                        },
                        writable: true,
                        configurable: true
                    }
                });

                return Activator;
            })();
        }
    };
});