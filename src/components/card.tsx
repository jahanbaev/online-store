import React, { FC } from "react";
import { Iproduct, IcardProps} from "../scripts/interfaces";
import { Link } from "react-router-dom";
import ToCartButton from "./elements/toCart";

const Card: FC<IcardProps> = (props) => {

  const toCart = (id: string): void => {
    props.addToCart(String(id))
  }
  return (
    <div className="grid grid-flow-row-dense grid-cols-4 gap-4 mt-4">
      {props.list?.map((product: Iproduct) => {
        return (
          <div
            className={
              window.location.href.includes("big=true")
                ? "hover:bg-gray-100 cursor-pointer col-span-2 h-96 bg-white p-1 relative overflow-hidden"
                : "hover:bg-gray-100 cursor-pointer col-span-1 h-80 bg-white p-1 relative overflow-hidden"
            }
            key={product.id}
          >
            <p className="bg-blue-600 text-white absolute top-1 p-1 rounded-md leading-5 right-0 scale-75">
              -{product.discountPercentage} %
            </p>
            <Link to={"/product?id=" + product.id}>
              <img
                className={
                  window.location.href.includes("big=true")
                    ? "h-[17rem] object-cover w-full"
                    : "h-52 object-cover w-full"
                }
                src={product.images[0]}
                alt=""
              />
              <h1 className="product-title text-xl">{product.title}</h1>
              <h1 className="text-lg w-[90%] text-blue-600">{product.price} $</h1>
              <h1 className="text-base w-[90%]">{product.description}</h1>
            </Link>
            <ToCartButton addToCart={toCart} cart={props.cart} product={product}/>
          </div>
        );
      })}
    </div>
  );
};

export default Card;