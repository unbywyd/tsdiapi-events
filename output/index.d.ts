import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { onEvent } from "./events.js";
export { EventController, dispatchEvent, On } from "./events.js";
declare module "fastify" {
    interface FastifyInstance {
        onEvent: typeof onEvent;
        dispatchEvent: typeof dispatchEvent;
    }
}
export type PluginOptions = {};
declare class App implements AppPlugin {
    name: string;
    config: PluginOptions;
    context: AppContext;
    services: AppPlugin['services'];
    constructor(config?: PluginOptions);
    onInit(ctx: AppContext): Promise<void>;
}
export default function createPlugin(config?: PluginOptions): App;
//# sourceMappingURL=index.d.ts.map