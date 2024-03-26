import Product from "./product";
import ProductB from "./product-b";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product("", "Product a", 100);
    }).toThrowError("product: Id is required");
    expect(() => {
      new ProductB("", "Product b", 100);
    }).toThrowError("product: Id is required");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product("123", "", 100);
    }).toThrowError("product: Name is required");
    expect(() => {
      new ProductB("456", "", 100);
    }).toThrowError("product: Name is required");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product("123", "Product a", -1);
    }).toThrowError("product: Price must be greater than zero");
    expect(() => {
      new ProductB("456", "Product b", -1);
    }).toThrowError("product: Price must be greater than zero");
  });

  it("should throw error when name, id and price are invalid", () => {
    expect(() => {
      new Product("", "", -1);
    }).toThrowError("product: Id is required,product: Name is required,product: Price must be greater than zero");
  });


  it("should change name", () => {
    const product = new Product("123", "Product 1", 100);
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product("123", "Product 1", 100);
    product.changePrice(150);
    expect(product.price).toBe(150);
  });
});
