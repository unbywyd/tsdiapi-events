import mitt, { Emitter } from "mitt";
import Container, { Service } from "typedi";

/**
 * Generic EventController to manage event handling.
 * Accepts a generic parameter TEventPayloads for event types and payloads.
 */
@Service()
export class EventController<TEventPayloads extends Record<PropertyKey, unknown>> {
    private emitter: Emitter<TEventPayloads> = mitt<TEventPayloads>();

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

/**
 * Utility function for dispatching events globally.
 */
export function dispatchEvent<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(
    controllerClass: new () => EventController<TEventPayloads>,
    event: K,
    payload: TEventPayloads[K]
): void {
    const controller = Container.get(controllerClass);
    controller.dispatch(event, payload);
}

/**
 * Decorator to subscribe a method to an event.
 * Similar to `@On()` in event-dispatch.
 */
export function On<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(
    controllerClass: new () => EventController<TEventPayloads>,
    event: K
): MethodDecorator {
    return (target, propertyKey, descriptor) => {
        const originalMethod = descriptor.value as Function;

        /**
         * Subscribe to the event during class initialization.
         * When the event occurs, invoke the original method with the payload.
         */
        Container.get(controllerClass).on(event, (payload: TEventPayloads[K]) => {
            // Retrieve the class instance from TypeDI container.
            const instance = Container.get(target.constructor);
            // Call the original method with the payload.
            originalMethod.call(instance, payload);
        });

        return descriptor;
    };
}
