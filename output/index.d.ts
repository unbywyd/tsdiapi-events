import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
export { EventController, dispatchEvent, On } from "./events.js";
export type PluginOptions = {
    autoloadGlobPath: string | false;
};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    bootstrapFilesGlobPath: string;
    context: AppContext;
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map