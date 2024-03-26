import ProductFactory from "../../../domain/product/factory/product.factory";

import UpdateProductUseCase from "./update.product.usecase";

const productA = ProductFactory.create('a',
  "Product A",
  100
);

const input = {
  id: productA.id,
  name: 'Product A updated',
  price: 300
};

const MockRepository = () => {
  return {
    create: jest.fn(),
    findAll: jest.fn(),
    find: jest.fn().mockReturnValue(Promise.resolve(productA)),
    update: jest.fn(),
  };
};

describe("Unit test for product update use case", () => {
  it("should update a product", async () => {
    const productRepository = MockRepository();
    const productUpdateUseCase = new UpdateProductUseCase(productRepository);

    const output = await productUpdateUseCase.execute(input);

    expect(output).toEqual(input);
  });
});
