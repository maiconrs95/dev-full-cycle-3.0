import EventHandlerInterface from "../../../@shared/event/event-handler.interface";

export default class Log1WhenUserIsCreatedHandler
    implements EventHandlerInterface {
    handle(): void {
        console.log("Esse é o primeiro console.log do evento: CustomerCreated");
    }
}