import InvoiceItem from '../../domain/item.entity';

export interface FindInvoiceUseCaseInputDTO {
    id: string;
}

export interface FindInvoiceUseCaseOutputDTO {
    id: string;
    name: string;
    document: string;
    address: {
        street: string;
        number: string;
        complement: string;
        city: string;
        state: string;
        zipCode: string;
    };
    items: InvoiceItem[];
    total: number;
    createdAt: Date;
}