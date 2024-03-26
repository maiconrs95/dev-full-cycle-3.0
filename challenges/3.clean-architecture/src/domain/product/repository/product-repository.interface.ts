import RepositoryInterface from "../../@shared/repository/repository-interface";
import Product from "../entity/product";
import ProductB from '../entity/product-b';

export default interface ProductRepositoryInterface
  extends RepositoryInterface<Product | ProductB> {}
