import { Voucher } from '../../models/Voucher';
import { Cart } from '../../models/Cart';
import { Money } from '../../models/Money';
import { Product } from '../../models/Product';

describe('Voucher', () => {
  let voucher: Voucher;
  let cart: Cart;
  let product: Product;

  beforeEach(() => {
    voucher = new Voucher(1, 'percentage', 'TEST10', 0.1, new Date('2023-12-31'), new Money(50));
    cart = new Cart(1);
    product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100)};
  });

  test('constructor initializes with correct values', () => {
    expect(voucher.id).toBe(1);
    expect(voucher.type).toBe('percentage');
    expect(voucher.code).toBe('TEST10');
    expect(voucher.discount).toBe(0.1);
    expect(voucher.maxDiscount.getAmount()).toBe(50);
    expect(voucher.expiryDate).toEqual(new Date('2023-12-31'));
  });

  test('getFinalDiscount calculates percentage discount correctly', () => {
    cart.addProduct(product);
    cart.addProduct(product);
    const discount = voucher.getFinalDiscount(cart);
    expect(discount.getAmount()).toBe(20);
  });

  // Try to fix this test
  test('getFinalDiscount applies max discount when percentage exceeds it', () => {
    const expensiveProduct: Product = { ...product, price: new Money(1000) };
    cart.addProduct(expensiveProduct);
    const discount = voucher.getFinalDiscount(cart);
    expect(discount.getAmount()).toBe(50); 
  });

  test('getFinalDiscount calculates fixed discount correctly', () => {
    const fixedVoucher = new Voucher(2, 'fixed', 'FIXED20', 20, new Date('2023-12-31'), new Money(50));
    cart.addProduct(product);
    const discount = fixedVoucher.getFinalDiscount(cart);
    expect(discount.getAmount()).toBe(20);
  });
});