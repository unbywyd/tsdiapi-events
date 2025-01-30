"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.On = exports.EventController = void 0;
exports.default = createPlugin;
require("reflect-metadata");
const events_1 = require("./events");
var events_2 = require("./events");
Object.defineProperty(exports, "EventController", { enumerable: true, get: function () { return events_2.EventController; } });
Object.defineProperty(exports, "dispatchEvent", { enumerable: true, get: function () { return events_2.dispatchEvent; } });
Object.defineProperty(exports, "On", { enumerable: true, get: function () { return events_2.On; } });
const defaultConfig = {
    autoloadGlobPath: "*.event{.ts,.js}",
};
class App {
    name = 'tsdiapi-events';
    config;
    bootstrapFilesGlobPath;
    context;
    constructor(config) {
        this.config = { ...config };
        this.bootstrapFilesGlobPath = this.config.autoloadGlobPath || defaultConfig.autoloadGlobPath;
    }
    async onInit(ctx) {
        this.context = ctx;
        this.context.container.get(events_1.EventController);
    }
}
function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map