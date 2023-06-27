import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Event from "../customer.event";

export default class Log2WhenUserIsCreatedHandler
    implements EventHandlerInterface<Event> {
    handle(e: Event): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}
