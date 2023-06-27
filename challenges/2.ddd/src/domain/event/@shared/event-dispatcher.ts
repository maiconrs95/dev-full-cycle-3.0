import EventDispatcherInterface from './event-dispatcher.interface'
import EventHandlerInterface from './event-handler.interface'
import EventInterface from './event.interface'

type Handlers = { [name: string]: EventHandlerInterface[] }

export default class EventDispatcher implements EventDispatcherInterface {

    private handlers: Handlers = {}

    get getEventHandlers(): Handlers {
        return this.handlers;
    }

    notify(event: EventInterface): void {
        const eventName = event.constructor.name;
        if (this.handlers[eventName]) {
            this.handlers[eventName].forEach((handler) => {
                handler.handle(event);
            });
        }
    }

    register(name: string, handler: EventHandlerInterface): void {
        if (!this.handlers[name]) {
            this.handlers[name] = []
        }
        this.handlers[name].push(handler)
    }

    unregister(name: string, handler: EventHandlerInterface): void {
        if (this.handlers[name]) {
            const index = this.handlers[name].indexOf(handler);
            if (index !== -1) {
                this.handlers[name].splice(index, 1);
            }
        }
    }

    unregisterAll(): void {
        this.handlers = {};
    }
}