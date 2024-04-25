import InvoiceGateway from '../../gateway/invoice.gateway';
import { GenerateInvoiceUseCaseInputDto, GenerateInvoiceUseCaseOutputDto } from './generate.usecase.dto';
import Id from "../../../@shared/domain/value-object/id.value-object";
import Address from "../../../@shared/domain/value-object/address";
import Invoice from '../../domain/invoice.entity';

export default class GenerateInvoiceUseCase {
    private _clientRepository: InvoiceGateway;

    constructor(clientRepository: InvoiceGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: GenerateInvoiceUseCaseInputDto): Promise<GenerateInvoiceUseCaseOutputDto> {
        const props = {
            id: new Id(),
            name: input.name,
            document: input.document,
            address: new Address(
                input.street,
                input.number,
                input.complement,
                input.city,
                input.state,
                input.zipCode,
            ),
            items: input.items
        }

        const invoice = new Invoice(props)
        await this._clientRepository.generate(invoice);

        return {
            id: invoice.id.id,
            name: invoice.name,
            document: invoice.document,
            street: invoice.address.street,
            number: invoice.address.number,
            complement: invoice.address.complement,
            city: invoice.address.city,
            state: invoice.address.state,
            zipCode: invoice.address.zipCode,
            items: invoice.items,
            total: invoice.items.reduce((prev, curr) => prev + curr.price, 0),
        }
    }
}