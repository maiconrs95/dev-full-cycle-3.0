import CreateProductUseCase from "./create.product.usecase";

const input = {
  type: 'a',
  name: "John",
  price: 10,
};

const MockRepository = () => {
  return {
    find: jest.fn(),
    findAll: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };
};

describe("Unit test create product use case", () => {
  it("should create type 'a' product", async () => {
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: output.name,
      price: 10
    });
  });

  it("should create 'b' product", async () => {
    input.type = 'b'
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    const output = await productCreateUseCase.execute(input);

    expect(output).toEqual({
      id: expect.any(String),
      name: output.name,
      price: 20
    });
  });

  it("should thrown an error when product type is not supported", async () => {
    input.type = 'c'
    const productRepository = MockRepository();
    const productCreateUseCase = new CreateProductUseCase(productRepository);

    await expect(productCreateUseCase.execute(input)).rejects.toThrow(
      "Product type not supported"
    );
  });
});
