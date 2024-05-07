import UseCaseInterface from "../../@shared/usecase/use-case.interface";
import InvoiceFacadeInterface, {
    FindInvoiceFacadeInputDTO,
    FindInvoiceFacadeOutputDTO,
    GenerateInvoiceFacadeInputDto,
} from "./invoice.facade.interface";

export interface UseCaseProps {
    findUsecase: UseCaseInterface;
    generateUseCase: UseCaseInterface;
}

export default class ClientAdmFacade implements InvoiceFacadeInterface {
    private _findUsecase: UseCaseInterface;
    private _generateUsecase: UseCaseInterface;

    constructor(usecaseProps: UseCaseProps) {
        this._findUsecase = usecaseProps.findUsecase;
        this._generateUsecase = usecaseProps.generateUseCase;
    }

    async generate(input: GenerateInvoiceFacadeInputDto): Promise<void> {
        await this._generateUsecase.execute(input);
    }
    async find(
        input: FindInvoiceFacadeInputDTO
    ): Promise<FindInvoiceFacadeOutputDTO> {
        return await this._findUsecase.execute(input);
    }
}