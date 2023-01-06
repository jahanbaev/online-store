import React, { useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { product } from "../scripts/interfaces";

const Product = (props: { clc: () => void; }) =>{
    const [list, settList] = useState<product[]>([]);
    const image  = useRef<HTMLImageElement>(null);

    function getParam(val: string): string {
        const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
        return urlParams.get(val) + "".replaceAll("+", " ")
    }
    useEffect(() => {
        fetch('https://dummyjson.com/products?limit=100')
            .then(req => req.json()).then(res => {
                settList(res.products.filter((e: {id: number}) => e.id === parseInt(getParam("id"))));
            })
    }, []);

    return <div className="flex">
        <div className="w-full p-2">
        {
           list.map((e: product) =>{
                return <div className="flex mt-4">
                    <div className="w-[100%] mr-8">
                        <img className=" w-full mb-4 h-96 object-cover " ref={image} src={e.images[0]} alt="" />
                        <div className="flex w-full overflow-x-auto">
                            {
                                e.images.map(e =>{
                                    return (<><img src={e} onClick={() => image.current!.src = e } alt="" className="w-60 h-24 m-1"/></>)
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full max-w-[520px]">
                        <div className="flex">
                            <p className="bg-white p-1 pl-2 pr-2 mr-2">Category: {e.category}</p>
                            <p className="bg-white p-1 pl-2 pr-2 mr-2">Brand: {e.brand}</p>
                            <p className="bg-white p-1 pl-2 pr-2 mr-2 product-title max-w-[180px]">product: {e.title}</p>

                        </div>
                        <h1 className="text-slate-900 text-5xl">{e.title}</h1>
                        <h1 className="text-blue-700 text-4xl mt-4">price: {e.price} $</h1>
                        <h1 className="text-slate-900 text-2xl mt-4 mb-2" >Rating: {e.rating}</h1>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        >
                          <Rating name="read-only" value={e.rating} readOnly />

                        </Box>

                        <p className="text-slate-900 text-4xl mt-4 mb-2">Description</p>
                        <h1 className="text-slate-900 text-2xl">{e.description}</h1>
                        <div className="bg-white p-2 mt-4">
                            <h1 className="text-2xl mb-3 m-1 mt-0">Order now or later</h1>
                            <div className="flex">
                            <button className="bg-blue-700 text-white w-full m-1 h-10">Buy now</button>
                            <button className="bg-gray-900 text-white w-full m-1 h-10">Add to cart</button>
                            </div>
                        </div>
                    </div>
                </div>
           })
        }
    </div>
    <div className="w-0 h-64 p-2">
        <div className="bg-white w-full h-full"></div>
    </div>
    </div>
} 

export default Product