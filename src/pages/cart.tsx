import React, { useEffect, useState } from "react";

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

const Cart = () =>{
    const [list, settList] = useState<product[]>([]);

    useEffect(() => {
        getList()
    }, [])
    function getList(){
        if(localStorage.getItem('cart') == null){
            localStorage.setItem("cart", "[]")
        }

        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)
    }
    return <div className="flex">
        <div className="w-full">
        {
            list.map((e : product, index : number)=>{
                    return (<div className="p-2" key={index} >
                                <div className="bg-white w-full flex">
                                    <img src={e.images[0]} className="w-32 h-28" alt="" />
                                    <div className="p-2">
                                    <h1 className="text-xl text-slate-900">{e.title}</h1>
                                    <h1 className="text-xl text-slate-900">{e.description}</h1>
                                    </div>
                                </div>
                            </div>) 
            })
            
        }
    </div>
    <div className="w-96 h-64 p-2">
        <div className="bg-white w-full h-full"></div>
    </div>
    </div>
} 

export default Cart