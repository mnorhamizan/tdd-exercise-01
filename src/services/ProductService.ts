import { Product } from "../models/Product";
import { ProductRepository } from "../repositories/ProductRepository";

export class ProductService {
  constructor(private productRepository: ProductRepository) {}

  async getAllProducts(): Promise<Product[]> {
    return this.productRepository.findAll();
  }

  async getProductById(id: number): Promise<Product | undefined> {
    return this.productRepository.findById(id);
  }

  async createProduct(product: Omit<Product, "id">): Promise<Product> {
    return this.productRepository.create(product);
  }

  async updateProduct(id: number, product: Partial<Product>): Promise<Product | undefined> {
    return this.productRepository.update(id, product);
  }

  async deleteProduct(id: number): Promise<boolean> {
    return this.productRepository.delete(id);
  }
}