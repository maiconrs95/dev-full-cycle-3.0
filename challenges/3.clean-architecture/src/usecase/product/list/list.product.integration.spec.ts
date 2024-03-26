import { Sequelize } from "sequelize-typescript";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import ListProductUseCase from "./list.product.usecase";
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

    it("should list products", async () => {
        const procutRepository = new ProductRepository();
        const usecase = new ListProductUseCase(procutRepository);

        const productA = ProductFactory.create('a',
            "Product A",
            100
        );
        const productB = ProductFactory.create('b',
            "Product B",
            200
        );

        await procutRepository.create(productA);
        await procutRepository.create(productB);

        const output = {
            products: [
                {
                    id: productA.id,
                    name: "Product A",
                    price: 100
                },
                {
                    id: productB.id,
                    name: "Product B",
                    price: 400
                }
            ]
        };

        const result = await usecase.execute();

        expect(result).toEqual(output);
    });
});
