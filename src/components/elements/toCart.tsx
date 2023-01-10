import React, { FC } from "react";
import { Iproduct } from "../../scripts/interfaces";

interface cardProps {
  addToCart(productId: string): void;
  cart: number[];
  product: Iproduct;
}

const ToCartButton: FC<cardProps> = (props) => {
  return (
    <button
      onClick={() => props.addToCart(String(props.product.id))}
      className="absolute bottom-28 right-2 bg-slate-900 bg-opacity-40 backdrop-blur-sm text-white p-1 rounded-sm "
    >
      {!props.cart.includes(props.product.id)
        ? "Add to cart"
        : "remove from card"}
    </button>
  );
};

export default ToCartButton;
