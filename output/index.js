import "reflect-metadata";
import { EventController } from "./events.js";
export { EventController, dispatchEvent, On } from "./events.js";
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
        this.bootstrapFilesGlobPath = this.config.autoloadGlobPath ? this.config.autoloadGlobPath : defaultConfig.autoloadGlobPath;
        if (this.config.autoloadGlobPath === false) {
            this.bootstrapFilesGlobPath = '';
        }
    }
    async onInit(ctx) {
        this.context = ctx;
        this.context.container.get(EventController);
    }
}
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map