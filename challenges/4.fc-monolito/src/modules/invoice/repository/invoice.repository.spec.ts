import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "./invoice.model"
import InvoiceRepository from "./invoice.repository"
import Address from '../../@shared/domain/value-object/address'
import Invoice from '../domain/invoice.entity'
import Id from '../../@shared/domain/value-object/id.value-object'

describe("Invoice Repository test", () => {
    let sequelize: Sequelize

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
            sync: { force: true }
        })

        sequelize.addModels([InvoiceModel])

        await sequelize.sync()
    })

    afterEach(async () => {
        await sequelize.close()
    })

    it('should create an invoice', async () => {
        const invoice = new Invoice({
            id: new Id('1'),
            name: 'Invoice 1',
            document: 'Document 1',
            address: new Address(
                "Rua 123",
                "99",
                "Casa Verde",
                "Criciúma",
                "SC",
                "88888-888"
            ),
        })

        const repository = new InvoiceRepository();
        const createdInvoice = await repository.generate(invoice)

        const result = await InvoiceModel.findOne({ where: { id: '1' } })

        expect(result).toBeDefined()
        expect(result.id).toEqual(invoice.id.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.street).toEqual(invoice.address.street)
        expect(result.number).toEqual(invoice.address.number)
        expect(result.complement).toEqual(invoice.address.complement)
        expect(result.city).toEqual(invoice.address.city)
        expect(result.state).toEqual(invoice.address.state)
        expect(result.zipcode).toEqual(invoice.address.zipCode)
        expect(result.createdAt).toEqual(invoice.createdAt)
        expect(result.updatedAt).toEqual(invoice.updatedAt)
    })

    it('should find an invoice', async () => {
        const invoice = await InvoiceModel.create({
            id: '1',
            name: 'Invoice 1',
            document: 'Document 1',
            street: "Rua 123",
            number: "99",
            complement: "Casa Verde",
            city: "Criciúma",
            state: "SC",
            zipcode: "88888-888",
            createdAt: new Date(),
            updatedAt: new Date()
        })

        const repository = new InvoiceRepository();
        const result = await repository.find('1')

        expect(result).toBeDefined()
        expect(result.id.id).toEqual(invoice.id)
        expect(result.name).toEqual(invoice.name)
        expect(result.document).toEqual(invoice.document)
        expect(result.address.street).toEqual(invoice.street)
        expect(result.address.number).toEqual(invoice.number)
        expect(result.address.complement).toEqual(invoice.complement)
        expect(result.address.city).toEqual(invoice.city)
        expect(result.address.state).toEqual(invoice.state)
        expect(result.address.zipCode).toEqual(invoice.zipcode)
        expect(result.createdAt).toEqual(invoice.createdAt)
        expect(result.updatedAt).toEqual(invoice.updatedAt)
    })
})