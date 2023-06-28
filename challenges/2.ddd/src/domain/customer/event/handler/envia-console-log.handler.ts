import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressUpdatedEvent from "../address-updated.event";
export default class LogWhenAdressIsChangedHandler
    implements EventHandlerInterface<AddressUpdatedEvent> {
    handle(event: AddressUpdatedEvent): void {
        const { id, name, address } = event.eventData;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}