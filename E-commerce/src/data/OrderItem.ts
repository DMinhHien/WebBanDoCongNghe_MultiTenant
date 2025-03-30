import { Product } from "./products";

export default interface OrderItem {
    product: Product;
    amount: number;
    isSelected: boolean;
}