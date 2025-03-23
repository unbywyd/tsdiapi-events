var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import mitt from 'mitt';
import { Service, Container } from "typedi";
const mittFunc = "default" in mitt ? mitt.default : mitt;
/**
 * Generic EventController to manage event handling.
 * Accepts a generic parameter TEventPayloads for event types and payloads.
 */
let EventController = class EventController {
    emitter = mittFunc();
    on(event, handler) {
        this.emitter.on(event, handler);
    }
    off(event, handler) {
        this.emitter.off(event, handler);
    }
    dispatch(event, payload) {
        this.emitter.emit(event, payload);
    }
};
EventController = __decorate([
    Service()
], EventController);
export { EventController };
export function dispatchEvent(event, payload) {
    const controller = Container.get(EventController);
    controller.dispatch(event, payload);
}
export function On(event) {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value;
        Container.get(EventController).on(event, (payload) => {
            const instance = Container.get(target.constructor);
            originalMethod.call(instance, payload);
        });
        return descriptor;
    };
}
export function onEvent(event, handler) {
    Container.get(EventController).on(event, handler);
}
//# sourceMappingURL=events.js.map