import { Sequelize } from "sequelize-typescript";

import Product from "../../../domain/product/entity/product";
import ProductModel from "../../../infrastructure/product/repository/sequelize/product.model";
import ProductRepository from "../../../infrastructure/product/repository/sequelize/product.repository";
import CreateProductUseCase from "./create.product.usecase";

describe("Test create product use case", () => {
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

  it("should create a product with type 'a'", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const product = new Product("123", "My Product A", 100);

    await productRepository.create(product);

    const input = {
      type: 'a',
      name: "My Product A",
      price: 100
    };

    const result = await usecase.execute(input);

    const output = {
      id: result.id,
      name: "My Product A",
      price: 100
    };

    expect(result).toEqual(output);
  });

  it("should create a product with type 'b'", async () => {
    const productRepository = new ProductRepository();
    const usecase = new CreateProductUseCase(productRepository);
    const product = new Product("123", "My Product B", 100);

    await productRepository.create(product);

    const input = {
      type: 'b',
      name: "My Product B",
      price: 35
    };

    const result = await usecase.execute(input);

    const output = {
      id: result.id,
      name: "My Product B",
      price: 70
    };

    expect(result).toEqual(output);
  });
});
