import {Command} from 'sosgi-api';

    var cmds = [{
        name: 'config:set',
        man: 'config:set <name> <value>',
        description: 'Set property',
        execute: function(args, out) {
            this.manager.setProperty(args[0], args[1]);
        }
    }, {
        name: 'config:list',
        man: 'config:list',
        description: 'Properties list',
        execute: function(args, out) {
            var stringify = function(obj) {
                if (typeof obj === 'function') {
                    return obj.valueOf();
                }
                return obj + '';
            };
            var props = this.manager.getProperties(),
                s = '';
            for (var name in props) {
                s += name + ' = ' + stringify(props[name]) + '\n';
            }
            out(s);
        }
    }];
class MCommand extends Command{
    constructor(manager, params) {
        super(params);
        this.manager = manager;
    }
}

class Tracker{
    constructor(ctx) {

        var props = ctx.framework.properties();

        var services = [];
        var add = function(service) {
            services.push(service);
            service.updated(props);
        };
        var remove = function(reference) {
            services.remove(reference);
        };
        this.getProperties = function() {
            return ctx.framework.properties();
        };
        this.update = function(name, value) {
            if (name in props || props[name] !== value) {
                for (var i = 0; i < services.length; i++) {
                    services[i].updated(props);
                }
            }
        };
        this.close = function() {
            tracker.close();
        };
        var tracker = ctx.services.tracker($sosgi.api.ManagerService, {
            addingService: function(reference, service) {
                add(service);
            },
            removedService: function(reference, service) {
                remove(service);
            }
        });
        tracker.open();
    }
}

class Manager{
    constructor(tracker) {
        this.tracker = tracker;
    }
    setProperty(name, value) {
        this.tracker.update(name, value);
    };
    getProperties() {
        return this.tracker.getProperties();
    }
}

class Activator{
    start(ctx) {
        this.tracker = new Tracker(ctx);
        this.manager = new Manager(tracker);
        for (var i = 0; i < cmds.length; i++) {
            ctx.services.register(Command, new MCommand(manager, cmds[i]));
        }
    }
    stop(ctx) {
        this.tracker.close();
        this.tracker = null;
        this.manager = null;
    }
}
