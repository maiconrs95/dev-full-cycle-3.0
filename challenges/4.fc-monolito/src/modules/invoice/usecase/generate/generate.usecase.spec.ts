import Id from '../../../@shared/domain/value-object/id.value-object';
import InvoiceItem from '../../domain/item.entity';
import GenerateInvoiceUseCase from './generate.usecase'

const MockRepository = () => {
    return {
        generate: jest.fn(),
        find: jest.fn(),
    }
};

describe("generate Invoice Usecase unit test", () => {
    it("should generate a Invoice", async () => {
        const repository = MockRepository();
        const usecase = new GenerateInvoiceUseCase(repository);

        const input = {
            name: 'invoice 1',
            document: 'document 1',
            street: 'street 1',
            number: 'number 1',
            complement: 'complemente 1',
            city: 'city 1',
            state: 'stata 1',
            zipCode: 'zip-code-1',
            items: [
                {
                    id: new Id('1'),
                    name: 'item 1',
                    price: 100
                },
                {
                    id: new Id('2'),
                    name: 'item 1',
                    price: 150
                }
            ].map(({ id, name, price }) => new InvoiceItem({ id, name, price })),
        };

        const result = await usecase.execute(input);

        expect(repository.generate).toHaveBeenCalled();
        expect(result.id).toBeDefined();
        expect(result.name).toEqual(input.name);
        expect(result.document).toEqual(input.document);
        expect(result.street).toEqual(input.street);
        expect(result.number).toEqual(input.number);
        expect(result.complement).toEqual(input.complement);
        expect(result.city).toEqual(input.city);
        expect(result.state).toEqual(input.state);
        expect(result.zipCode).toEqual(input.zipCode);
        expect(result.items).toEqual(input.items);
        expect(result.total).toEqual(250);
    });
});