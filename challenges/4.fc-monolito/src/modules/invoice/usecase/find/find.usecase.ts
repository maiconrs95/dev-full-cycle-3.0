import InvoiceGateway from '../../gateway/invoice.gateway';
import { FindInvoiceUseCaseInputDTO, FindInvoiceUseCaseOutputDTO } from './find.usecase.dto';

export default class GenerateInvoiceUseCase {
    private _clientRepository: InvoiceGateway;

    constructor(clientRepository: InvoiceGateway) {
        this._clientRepository = clientRepository;
    }

    async execute(input: FindInvoiceUseCaseInputDTO): Promise<FindInvoiceUseCaseOutputDTO> {
        const result = await this._clientRepository.find(input.id);

        return {
            id: result.id.id,
            name: result.name,
            document: result.document,
            address: result.address,
            items: result.items,
            total: result?.items?.reduce((prev, curr) => prev + curr.price, 0),
            createdAt: result.createdAt,
        }
    }
}