import { Sequelize } from "sequelize-typescript"
import { InvoiceModel } from "../repository/invoice.model"
import InvoiceRepository from "../repository/invoice.repository"
import GenerateUseCase from "../usecase/generate/generate.usecase"
import InvoiceFacade from "./invoice.facade"

// import Address from "../../@shared/domain/value-object/address"

describe("Invoice Facade test", () => {
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

    it("should create a invoice", async () => {
        const repository = new InvoiceRepository()
        const generateUsecase = new GenerateUseCase(repository)
        const facade = new InvoiceFacade({
            generateUseCase: generateUsecase,
            findUsecase: undefined,
        })

        const input = {
            id: '1',
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
                    id: 'uuid-item-1',
                    name: 'item 1',
                    price: 100
                },
                {
                    id: 'uuid-item-1',
                    name: 'item 1',
                    price: 150
                }
            ],
        };

        await facade.generate(input)

        const result = await InvoiceModel.findOne({ where: { id: "1" } })

        expect(result).toBeDefined()
        expect(result.name).toBe(input.name);
        expect(result.document).toBe(input.document);
        expect(result.street).toBe(input.street);
        expect(result.number).toBe(input.number);
        expect(result.complement).toBe(input.complement);
        expect(result.city).toBe(input.city);
        expect(result.state).toBe(input.state);
        expect(result.zipcode).toBe(input.zipCode);
    })
})