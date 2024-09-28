import { Money } from "./Money";

export interface Product {
  id: number;
  type: string;
  name: string;
  price: Money;
}
