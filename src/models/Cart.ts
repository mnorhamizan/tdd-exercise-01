import { Money } from "./Money";
import { Product } from "./Product";
import { Voucher } from "./Voucher";

export class Cart {
    id: number;
    products: Product[];
    paidAt: Date | null;
    finalPrice: Money;
    finalPayment: Money;
    finalDiscount: Money;
    voucher: Voucher | null;
    constructor(id: number) {
        this.id = id;
        this.products = [];
        this.paidAt = null; 
        this.finalPrice = new Money(0, "MYR");
        this.finalPayment = new Money(0, "MYR");
        this.voucher = null;
        this.finalDiscount = new Money(0, "MYR");
    }

    addProduct(product: Product) {
        this.products.push(product);
    }

    removeProduct(product: Product) {
        this.products = this.products.filter(p => p.id !== product.id);
    }

    applyVoucher(voucher: Voucher) {
        this.finalDiscount = voucher.getFinalDiscount(this);
    }

    getTotalPrice(): Money {
        return this.products.reduce((total, product) => total.add(product.price), new Money(0, "MYR"));
    }

    checkout(payAmount: Money) {
        this.paidAt = new Date();
        if(this.voucher) this.applyVoucher(this.voucher);
        this.finalPrice = this.getTotalPrice().subtract(this.finalDiscount);
        this.finalPayment = payAmount;
    }

    toJSON() {
        return {
            id: this.id,
            products: this.products,
            paidAt: this.paidAt,
            finalPrice: this.finalPrice,
            finalPayment: this.finalPayment,
            change: this.finalPayment.subtract(this.finalPrice)
        }
    }
}