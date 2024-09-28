import { CartRepository } from '../../repositories/CartRepository';
import { Cart } from '../../models/Cart';
import { Product } from '../../models/Product';
import { Money } from '../../models/Money';

describe('CartRepository', () => {
  let cartRepository: CartRepository;

  beforeEach(() => {
    cartRepository = new CartRepository();
  });

  test('findAll should return all carts', async () => {
    await cartRepository.create();
    await cartRepository.create();
    const carts = await cartRepository.findAll();
    expect(carts.length).toBe(2);
  });

  test('findById should return a cart by id', async () => {
    const createdCart = await cartRepository.create();
    const foundCart = await cartRepository.findById(createdCart.id);
    expect(foundCart).toEqual(createdCart);
  });

  test('create should create a new cart with a unique id', async () => {
    const cart1 = await cartRepository.create();
    const cart2 = await cartRepository.create();
    expect(cart1.id).not.toBe(cart2.id);
  });

  test('addProduct should add a product to the cart', async () => {
    const cart = await cartRepository.create();
    const product: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    const updatedCart = await cartRepository.addProduct(cart.id, product);
    expect(updatedCart?.products).toContainEqual(product);
  });

  test('removeProduct should remove a product from the cart', async () => {
    const cart = await cartRepository.create();
    const product: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    await cartRepository.addProduct(cart.id, product);
    const updatedCart = await cartRepository.removeProduct(cart.id, product);
    expect(updatedCart?.products).not.toContainEqual(product);
  });

  test('delete should remove a cart', async () => {
    const cart = await cartRepository.create();
    const result = await cartRepository.delete(cart.id);
    expect(result).toBe(true);
    const foundCart = await cartRepository.findById(cart.id);
    expect(foundCart).toBeUndefined();
  });

  test('addProduct should return undefined for non-existent cart', async () => {
    const product: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    const result = await cartRepository.addProduct(999, product);
    expect(result).toBeUndefined();
  });

  test('removeProduct should return undefined for non-existent cart', async () => {
    const product: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    const result = await cartRepository.removeProduct(999, product);
    expect(result).toBeUndefined();
  });

  test('delete should return false for non-existent cart', async () => {
    const result = await cartRepository.delete(999);
    expect(result).toBe(false);
  });

  test('generateId should create unique ids', async () => {
    const cart1 = await cartRepository.create();
    const cart2 = await cartRepository.create();
    const cart3 = await cartRepository.create();
    expect(cart1.id).toBeLessThan(cart2.id);
    expect(cart2.id).toBeLessThan(cart3.id);
  });
});