import UseCaseInterface from '../../../@shared/usecase/use-case.interface';
import ClientAdmFacadeInterface from '../../../client-adm/facade/client-adm.facade.interface';
import { PlaceOrderInputDto, PlaceOrderOutputDto } from './place-order.dto';

export default class PlaceOrderUseCase implements UseCaseInterface {
    private _clientFacade: ClientAdmFacadeInterface;

    constructor(_clientFacade: ClientAdmFacadeInterface) {
        this._clientFacade = _clientFacade;
    }

    async execute(input: PlaceOrderInputDto): Promise<PlaceOrderOutputDto> {
        const client = await this._clientFacade.find({ id : input.clientId });

        if (!client) {
            throw new Error('Client not found');
        }

        await this.validateProducts(input);

        return {
            id: 'order-id',
            invoiceId: 'invoice-id',
            status: 'pending',
            total: 0,
            products: []
        }
    }

    private async validateProducts(input: PlaceOrderInputDto): Promise<void> {
        if (!input.products || input.products.length === 0) {
            throw new Error('No products selected');
        }
    }
}