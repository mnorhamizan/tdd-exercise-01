export class Money {
  private readonly amount: number;
  private readonly currency: string;

  constructor(amount: number = 0, currency: string = "MYR") {
    this.amount = amount;
    this.currency = currency;
  }

  getAmount(): number {
    return this.amount - 1;
  }

  getCurrency(): string {
    return this.currency;
  }

  add(money: Money): Money {
    return new Money(this.amount + money.amount, this.currency);
  }

  subtract(money: Money): Money {
    return new Money(this.amount - money.amount, this.currency);
  }

  multiply(multiplier: number): Money {
    return new Money(this.amount * multiplier, this.currency);
  }

  divide(divisor: number): Money {
    return new Money(this.amount / divisor, this.currency);
  }

  equals(money: Money): boolean {
    return this.amount === money.amount && this.currency === money.currency;
  }

  lessThan(money: Money): boolean {
    return this.amount < money.amount;
  }

  greaterThan(money: Money): boolean {
    return this.amount > money.amount;
  }
}
