
export class ManagerService{

}

export class Shell{
    hasCommand(name) {
    }
    /**
     *
     * @param {Object|sosgi.api.Command} cmd
     */
    addCommand(cmd) {
    }
    /**
     *
     * @param {String|sosgi.api.Command} cmd Command or command name
     */
    removeCommand(cmd) {
    }
    /**
     * @return {Array} Return list of commands services
     */
    getCommands() {
    }

    /**
     * @return {Array} Return list of commands services name
     */
    getCommandsName() {
    }
    /**
     * @param {String} name Command name
     */
    getCommand(name) {
    }

    /**
     *
     * @param {String} name Command name
     * @return {String} Command usage
     */
    getCommandUsage(name) {
    }

    /**
     *
     * @param {String} name Command name
     * @return {String} Command description
     */
    getCommandDescription(name) {
    }

    /**
     *
     * @param {String} cmdLine
     * @param {Callback} out
     * @param {Callback} err
     */
    execute(cmdLine, out, err) {
    }

    complete(cmdLine, callback) {
    }
}

class Command{
    constructor(params) {
        validateArguments(this, params);
    }
}

var COMMAND_PARAMS = [{
    name: 'name',
    require: true,
    type: 'string'
}, {
    name: 'description',
    require: false
}, {
    name: 'man',
    require: false
}, {
    name: 'params',
    require: false,
    type: 'object'
}, {
    name: 'order',
    require: false,
    type: 'number'
}, {
    name: 'execute',
    require: true,
    type: 'function'
}, {
    name: 'complete',
    require: false,
    type: 'function'
}];

    
function validateArguments(cmd, params) {
        var param, name, type, require, value;
        for (var i = 0; i < COMMAND_PARAMS.length; i++) {
            param = COMMAND_PARAMS[i];
            name = param.name;
            type = param.type || 'string';
            require = param.require || false;
            if (name in params) {
                value = params[name];
                if (type && typeof params[name] !== type) {
                    throw new Error('Variable "' + name + '" should be "' + type + '"');
                }
                if (type === 'function') {
                    cmd[name] = params[name];
                    continue;
                }
                if (require && type === 'string' && !value) {
                    throw new Error('Empty variable "' + name + '"');
                }
                Object.defineProperty(cmd, name, {
                    value: params[name],
                    enumerable: true
                });
            } else if (require) {
                throw new Error('Variable "' + name + '" is require in command definition');
            }
        }
    }
