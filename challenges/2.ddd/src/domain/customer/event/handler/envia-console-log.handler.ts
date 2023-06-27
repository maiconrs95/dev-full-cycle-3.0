import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import Event from "../customer.event";

export default class LogWhenAdressIsChangedHandler
    implements EventHandlerInterface<Event> {
    handle(event: Event): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}