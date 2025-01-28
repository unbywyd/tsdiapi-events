# TSDIAPI-Events: Event Handling Plugin for TSDIAPI-Server

**TSDIAPI-Events** is a plugin for TSDIAPI-Server that provides a robust, scalable, and easy-to-use event management system using `mitt` and `TypeDI`. It simplifies event-based communication within your application by leveraging dependency injection and TypeScript decorators.

---

## Key Features

1. **Event Management**:

   - Define and dispatch custom application events.
   - Use TypeScript types to ensure type-safe payloads for all events.

2. **Dependency Injection (DI)**:

   - Events and handlers are seamlessly integrated using `TypeDI` for better modularity and testability.

3. **Type-Safe Decorators**:

   - `@On(event)` decorator to register methods as event listeners directly within services or controllers.
   - Centralized event dispatching with `dispatchEvent`.

4. **Flexible Integration**:
   - Easily integrate into the TSDIAPI-Server lifecycle.
   - Fully customizable for your project's unique event types.

---

## How It Works

### Core Architecture

1. **Dependency Injection**:

   - All services and event controllers are registered and managed via `TypeDI`, ensuring clear and maintainable code.

2. **Event-Driven Communication**:

   - Events are defined with a strongly-typed payload interface.
   - Dispatch events from any service, controller, or middleware using `dispatchEvent`.

3. **Scalable Structure**:
   - Easily organize event handlers by using decorators like `@On`.

---

## Example Usage

### Define Event Types

```typescript
import { On } from "tsdiapi-events";
import { Service } from "typedi";

// Custom event types
export enum EventType {
    onNewUser = "onNewUser",
    onUserDisconnected = "onUserDisconnected",
    onAccountCreated = "onAccountCreated",
}

export interface EventPayloads {
    [EventType.onNewUser]: { userId: string; name: string };
    [EventType.onUserDisconnected]: { userId: string };
    [EventType.onAccountCreated]: { accountId: string };
}

@Service()
export class TestEventClass {
    @On(EventType.onAccountCreated)
    public handleNewUser(payload: EventPayloads[EventType.onAccountCreated]) {
        console.log("New user registered:", payload.accountId);
    }
}

// Dispatch an event
dispatchEvent(EventType.onAccountCreated, { accountId: "123" });

```


## Benefits

- **Scalability**: Manage a large number of events and listeners in a clean and organized way.
- **Type Safety**: Ensure payloads are always correctly structured and validated at compile time.
- **Seamless Integration**: Works effortlessly with TSDIAPI-Server and its plugin system.
- **Extensibility**: Define your own custom events and easily add new listeners or handlers as needed.

---

## Installation

1. Install the plugin:

   ```bash
   npm install tsdiapi-events
   ```

2. Add it to your application:

   ```typescript
   import { createApp } from "tsdiapi-server";
   import TSDIAPIEventsPlugin from "tsdiapi-events";

   createApp({
     plugins: [
       // Add TSDIAPI-Events to plugins
       TSDIAPIEventsPlugin()
     ],
   });
   ```

---

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests to improve the plugin.

---

## License

This library is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

This documentation provides an overview of the library, how to set it up, and detailed examples for integration and usage. Let me know if you'd like to refine it further!
