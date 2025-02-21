# TSDIAPI-Events: Event Handling Plugin for TSDIAPI-Server

The **TSDIAPI-Events** plugin adds robust, scalable event management to [TSDIAPI-Server](https://github.com/unbywyd/tsdiapi-server). Built with `mitt` and `TypeDI`, it allows event-driven communication through TypeScript decorators, ensuring clean and modular code.

---

## Features

- **Event Decorators**: Use `@On(event)` to register event listeners.
- **Dispatch Events**: Trigger events with `dispatchEvent()`.
- **Type Safety**: Define events with strict TypeScript types for payloads.
- **Integration**: Works with the TSDIAPI-Server lifecycle and dependency injection system.
- **File Autoloading**: Supports automatic loading of event files with glob patterns.

---

## Installation

Install via NPM or CLI:

```bash
npm install @tsdiapi/events
```

or using the CLI:

```bash
tsdiapi plugins add events
```

---

## Code Generation

| Name   | Description                                          |
| ------ | ---------------------------------------------------- |
| `base` | Create a new event file with a basic event listener. |

The **TSDIAPI-Events** plugin includes an event generator to streamline event creation. Use the `tsdiapi` CLI command to generate event files automatically:

```bash
tsdiapi generate events
```

## Example Usage

### Define and Handle Events

```typescript
import { On, dispatchEvent } from "@tsdiapi/events";
import { Service } from "typedi";

export enum EventType {
  onNewUser = "onNewUser",
  onAccountCreated = "onAccountCreated",
}

export interface EventPayloads {
  [EventType.onNewUser]: { userId: string; name: string };
  [EventType.onAccountCreated]: { accountId: string };
}

@Service()
export class EventListener {
  @On(EventType.onNewUser)
  public handleNewUser(payload: EventPayloads[EventType.onNewUser]) {
    console.log("New user:", payload.name);
  }
}

// Dispatch an event
dispatchEvent(EventType.onNewUser, { userId: "123", name: "John Doe" });
```

---

## Plugin Setup

Register the plugin in your `createApp` function:

```typescript
import { createApp } from "@tsdiapi/server";
import TSDIAPIEventsPlugin from "@tsdiapi/events";

createApp({
  plugins: [TSDIAPIEventsPlugin()],
});
```

---

## Configuration

The plugin accepts the following option:

| Option             | Type     | Default Value        | Description                                         |
| ------------------ | -------- | -------------------- | --------------------------------------------------- |
| `autoloadGlobPath` | `string` | `"*.event{.ts,.js}"` | Glob pattern for automatically loading event files. |

Example:

```typescript
import TSDIAPIEventsPlugin from "@tsdiapi/events";

createApp({
  plugins: [
    TSDIAPIEventsPlugin({
      autoloadGlobPath: "*.event.ts", // Custom glob pattern
    }),
  ],
});
```

## Summary

With **TSDIAPI-Events**, you can build scalable, event-driven APIs with minimal boilerplate. It integrates seamlessly with the TSDIAPI ecosystem, enabling better modularity, maintainability, and type-safe communication between components.

For more information, visit the [TSDIAPI-Server GitHub](https://github.com/unbywyd/tsdiapi-server).
