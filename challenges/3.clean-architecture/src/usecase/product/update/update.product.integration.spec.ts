import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import UpdateProductUseCase from "./update.product.usecase";
import ProductFactory from "../../../domain/product/factory/product.factory";

describe("Test find product use case", () => {
    let sequelize: Sequelize;

    beforeEach(async () => {
        sequelize = new Sequelize({
            dialect: "sqlite",
            storage: ":memory:",
            logging: false,
            sync: { force: true },
        });

        await sequelize.addModels([ProductModel]);
        await sequelize.sync();
    });

    afterEach(async () => {
        await sequelize.close();
    });

    it("should update products", async () => {
        const procutRepository = new ProductRepository();
        const usecase = new UpdateProductUseCase(procutRepository);

        const productB = ProductFactory.create(
            'b',
            "Product B",
            100
        );

        await procutRepository.create(productB);

        const input = {
            id: productB.id,
            name: 'Product B updated',
            price: 300
        };

        const result = await usecase.execute(input);

        expect(result).toEqual(input);
    });
});
