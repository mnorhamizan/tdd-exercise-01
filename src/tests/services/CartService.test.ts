import { CartService } from '../../services/CartService';
import { CartRepository } from '../../repositories/CartRepository';
import { Cart } from '../../models/Cart';
import { Product } from '../../models/Product';
import { Money } from '../../models/Money';

// .mock doc: https://jestjs.io/docs/mock-functions#mock-property
jest.mock('../../repositories/CartRepository');

describe('CartService', () => {
  let cartService: CartService;
  let mockCartRepository: jest.Mocked<CartRepository>;

  beforeEach(() => {
    mockCartRepository = new CartRepository() as jest.Mocked<CartRepository>;
    cartService = new CartService(mockCartRepository);
  });

  test('getAllCarts should return all carts', async () => {
    const mockCarts = [new Cart(1), new Cart(2)];
    mockCartRepository.findAll.mockResolvedValue(mockCarts);

    const result = await cartService.getAllCarts();
    expect(result).toEqual(mockCarts);
    expect(mockCartRepository.findAll).toHaveBeenCalled();
  });

  test('getCartById should return a cart by id', async () => {
    const mockCart = new Cart(1);
    mockCartRepository.findById.mockResolvedValue(mockCart);

    const result = await cartService.getCartById(1);
    expect(result).toEqual(mockCart);
    expect(mockCartRepository.findById).toHaveBeenCalledWith(1);
  });

  test('createCart should create a new cart', async () => {
    const mockCart = new Cart(1);
    mockCartRepository.create.mockResolvedValue(mockCart);

    const result = await cartService.createCart();
    expect(result).toEqual(mockCart);
    expect(mockCartRepository.create).toHaveBeenCalled();
  });

  test('addProductToCart should add a product to the cart', async () => {
    const mockCart = new Cart(1);
    const mockProduct: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    mockCartRepository.addProduct.mockResolvedValue(mockCart);

    const result = await cartService.addProductToCart(1, mockProduct);
    expect(result).toEqual(mockCart);
    expect(mockCartRepository.addProduct).toHaveBeenCalledWith(1, mockProduct);
  });

  test('removeProductFromCart should remove a product from the cart', async () => {
    const mockCart = new Cart(1);
    const mockProduct: Product = { id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) };
    mockCartRepository.removeProduct.mockResolvedValue(mockCart);

    const result = await cartService.removeProductFromCart(1, mockProduct);
    expect(result).toEqual(mockCart);
    expect(mockCartRepository.removeProduct).toHaveBeenCalledWith(1, mockProduct);
  });

  test('deleteCart should delete a cart', async () => {
    mockCartRepository.delete.mockResolvedValue(true);

    const result = await cartService.deleteCart(1);
    expect(result).toBe(true);
    expect(mockCartRepository.delete).toHaveBeenCalledWith(1);
  });

  test('checkoutCart should process the checkout', async () => {
    const mockCart = new Cart(1);
    mockCart.addProduct({ id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) });
    mockCartRepository.findById.mockResolvedValue(mockCart);

    const result = await cartService.checkoutCart(1, new Money(100));
    expect(result).toEqual(mockCart);
    expect(mockCartRepository.findById).toHaveBeenCalledWith(1);
    expect(result?.paidAt).not.toBeNull();
  });

  test('checkoutCart should throw an error for insufficient payment', async () => {
    const mockCart = new Cart(1);
    mockCart.addProduct({ id: 1, type: 'Type1', name: 'Product 1', price: new Money(100) });
    mockCartRepository.findById.mockResolvedValue(mockCart);

    await expect(cartService.checkoutCart(1, new Money(50))).rejects.toThrow('Insufficient payment');
  });

  test('checkoutCart should return undefined for non-existent cart', async () => {
    mockCartRepository.findById.mockResolvedValue(undefined);

    const result = await cartService.checkoutCart(1, new Money(100));
    expect(result).toBeUndefined();
  });
});