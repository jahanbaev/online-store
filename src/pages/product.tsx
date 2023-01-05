import React, { useEffect, useRef, useState } from "react";

interface product {
    "id": number,
    "title": string,
    "description": string,
    "price": number,
    "discountPercentage":number,
    "rating": number,
    "stock": number,
    "brand": string,
    "category": string,
    "thumbnail": string,
    "images": string[]
}

const Product = () =>{
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
    function getList(){
        if(localStorage.getItem('cart') == null){
            localStorage.setItem("cart", "[]")
        }

        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)
    }
    return <div className="flex">
        <div className="w-full p-2">
        {
           list.map((e: product) =>{
                return <div className="flex">
                    <div className="w-[50%] mr-4">
                        <img className=" w-full mb-4 h-96 object-cover " ref={image} src={e.images[0]} alt="" />
                        <div className="flex w-full overflow-x-auto">
                            {
                                e.images.map(e =>{
                                    return (<><img src={e} onClick={() => image.current!.src = e } alt="" className="w-60 h-24 m-1"/></>)
                                })
                            }
                        </div>
                    </div>
                    <div>
                        <h1 className="text-slate-900 text-5xl">{e.title}</h1>
                        <h1 className="text-blue-700 text-4xl mt-4">price: {e.price} $</h1>
                        <p className="text-slate-900 text-4xl mt-4 mb-2">Description</p>
                        <h1 className="text-slate-900 text-2xl">{e.description}</h1>
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