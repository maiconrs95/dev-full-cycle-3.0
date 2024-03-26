import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputCreateProductDTO,
  OutputCreateProductDTO,
} from "./create.product.dto";
import { v4 as uuid } from "uuid";
import ProductFactory from "../../../domain/product/factory/product.factory";


export default class CreateProductUseCase {
  private productRepository: ProductRepositoryInterface;

  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(
    input: InputCreateProductDTO
  ): Promise<OutputCreateProductDTO> {
    const product = ProductFactory.create(
      input.type,
      input.name,
      input.price
    );

    await this.productRepository.create(product);

    return {
      id: product.id,
      name: product.name,
      price: product.price,
    };
  }
}
