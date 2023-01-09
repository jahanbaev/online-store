import React, { FC, useEffect, useRef, useState } from "react";
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import { product } from "../scripts/interfaces";
import Popup from "../components/Popup";
import { getCartList, addCart } from "../scripts/addCart";
import { useNavigate } from "react-router";

const Product: FC<{clc: () => void;}> = (props) =>{
    const navigate = useNavigate();
    const [list, settList] = useState<product[]>([]);
    const image  = useRef<HTMLImageElement>(null);
    const [hidden, setHidden] = useState<boolean>(false);
    const [cartList, setCartList] = useState<number[]>([]);
    const [images, setImages] = useState<string[]>([])

    const getParam = (val: string): string => {
        const urlParams = new URLSearchParams(window.location.href.split("?")[1]);
        return urlParams.get(val) + "".replaceAll("+", " ")
    }

    const toCart = (id: string):void =>{
        setCartList(addCart(id, list, cartList))
        props.clc()
    }

    let buffer: {buf: number; name:string}[] = []

    const setImage = (s: string[]): void =>{
        let img: string[] =[];
        let img2: number[] =[];

         s.forEach( (element: string) => {
            img.push(element)
            fetch(element).then( response =>  response.arrayBuffer()).then( buf => {
                buffer.push({name:element, buf: buf.byteLength})
                if(buffer.length === img.length){
                    img = []
                    buffer.forEach((e: {buf: number; name:string})=>{
                        if(!img2.includes(e.buf)){
                            img2.push(e.buf)
                            img.push(e.name)
                        }
                    })
                    setImages(img)
                }
            })
        })
        setImages(img)
    }
    useEffect(() => {
        setCartList(getCartList())
        fetch('https://dummyjson.com/products?limit=100')
            .then(req => req.json()).then(res => {
                settList(res.products.filter((e: {id: number}) => e.id === parseInt(getParam("id"))));
                setImage(res.products.filter((e: {id: number}) => e.id === parseInt(getParam("id")))[0].images)
            })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const show = () => {
        if(!cartList.includes(list[0].id))toCart(list[0].id + "");
        navigate('/cart', { state: { id: getParam("id") } });
    }

    return <div className="flex">
        <div className="w-full p-2">
        {
           list.map((e: product) =>{
                return <div className="flex mt-4">
                    <Popup hidden={hidden} reverse={()=>{setHidden(false); return false; }}/>
                    <div className="w-[100%] mr-8">
                        <div className="h-96  w-[700px] overflow-hidden">
                            <img className=" mb-4 h-96 object-cover  w-[700px] transition-all ease-linear duration-300 hover:scale-150" ref={image} src={e.images[0]} alt="" />
                        </div>
                        <div className="flex w-[700px] overflow-x-auto">
                            {
                                images.map(e =>{
                                    return (<img  key={e} src={e} onClick={() => image.current!.src = e } alt="" className="w-60 h-24 m-1"/>)
                                })
                            }
                        </div>
                    </div>
                    <div className="w-full max-w-[520px]">
                        <div className="flex">
                            <p className="bg-white p-1 pl-2 pr-2 mr-2">Store {">"}</p>
                            <p className="bg-white p-1 pl-2 pr-2 mr-2">{e.category} {">"}</p>
                            <p className="bg-white p-1 pl-2 pr-2 mr-2">{e.brand} {">"}</p>
                            <p className="bg-white p-1 pl-2 pr-2 mr-2 product-title max-w-[180px]">{e.title}</p>
                        </div>
                        <h1 className="text-slate-900 text-3xl mt-8">Product {e.title}</h1>
                        <h1 className="text-blue-700 text-2xl mt-2">price: {e.price} $</h1>
                        <h1 className="text-slate-900 text-xl mt-4 mb-2" >Rating: {e.rating}</h1>
                        <Box
                          sx={{
                            '& > legend': { mt: 2 },
                          }}
                        >
                          <Rating name="read-only" value={e.rating} readOnly />

                        </Box>
                        <h1 className="text-slate-900 text-xl mt-4 mb-2" >Stock: {e.stock}</h1>
                        <h1 className="text-slate-900 text-xl mt-4 mb-2" >Discount: {e.discountPercentage}%</h1>
                        <p className="text-slate-900 text-4xl mt-4 mb-2">Description</p>
                        <h1 className="text-slate-900 text-2xl">{e.description}</h1>
                        <div className="bg-white p-2 mt-4 mb-6">
                            <h1 className="text-2xl mb-3 m-1 mt-0">Order now or later for {e.price}$</h1>
                            <div className="flex">
                            <button onClick={()=>show()} className="bg-blue-700 text-white w-full m-1 h-10">Buy now</button>
                            <button onClick={()=>toCart(e.id + "")} className="bg-gray-900 text-white w-full m-1 h-10">{(!cartList.includes(e.id))?"Add to cart": "remove from card"}</button>
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