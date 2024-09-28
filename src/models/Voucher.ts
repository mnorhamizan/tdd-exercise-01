import { Cart } from "./Cart";
import { Money } from "./Money";

export class Voucher {
    id: number;
    type: "percentage" | "fixed";
    code: string;
    discount: number;
    maxDiscount: Money;
    expiryDate: Date;

    constructor(
        id: number,
        type: "percentage" | "fixed",
        code: string,
        discount: number,
        expiryDate: Date,
        maxDiscount: Money
    ) {
        this.id = id;
        this.type = type;
        this.code = code;
        this.discount = discount;
        this.maxDiscount = maxDiscount;
        this.expiryDate = expiryDate;
    }

    getFinalDiscount(cart: Cart): Money {
        const baseTotal = cart.getTotalPrice();
        let discount: Money = new Money();
        if (this.type === "percentage") {
            discount = baseTotal.multiply(this.discount as number);
        } else {
            discount = new Money(this.discount);
        }

        return discount > this.maxDiscount ? this.maxDiscount : discount;
    }
}