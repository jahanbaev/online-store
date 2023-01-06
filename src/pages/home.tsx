import React, { useEffect, useRef, useState } from "react";
import {addCart} from './../scripts/addCart'
import {setUrl, getParam} from './../scripts/setUrl'
import Filter from "../components/filters";
import FilterList from "../components/filterList";
import { product } from "../scripts/interfaces";
import Card from "../components/card";
const Home = () =>{
    const [cart, setCart] = useState<number[]>([]);
    const [resultList, setResultList] = useState([]);
    const [resultFilteredList, setResultFilteredList] = useState([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [category, setCategores] = useState<string[]>([]);
    const found = useRef<HTMLDivElement>(null);
    
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

    function fill(event : {target : HTMLInputElement}){
        setUrl("search", event.target.value.toLowerCase())
    }

    function toCart(id: string){
        setCart(addCart(id, resultList, cart))
    }

    function querySearch(){
        setResultFilteredList(resultList)
                let s: string[] | string = getParam("brand").split("*");
                let fil = resultList

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
                if(s !== 'null'){
                    fil = fil.filter((e : {description: string;})=>{
                    let val = String(e.description)
                    let s = getParam("search");
                    return (s === "" || s === "null")?true:val.toLowerCase().replaceAll(" ","").includes(s)
                })
                }
                found.current!.innerText = "found: " + fil.length.toString()
                setResultFilteredList(fil)
    }
    
    useEffect(() => {
        let cart : number[] = [];
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
                let a : string[] = []
                res.products.forEach((e : {brand: string}) => {
                    if(!a.includes(e.brand)) a.push(e.brand.replaceAll(" ",""))
                })
                
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
                        <input type="text" value={getParam("search") !== 'null'?getParam("search"):""} onChange={fill} className="w-[90%] h-[32px] bg-white rounded-md m-auto block p-2" placeholder="search any products"/>
                        <FilterList brands={brands} filter={setFilter} filType="brand"/>
                        <FilterList brands={category} filter={setFilter} filType="category"/>
                    </div>
                    <div className="ml-3 w-full">
                        <Filter found={found}/>
                        <Card list={resultFilteredList} listSecond={resultList} addToCart={toCart} cart={cart}/>
                    </div>
                </div>
            </div>
} 

export default Home