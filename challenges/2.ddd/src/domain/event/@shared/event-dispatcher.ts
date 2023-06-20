import EventDispatcherInterface from './event-dispatcher.interface'
import EventHandlerInterface from './event-handler.interface'
import EventInterface from './event.interface'

type Handlers = { [name: string]: EventHandlerInterface[] }

export default class EventDispatcher implements EventDispatcherInterface {

    private handlers: Handlers = {}

    notify(event: EventInterface): void {
        return
    }

    register(name: string, handler: EventHandlerInterface<EventInterface>): void {
        if (!this.handlers[name]) {
            this.handlers[name] = []
        }
        this.handlers[name].push(handler)
    }

    unregister(name: string, handler: EventHandlerInterface<EventInterface>): void {
    }

    unregisterAll(): void {
    }

    getEventHandlers(): Handlers {
        return this.handlers;
    }
}