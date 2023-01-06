import React from "react";
import { product } from "../scripts/interfaces";
import { Link } from "react-router-dom";

const Card = (props: {
    addToCart(arg0: string): void;
    cart: number[];
    list: product[]; 
    listSecond: product[]
})=>{

    return <div className="grid grid-flow-row-dense grid-cols-4 gap-4 mt-4">
                
    {props.list.map((e : product, i) => {     
        return (
        <div
        className={(window.location.href.includes("big=true"))?"col-span-2 h-96 bg-white p-1 relative overflow-hidden":"col-span-1 h-80 bg-white p-1 relative overflow-hidden"}
            key={e.id} >
            <Link to={"/product?id=" + e.id}>
            <img 
                className={(window.location.href.includes("big=true"))?"h-[17rem] object-cover w-full":"h-52 object-cover w-full"}
                src={e.images[0]} alt="" 
                />
            <h1 className="product-title text-xl">{e.title}</h1>
            <h1 className="text-lg w-[90%] text-blue-600">{e.price} $</h1>
            <h1 className="text-base w-[90%]">{e.description}</h1>
            </Link>
            <button onClick={()=> props.addToCart(e.id+"")} className="absolute bottom-28 right-2 bg-slate-900 bg-opacity-40 backdrop-blur-sm text-white p-1 rounded-sm ">
               {(!props.cart.includes(e.id))?"Add to cart": "remove from card"}
            </button>
        </div>
        ) 
    })}

    </div>
}

export default Card