/**
 * Generic EventController to manage event handling.
 * Accepts a generic parameter TEventPayloads for event types and payloads.
 */
export declare class EventController<TEventPayloads extends Record<PropertyKey, unknown>> {
    private emitter;
    on<K extends keyof TEventPayloads>(event: K, handler: (payload: TEventPayloads[K]) => void): void;
    off<K extends keyof TEventPayloads>(event: K, handler: (payload: TEventPayloads[K]) => void): void;
    dispatch<K extends keyof TEventPayloads>(event: K, payload: TEventPayloads[K]): void;
}
/**
 * Utility function for dispatching events globally.
 */
export declare function dispatchEvent<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(controllerClass: new () => EventController<TEventPayloads>, event: K, payload: TEventPayloads[K]): void;
/**
 * Decorator to subscribe a method to an event.
 * Similar to `@On()` in event-dispatch.
 */
export declare function On<TEventPayloads extends Record<PropertyKey, unknown>, K extends keyof TEventPayloads>(controllerClass: new () => EventController<TEventPayloads>, event: K): MethodDecorator;
//# sourceMappingURL=events.d.ts.map