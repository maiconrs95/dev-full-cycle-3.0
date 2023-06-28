import EventDispatcher from './event-dispatcher'
import SendEmailWhenProductIsCreatedHandler from '../../product/event/handler/send-email-when-product-is-created.handler';
import ProductCreatedEvent from "../../product/event/product-created.event";
import Log1WhenUserIsCreatedHandler from "../../customer/event/handler/envia-console-log1.handler";
import Log2WhenUserIsCreatedHandler from "../../customer/event/handler/envia-console-log2.handler";
import LogWhenAdressIsChangedHandler from "../../customer/event/handler/envia-console-log.handler";

import CustomerCreatedEvent from '../../customer/event/customer-created.event';
import AddressUpdatedEvent from '../../customer/event/address-updated.event';

import Customer from '../../customer/entity/customer';
import Address from '../../customer/value-object/address';

describe('Domain events tests', () => {
    describe('Customer', () => {
        it('should notify when a Customer is created', () => {
            const eventDispatcher = new EventDispatcher();
            const log1WhenUserIsCreatedHandler = new Log1WhenUserIsCreatedHandler();
            const log2WhenUserIsCreatedHandler = new Log2WhenUserIsCreatedHandler();

            const spyLog1EventHandler = jest.spyOn(log1WhenUserIsCreatedHandler, "handle");
            const spyLog2EventHandler = jest.spyOn(log2WhenUserIsCreatedHandler, "handle");

            eventDispatcher.register("CustomerCreatedEvent", log1WhenUserIsCreatedHandler);
            eventDispatcher.register("CustomerCreatedEvent", log2WhenUserIsCreatedHandler);

            expect(
                eventDispatcher.getEventHandlers["CustomerCreatedEvent"][0]
            ).toMatchObject(log1WhenUserIsCreatedHandler);

            const customerCreatedEvent = new CustomerCreatedEvent({});

            eventDispatcher.notify(customerCreatedEvent);

            expect(spyLog1EventHandler).toHaveBeenCalled();
            expect(spyLog2EventHandler).toHaveBeenCalled();
        });

        it('should notify when a Customer address is updated', () => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new LogWhenAdressIsChangedHandler();

            const customer = new Customer('1', 'Maicon');
            const address = new Address('My Street', 200, '000000', 'São Paulo')
            customer.changeAddress(address);

            const spyEventHandler = jest.spyOn(eventHandler, "handle");

            eventDispatcher.register("AddressUpdatedEvent", eventHandler);

            expect(
                eventDispatcher.getEventHandlers["AddressUpdatedEvent"][0]
            ).toMatchObject(eventHandler);

            const customerCreatedEvent = new AddressUpdatedEvent({
                id: customer.id,
                name: customer.name,
                address: address.toString()
            });

            eventDispatcher.notify(customerCreatedEvent);

            expect(spyEventHandler).toHaveBeenCalled();
        });
    });

    describe('Product', () => {
        it('should register an event handler', () => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();

            eventDispatcher.register('ProductCreatedEvent', eventHandler);

            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);
        });

        it('should unregister an event handler', () => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();

            eventDispatcher.register('ProductCreatedEvent', eventHandler);
            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toMatchObject(eventHandler);

            eventDispatcher.unregister('ProductCreatedEvent', eventHandler);

            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
            expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(0);
        });

        it("should unregister all event handlers", () => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();

            eventDispatcher.register("ProductCreatedEvent", eventHandler);

            expect(
                eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
            ).toMatchObject(eventHandler);

            eventDispatcher.unregisterAll();

            expect(
                eventDispatcher.getEventHandlers["ProductCreatedEvent"]
            ).toBeUndefined();
        });

        it('should notify all events handlers', () => {
            const eventDispatcher = new EventDispatcher();
            const eventHandler = new SendEmailWhenProductIsCreatedHandler();
            const spyEventHandler = jest.spyOn(eventHandler, "handle");

            eventDispatcher.register("ProductCreatedEvent", eventHandler);

            expect(
                eventDispatcher.getEventHandlers["ProductCreatedEvent"][0]
            ).toMatchObject(eventHandler);

            const productCreatedEvent = new ProductCreatedEvent({
                name: "Product 1",
                description: "Product 1 description",
                price: 10.0,
            });

            // Quando o notify for executado o SendEmailWhenProductIsCreatedHandler.handle() deve ser chamado
            eventDispatcher.notify(productCreatedEvent);

            expect(spyEventHandler).toHaveBeenCalled();
        });
    });
})