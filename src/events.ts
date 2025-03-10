import mitt, { Emitter } from 'mitt'
import { Service, Container } from "typedi";

const mittFunc = "default" in mitt ? mitt.default : mitt;
/**
 * Generic EventController to manage event handling.
 * Accepts a generic parameter TEventPayloads for event types and payloads.
 */
@Service()
export class EventController<TEventPayloads extends Record<PropertyKey, unknown>> {
    private emitter: Emitter<TEventPayloads> = mittFunc<TEventPayloads>();

    public on<K extends keyof TEventPayloads>(
        event: K,
        handler: (payload: TEventPayloads[K]) => void
    ): void {
        this.emitter.on(event, handler);
    }

    public off<K extends keyof TEventPayloads>(
        event: K,
        handler: (payload: TEventPayloads[K]) => void
    ): void {
        this.emitter.off(event, handler);
    }

    public dispatch<K extends keyof TEventPayloads>(
        event: K,
        payload: TEventPayloads[K]
    ): void {
        this.emitter.emit(event, payload);
    }
}

export function dispatchEvent<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(
    event: K,
    payload: TEventPayloads[K]
): void {
    const controller = Container.get(EventController);
    controller.dispatch(event, payload);
}

export function On<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(event: K): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value as Function;
        Container.get(EventController).on(event, (payload: TEventPayloads[K]) => {
            const instance = Container.get(target.constructor);
            originalMethod.call(instance, payload);
        });

        return descriptor;
    };
}