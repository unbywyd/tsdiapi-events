import "reflect-metadata";
import { AppContext, AppPlugin } from "tsdiapi-server";
import { EventController } from "./events";
export { EventController, dispatchEvent, On } from "./events";

export type PluginOptions = {
    globEventsPath: string;
}
const defaultConfig: PluginOptions = {
    globEventsPath: "*.event{.ts,.js}",
}

class App implements AppPlugin {
    name = 'tsdiapi-events';
    config: PluginOptions;
    bootstrapFilesGlobPath: string;
    context: AppContext;
    constructor(config?: PluginOptions) {
        this.config = { ...config };
        this.bootstrapFilesGlobPath = this.config.globEventsPath || defaultConfig.globEventsPath;
    }
    async onInit(ctx: AppContext) {
        this.context = ctx;
        this.context.container.get(EventController);
    }
}

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}