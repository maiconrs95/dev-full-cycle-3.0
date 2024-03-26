import ProductFactory from "../../../domain/product/factory/product.factory";

import ListProductUseCase from "./list.product.usecase";
const prodcutA = ProductFactory.create('a',
  "product a",
  100
);

const productB = ProductFactory.create('b',
  "product b",
  150
);

const MockRepository = () => {
  return {
    create: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    findAll: jest.fn().mockReturnValue(Promise.resolve([prodcutA, productB])),
  };
};

describe("Unit test for listing product use case", () => {
  it("should list products", async () => {
    const repository = MockRepository();
    const useCase = new ListProductUseCase(repository);

    const output = await useCase.execute();

    expect(output.products.length).toBe(2);
    expect(output.products[0].id).toBe(prodcutA.id);
    expect(output.products[0].name).toBe(prodcutA.name);
    expect(output.products[0].price).toBe(100);
    expect(output.products[1].id).toBe(productB.id);
    expect(output.products[1].name).toBe(productB.name);
    expect(output.products[1].price).toBe(300);
  });
});
