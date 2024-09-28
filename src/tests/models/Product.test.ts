import { Product } from '../../models/Product';
import { Money } from '../../models/Money';

describe('Product', () => {
  test('can create a product object conforming to the interface', () => {
    const product: Product = {
      id: 1,
      type: 'TestType',
      name: 'Test Product',
      price: new Money(100),
    };

    expect(product.id).toBe(1);
    expect(product.type).toBe('TestType');
    expect(product.name).toBe('Test Product');
    expect(product.price.getAmount()).toBe(100);
  });
});