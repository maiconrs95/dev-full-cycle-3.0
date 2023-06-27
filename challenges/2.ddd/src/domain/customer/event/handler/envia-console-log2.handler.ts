import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class Log2WhenUserIsCreatedHandler
    implements EventHandlerInterface {
    handle(): void {
        console.log("Esse é o segundo console.log do evento: CustomerCreated");
    }
}
