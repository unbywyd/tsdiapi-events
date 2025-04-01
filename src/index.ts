import "reflect-metadata";
import type { AppContext, AppPlugin } from "@tsdiapi/server";
import { EventController, onEvent } from "./events.js";
export { EventController, dispatchEvent, On, onEvent } from "./events.js";
import fastify, { FastifyInstance } from "fastify";

declare module "fastify" {
    interface FastifyInstance {
        onEvent: typeof onEvent;
        dispatchEvent: typeof dispatchEvent;
    }
}

export type PluginOptions = {
}

class App implements AppPlugin {
    name = 'tsdiapi-events';
    config: PluginOptions;
    context: AppContext;
    services: AppPlugin['services'] = [];
    constructor(config?: PluginOptions) {
        this.config = { ...config };
    }
    async onInit(ctx: AppContext) {
        this.context = ctx;
        this.services = [
            EventController
        ];
        ctx.fastify.decorate('onEvent', onEvent);
        ctx.fastify.decorate('dispatchEvent', dispatchEvent);
    }
}

export default function createPlugin(config?: PluginOptions) {
    return new App(config);
}