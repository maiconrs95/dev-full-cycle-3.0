import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import AddressChangedEvent from "../address-changed.event";



export default class LogWhenAdressIsChangedHandler
    implements EventHandlerInterface<AddressChangedEvent> {
    handle(event: AddressChangedEvent): void {
        const { id, name, address } = event;
        console.log(`Endereço do cliente: ${id}, ${name} alterado para: ${address}`);
    }
}