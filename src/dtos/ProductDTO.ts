import { PaymentMethodTextProps } from "@components/PaymentMethodText";

export type ProductDTO = {
  title: string;
  description: string;
  isNew: string;
  price: number;
  accept_trade: boolean;
  payment_methods: string[];
}