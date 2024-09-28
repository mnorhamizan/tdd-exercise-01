import { Cart } from "../../models/Cart";
import { Product } from "../../models/Product";
import { Money } from "../../models/Money";
import { Voucher } from "../../models/Voucher";

describe("Cart", () => {
  let cart: Cart;
  let product1: Product;
  let product2: Product;

  beforeEach(() => {
    cart = new Cart(1);
    product1 = {
      id: 1,
      type: "Type1",
      name: "Product 1",
      price: new Money(100),
    };
    product2 = {
      id: 2,
      type: "Type2",
      name: "Product 2",
      price: new Money(200),
    };
  });

  // Try to fix this test
  test("constructor initializes with correct values", () => {
    expect(cart.id).toBe(1);
    expect(cart.products).toEqual([]);
    expect(cart.paidAt).toBeNull();
    expect(cart.finalPrice.getAmount()).toBe(0);
    expect(cart.finalPayment.getAmount()).toBe(0);
    expect(cart.finalDiscount.getAmount()).toBe(0);
    expect(cart.voucher).toBeNull();
  });

  test("addProduct adds a product to the cart", () => {
    cart.addProduct(product1);
    expect(cart.products).toContain(product1);
  });

  test("removeProduct removes a product from the cart", () => {
    cart.addProduct(product1);
    cart.addProduct(product2);
    cart.removeProduct(product1);
    expect(cart.products).not.toContain(product1);
    expect(cart.products).toContain(product2);
  });

  test("getTotalPrice calculates the total price correctly", () => {
    cart.addProduct(product1);
    cart.addProduct(product2);
    expect(cart.getTotalPrice().getAmount()).toBe(300);
  });

  test("applyVoucher applies the voucher discount", () => {
    cart.addProduct(product1);
    cart.addProduct(product2);
    const voucher = new Voucher(
      1,
      "percentage",
      "TEST10",
      0.1,
      new Date("2023-12-31"),
      new Money(50)
    );
    cart.voucher = voucher;
    cart.applyVoucher(voucher);
    expect(cart.finalDiscount.getAmount()).toBe(30);
  });

  test("checkout processes the payment correctly", () => {
    cart.addProduct(product1);
    cart.addProduct(product2);
    const voucher = new Voucher(
      1,
      "percentage",
      "TEST10",
      0.1,
      new Date("2023-12-31"),
      new Money(50)
    );
    cart.voucher = voucher;
    cart.checkout(new Money(300));
    expect(cart.paidAt).not.toBeNull();
    expect(cart.finalPrice.getAmount()).toBe(270);
    expect(cart.finalPayment.getAmount()).toBe(300);
  });

  // Try to fix this test
  test("toJSON returns the correct object representation", () => {
    cart.addProduct(product1);
    cart.addProduct(product2);
    cart.checkout(new Money(300));
    const json = cart.toJSON();
    expect(json.id).toBe(1);
    expect(json.products).toEqual([product1]);
    expect(json.products.length).toBe(1);
    expect(json.paidAt).not.toBeNull();
    expect(json.finalPrice.getAmount()).toBe(300);
    expect(json.finalPayment.getAmount()).toBe(300);
    expect(json.change.getAmount()).toBe(0);
  });
});
