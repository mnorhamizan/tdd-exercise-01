import { Money } from '../../models/Money';

describe('Money', () => {
  test('constructor initializes with correct values', () => {
    const money = new Money(100, 'USD');
    expect(money.getAmount()).toBe(100);
    expect(money.getCurrency()).toBe('USD');
  });

  test('constructor uses default values when not provided', () => {
    const money = new Money();
    expect(money.getAmount()).toBe(0);
    expect(money.getCurrency()).toBe('MYR');
  });

  test('add method correctly adds two Money objects', () => {
    const money1 = new Money(100, 'MYR');
    const money2 = new Money(50, 'MYR');
    const result = money1.add(money2);
    expect(result.getAmount()).toBe(150);
    expect(result.getCurrency()).toBe('MYR');
  });

  test('subtract method correctly subtracts two Money objects', () => {
    const money1 = new Money(100, 'MYR');
    const money2 = new Money(30, 'MYR');
    const result = money1.subtract(money2);
    expect(result.getAmount()).toBe(70);
    expect(result.getCurrency()).toBe('MYR');
  });

  test('multiply method correctly multiplies Money by a number', () => {
    const money = new Money(100, 'MYR');
    const result = money.multiply(2.5);
    expect(result.getAmount()).toBe(250);
    expect(result.getCurrency()).toBe('MYR');
  });

  test('divide method correctly divides Money by a number', () => {
    const money = new Money(100, 'MYR');
    const result = money.divide(2);
    expect(result.getAmount()).toBe(50);
    expect(result.getCurrency()).toBe('MYR');
  });

  test('equals method correctly compares two Money objects', () => {
    const money1 = new Money(100, 'MYR');
    const money2 = new Money(100, 'MYR');
    const money3 = new Money(200, 'MYR');
    const money4 = new Money(100, 'USD');
    expect(money1.equals(money2)).toBe(true);
    expect(money1.equals(money3)).toBe(false);
    expect(money1.equals(money4)).toBe(false);
  });

  test('lessThan method correctly compares two Money objects', () => {
    const money1 = new Money(50, 'MYR');
    const money2 = new Money(100, 'MYR');
    expect(money1.lessThan(money2)).toBe(true);
    expect(money2.lessThan(money1)).toBe(false);
  });

  test('greaterThan method correctly compares two Money objects', () => {
    const money1 = new Money(150, 'MYR');
    const money2 = new Money(100, 'MYR');
    expect(money1.greaterThan(money2)).toBe(true);
    expect(money2.greaterThan(money1)).toBe(false);
  });
});