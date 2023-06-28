import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

import CustomerCreatedEvent from "../customer-created.event";


export default class Log2WhenUserIsCreatedHandler
    implements EventHandlerInterface<CustomerCreatedEvent> {
    handle(e: CustomerCreatedEvent): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}
