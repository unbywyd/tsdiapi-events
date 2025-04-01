import "reflect-metadata";
import { EventController, onEvent } from "./events.js";
export { EventController, dispatchEvent, On, onEvent } from "./events.js";
class App {
    name = 'tsdiapi-events';
    config;
    context;
    services = [];
    constructor(config) {
        this.config = { ...config };
    }
    async onInit(ctx) {
        this.context = ctx;
        this.services = [
            EventController
        ];
        ctx.fastify.decorate('onEvent', onEvent);
        ctx.fastify.decorate('dispatchEvent', dispatchEvent);
    }
}
export default function createPlugin(config) {
    return new App(config);
}
//# sourceMappingURL=index.js.map