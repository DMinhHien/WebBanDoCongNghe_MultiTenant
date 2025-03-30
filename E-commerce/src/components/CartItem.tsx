import { ProductCart } from "../data/Cart";
import { useState } from "react";

interface CartItemProps {
  ProductCart: ProductCart;
  onQuantityChange: (productId: string, newQuantity: number) => void; // Callback để thông báo thay đổi
  DeleteCartItem:(id:string)=>void
}

export default function CartItem({ ProductCart, onQuantityChange,DeleteCartItem }: CartItemProps) {
  const [quantity, setQuantity] = useState(ProductCart.quantity);

  const handleIncrease = () => {
    let newQuantity=0;
    if(quantity<ProductCart.productInfo.quantity)
    {
      newQuantity=quantity+1;
    }
    else
    {
      newQuantity=ProductCart.productInfo.quantity
      alert("số lượng sản phẩm còn lại không đủ!!!!")
    }
    setQuantity(newQuantity);
    onQuantityChange(ProductCart.idProduct, newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1; // Không cho giảm dưới 1
    setQuantity(newQuantity);
    onQuantityChange(ProductCart.idProduct, newQuantity);
  };



  return (
    <div
      style={{ backgroundColor: "#FBFAF1" }}
      className="rounded-lg border bg-white p-4 shadow-sm dark:border-gray-700 md:p-6 mt-3"
    >
      <div className="flex flex-wrap items-center justify-between gap-4 md:flex-nowrap">
        {/* Image */}
        <img
          className="w-20 h-20 object-contain"
          src={ProductCart.productInfo.image}
          alt={ProductCart.productInfo.productName}
        />

        {/* Item Details */}
        <div className="flex-1">
          <p className="text-base font-bold text-gray-900">
            {ProductCart.productInfo.productName}
          </p>
          <button
            type="button"
            className="mt-2 text-sm font-medium text-red-600 hover:underline dark:text-red-500"
            onClick={()=>DeleteCartItem(ProductCart.id)}
          >
            Xóa
          </button>
        </div>

        {/* Quantity Controller and Price */}
        <div className="flex items-center gap-3">
          {/* Quantity Controller */}
          <div className="flex items-center gap-2">
            <button
              className="h-6 w-6 flex items-center justify-center rounded border bg-green hover:bg-red-700"
              onClick={handleDecrease}
            >
              <svg
                className="h-4 w-4 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 2"
              >
                <path stroke="currentColor" strokeWidth="2" d="M1 1h16" />
              </svg>
            </button>
            <input
              type="text"
              className="w-10 text-center text-sm bg-transparent"
              value={quantity}
              readOnly
            />
            <button
              className="h-6 w-6 flex items-center justify-center rounded border bg-green hover:bg-red-700"
              onClick={handleIncrease}
            >
              <svg
                className="h-4 w-4 text-gray-900 dark:text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 18 18"
              >
                <path stroke="currentColor" strokeWidth="2" d="M9 1v16M1 9h16" />
              </svg>
            </button>
          </div>

          {/* Price */}
          <p className="text-base w-[150px] font-bold text-gray-900 text-right">
            {ProductCart.productInfo.unitPrice * quantity} VNĐ
          </p>
        </div>
      </div>
    </div>
  );
}
