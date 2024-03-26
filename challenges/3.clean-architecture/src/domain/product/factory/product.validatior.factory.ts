import ValidatorInterface from "../../@shared/validator/validator.interface";
import Product from "../entity/product";
import ProductB from "../entity/product-b";
import ProductYupValidator from "../validator/product.yup.validator";

export default class ProductValidatorFactory {
  static create(): ValidatorInterface<Product | ProductB> {
    return new ProductYupValidator();
  }
}
