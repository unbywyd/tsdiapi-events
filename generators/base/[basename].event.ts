import { On, dispatchEvent} from "@tsdiapi/events";
import { Service } from "typedi";

export enum {{className}}EventType {
    on{{className}} = "on{{className}}",
}

export interface {{className}}EventPayload {
    [{{className}}EventType.on{{className}}]: Record<string, any>;
}

@Service()
export class {{className}}Events {
    @On({{className}}EventType.on{{className}})
    public on{{className}}(payload: {{className}}EventPayload[{{className}}EventType.on{{className}}]) {
        console.log(`{{className}} ${payload.message}!`);
    }
}

setTimeout(() => {
    // Dispatch an event
    dispatchEvent({{className}}EventType.on{{className}}, { message: "I am a buffalo" });
}, 1000);