import { Voucher } from "../models/Voucher";
import { Money } from "../models/Money";

export class VoucherRepository {
    private vouchers: Voucher[] = [];

    constructor() {
        this.vouchers = [
            new Voucher(1, "percentage", "PERCENT10", 0.1, new Date("2023-12-31"), new Money(100, "MYR")),
            new Voucher(2, "fixed", "FIXED20", 20, new Date("2023-12-31"), new Money(20, "MYR")),
        ];
    }

    findAll(): Voucher[] {
        return this.vouchers;
    }

    findById(id: number): Voucher | undefined {
        return this.vouchers.find(voucher => voucher.id === id);
    }

    findByCode(code: string): Voucher | undefined {
        return this.vouchers.find(voucher => voucher.code === code);
    }

    create(voucher: Voucher): Voucher {
        const newId = Math.max(...this.vouchers.map(v => v.id), 0) + 1;
        voucher.id = newId;
        this.vouchers.push(voucher);
        return voucher;
    }

    update(id: number, updatedVoucher: Partial<Voucher>): Voucher | undefined {
        const index = this.vouchers.findIndex(voucher => voucher.id === id);
        if (index !== -1) {
            this.vouchers[index] = {
                ...this.vouchers[index],
                ...updatedVoucher,
                getFinalDiscount: updatedVoucher.getFinalDiscount || this.vouchers[index].getFinalDiscount
            };
            return this.vouchers[index];
        }
        return undefined;
    }

    delete(id: number): boolean {
        const initialLength = this.vouchers.length;
        this.vouchers = this.vouchers.filter(voucher => voucher.id !== id);
        return this.vouchers.length !== initialLength;
    }
}