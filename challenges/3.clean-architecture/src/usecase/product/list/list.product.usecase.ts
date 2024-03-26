import Product from "../../../domain/product/entity/product";
import ProductB from '../../../domain/product/entity/product-b';
import ProductRepositoryInterface from "../../../domain/product/repository/product-repository.interface";
import {
  InputListProductDto,
  OutputListProductDto,
} from "./list.product.dto";

export default class ListCustomerUseCase {
  private productRepository: ProductRepositoryInterface;
  constructor(productRepository: ProductRepositoryInterface) {
    this.productRepository = productRepository;
  }

  async execute(): Promise<OutputListProductDto> {
    const product = await this.productRepository.findAll();
    return OutputMapper.toOutput(product);
  }
}

class OutputMapper {
  static toOutput(product: (Product | ProductB)[]): OutputListProductDto {
    return {
        products: product.map((p) => ({
        id: p.id,
        name: p.name,
        price: p.price,
      })),
    };
  }
}
