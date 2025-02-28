import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { EventController } from "./events";
export { EventController, dispatchEvent, On } from "./events";

export type PluginOptions = {
    autoloadGlobPath: string | false;
}
const defaultConfig: PluginOptions = {
    autoloadGlobPath: "*.event{.ts,.js}",
}

class App implements AppPlugin {
    name = 'tsdiapi-events';
    config: PluginOptions;
    bootstrapFilesGlobPath: string;
    context: AppContext;
    constructor(config?: PluginOptions) {
        this.config = { ...config };
        this.bootstrapFilesGlobPath = this.config.autoloadGlobPath ? this.config.autoloadGlobPath : defaultConfig.autoloadGlobPath as string;
        if (this.config.autoloadGlobPath === false) {
            this.bootstrapFilesGlobPath = '';
        }
    }
    async onInit(ctx: AppContext) {
        this.context = ctx;
        this.context.container.get(EventController);
    }
}

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}