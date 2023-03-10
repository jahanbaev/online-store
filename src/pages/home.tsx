import React, { useEffect, useRef, useState } from "react";
import Rating from '@mui/material/Rating';
import {addCart} from './../scripts/addCart'
import {setUrl, getParam} from './../scripts/setUrl'
import Filter from "../components/filters";
import FilterList from "../components/filterList";
import MultiRange from "../components/multiRange";
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { product } from "../scripts/interfaces";
import Card from "../components/card";

const Home: React.FunctionComponent<{clc: () => void;}> = (props) =>{
    const [cart, setCart] = useState<number[]>([]);
    const [maxStock, setMaxStock] = useState<number>(9999999999999);
    const [maxPrice, setPrice] = useState<number>(9999999999999);
    const [resultList, setResultList] = useState<product[]>([]);
    const [resultFilteredList, setResultFilteredList] = useState<product[]>([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [val, setValue] = useState<string>("");
    const [copy, setCopy] = useState<string>("copy filters");
    const [category, setCategores] = useState<string[]>([]);
    const found = useRef<HTMLDivElement>(null);
    const foundRes = useRef<HTMLDivElement>(null);
    
    function setFilter(type:string, val: string): void{
        if(getParam(type) === 'null'){
            setUrl(type,val.replaceAll(" ",""))
        }else{
            if(window.location.href.includes(val.replaceAll(" ",""))){
                setUrl(type, String(getParam(type)).replace("*" + val.replaceAll(" ",""), "").replace(val.replaceAll(" ",""), ""))
            }else{
                setUrl(type, getParam(type) + "*" + val.replaceAll(" ",""))
            }
        }
    }

    function fill(event : {target : HTMLInputElement}):void{
        setUrl("search", event.target.value.toLowerCase())
    }

    function toCart(id: string):void{
        setCart(addCart(id, resultList, cart))
        props.clc()
    }

    function copied():void{
        setCopy("copied!!")
        setTimeout(() => {
            setCopy("copy filters")
        }, 2000);
    }

    function reset():void{
        window.location.href =  window.location.href.split("#")[0] + "#?"
        querySearch()
    }

    function querySearch(): void | boolean{
        setValue(window.location.href)
        setResultFilteredList(resultList)
                let s: string[] | string = getParam("brand").split("*");
                let fil = [...resultList]
                if(s[0] !== 'null')
                    fil = resultFilteredList.filter((e : {brand: string;})=>{
                        let val = String(e.brand)
                        return ((s[0] === "" && s.length === 1))?true:s.includes(val.replaceAll(" ",""))
                    })
                s = getParam("category").split("*");
                if(s[0] !== 'null')
                    fil = fil.filter((e : {['category']: string;})=>{
                        let val = String(e['category'])
                        return ((s[0] === "" && s.length === 1) || s[0] === "null")?true:s.includes(val.replaceAll(" ",""))
                    })
                
                s = getParam("search");
                if(s !== 'null')
                    fil = fil.filter((e : {description: string;})=>{
                    let val = String(e.description)
                    let s = getParam("search");
                    return (s === "" || s === "null")?true:val.toLowerCase().replaceAll(" ","").includes(s)
                })

    
                if('null' !== getParam("priceMin"))
                    fil = fil.filter((e : {price: number;})=>{
                    let s = parseInt(getParam("priceMin")) ;
                    return  s <= e.price
                })

                if('null' !== getParam("priceMax"))
                    fil = fil.filter((e : {price: number;})=>{
                    let s = parseInt(getParam("priceMax")) ;
                    return  s >= e.price
                })

                if('null' !== getParam("stockMin"))
                    fil = fil.filter((e : {stock: number;})=>{
                    let s = parseInt(getParam("stockMin")) ;
                    return  s <= e.stock
                })

                if('null' !== getParam("stockMax"))
                    fil = fil.filter((e : {stock: number;})=>{
                    let s = parseInt(getParam("stockMax")) ;
                    return  s >= e.stock
                })

                switch (getParam("sort")) {
                    case "price-asc":
                        fil.sort(function(a:product, b:product){return a.price - b.price})
                    break;
                    case 'price-desc':
                        fil.sort(function(a:product, b:product){return b.price - a.price})
                    break;
                    case 'rating-asc':
                        fil.sort(function(a:product, b:product){return a.rating - b.rating})
                    break;
                    case 'rating-desc':
                        fil.sort(function(a:product, b:product){return b.rating - a.rating})
                    break;
                    case 'discount-asc':
                        fil.sort(function(a:product, b:product){return a.discountPercentage - b.discountPercentage})
                    break;
                    case 'discount-desc':
                        fil.sort(function(a:product, b:product){return b.discountPercentage - a.discountPercentage})
                    break;
                }
                
                found.current!.innerText = "found: " + fil.length.toString()
                if(resultList.length > 0){
                    foundRes.current!.innerText = (fil.length === 0)?"no results :(":""
                }else{
                    foundRes.current!.innerText = "Loading..."
                }
                setResultFilteredList(fil)
    }
    
    useEffect(() => {
        props.clc()
        let cart: number[] = [];
        if(localStorage.getItem('cart') == null){
            localStorage.setItem("cart", "[]")
        }
        let products: product[] = JSON.parse(localStorage.getItem('cart')  + "")
        products.forEach((e : {id: number})=> {
            cart.push(e.id)
        })
        
        setCart(cart)

        fetch('https://dummyjson.com/products?limit=100')
            .then(req => req.json()).then(res => {
                setResultList(res.products);
                setResultFilteredList(res.products);
                let a : string[] = [];
                let maxPrice = 0;
                let maxStock = 0;
                res.products.forEach((e : {
                    stock: number;
                    price: number;
                    brand: string
                }) => {
                    if(maxPrice < e.price)maxPrice = e.price
                    if(maxStock < e.stock)maxStock = e.stock
                    if(!a.includes(e.brand)) a.push(e.brand.replaceAll(" ",""))
                })

                setPrice(maxPrice)
                setMaxStock(maxStock)
                setBrands(a)
                a = []
                res.products.forEach((e : {category: string}) => {
                    if(!a.includes(e.category)) a.push(e.category.replaceAll(" ",""))
                })

                setCategores(a)                
            })
    }, []);

    useEffect(() => {
            window.addEventListener('hashchange', () => {
                querySearch()
            })
            querySearch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [resultList]);

    
    return <div>
                <div className="flex w-full">
                    <div className="w-96 h-[100vh] pt-3">
                        <input type="text" value={getParam("search") !== 'null'?getParam("search"):""} onChange={fill} className="w-[92.5%] h-[36px] bg-white  ml-2 block p-2 " placeholder="search any products"/>
                        <div className="flex p-1 w-[98%] mt-2 mb-[-5px]">
                        <input className="hidden" value={val} />               
                            <button onClick={()=> reset()} className="bg-blue-700 text-white w-full m-1 h-10">Reset filters</button>
                            <CopyToClipboard text={val}
                                             onCopy={() => copied()}>
                            <button className="bg-gray-900 text-white w-full m-1 h-10">{copy}</button>
                            </CopyToClipboard>
                        </div>
                        <FilterList brands={brands} filter={setFilter} filType="brand"/>
                        <FilterList brands={category} filter={setFilter} filType="category"/>
                        <h1 className="text-xl mt-4">Price:</h1>
                        <MultiRange maxVal={maxPrice} name="price"/>
                        <h1 className="text-xl mt-4">Stock:</h1>
                        <MultiRange maxVal={maxStock} name="stock"/>
                    </div>
                    <div className="ml-3 w-full">
                        <Filter found={found}/>
                        <Card list={resultFilteredList} listSecond={resultList} addToCart={toCart} cart={cart}/>
                        <div ref={foundRes} className="text-center text-6xl mt-8"></div>
                    </div>
                </div>
            </div>
} 

export default Home