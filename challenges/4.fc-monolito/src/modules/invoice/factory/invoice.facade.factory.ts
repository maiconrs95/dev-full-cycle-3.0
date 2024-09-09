import {InvoiceFacade} from "../facade/invoice.facade";
import InvoiceRepository from "../repository/invoice.repository";
import GenerateInvoiceUseCase from "../usecase/generate/generate.usecase";
import FindInvoiceUseCase from "../usecase/find/find.usecase";

export class InvoiceFacadeFactory {
  static create() {
    const repository = new InvoiceRepository();
    const findUsecase = new FindInvoiceUseCase(repository);
    const generateUsecase = new GenerateInvoiceUseCase(repository);
    const facade = new InvoiceFacade({
      generateUseCase: generateUsecase,
      findUsecase: findUsecase,
    });
    return facade;
  }
}

export default InvoiceFacadeFactory;