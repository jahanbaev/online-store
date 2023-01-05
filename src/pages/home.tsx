import React, { useEffect, useState } from "react";
import icon from './../assets/icons/shopping-cart.png'
import { Link } from "react-router-dom";

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
    "images": string[],
    "amount"?: number
}

const Home = () =>{
    const [cart, setCart] = useState<number[]>([]);
   
    const [resultList, setResultList] = useState([]);
    const [resultFilteredList, setResultFilteredList] = useState([]);
    const [brands, setBrands] = useState<string[]>([]);
    const [category, setCategores] = useState<string[]>([]);


    function getParam(val: string): string {
        const urlParams = new URLSearchParams(window.location.href.split("#")[1]);
        return urlParams.get(val) + "".replaceAll("+", " ")
    }

    function setUrl(param : string, val:  string){
        let url = new URL(window.location.href.replace("#", ""));
        let params = new URLSearchParams(url.search);
        params.set(param, val.replaceAll(" ",""));
        window.location.href = window.location.href.replace(window.location.hash, "") +  "#?" + params.toString()
    }
    function setBrand(val: string){
        if(getParam("brand") === 'null'){
            setUrl("brand",val.replaceAll(" ",""))
        }else{
            if(window.location.href.includes(val.replaceAll(" ",""))){
                setUrl("brand", String(getParam("brand")).replace("*" + val.replaceAll(" ",""), "").replace(val.replaceAll(" ",""), ""))
            }else{
                setUrl("brand", getParam("brand") + "*" + val.replaceAll(" ",""))
            }
        }
    }

    function setCategory(val: string){
        if(getParam("category") === 'null' ||getParam("category") === '' ){
            setUrl("category", val.replaceAll(" ",""))
        }else{
            if(window.location.href.includes(val.replaceAll(" ",""))){
                
                setUrl("category", String(getParam("category")).replace("*" + val.replaceAll(" ",""), "").replace(val.replaceAll(" ",""), ""))
            }else{
                setUrl("category", getParam("category") + "*" + val.replaceAll(" ",""))
            }
        }
    }

    function fill(event : {target : HTMLInputElement}){
        let s = event.target.value.toLowerCase();
        setUrl("search", s)
    }

    function toCart(id: string){
        let c : number[] = []; 

        let products: product[] = JSON.parse(localStorage.getItem('cart')  + "")
        let product : product= resultList.filter((e : {id: number})=>{return e.id === parseInt(id)})[0]
        if(cart.includes(parseInt(id))){
            products = products.filter((e: {id: number}) => e.id !== parseInt(id))
        }else{
            product.amount = 1
            products.push(product)
        }

        products.forEach((e : {id: number})=> {
            c.push(e.id)
        })
        
        setCart(c)
        
        localStorage.setItem("cart", JSON.stringify(products)) 
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

                a  = []
                res.products.forEach((e : {category: string}) => {
                    if(!a.includes(e.category)) a.push(e.category.replaceAll(" ",""))
                })

                setCategores(a)
            })
    }, []);

    useEffect(() => {
            window.addEventListener('hashchange', () => {
                
                setResultFilteredList(resultList)
                let s: string[] = getParam("brand").split("*");
                let fil = resultFilteredList.filter((e : {brand: string;})=>{
                    let val = String(e.brand)
                    return ((s[0] === "" && s.length === 1) || s[0] === "null")?true:s.includes(val.replaceAll(" ",""))
                })
                
                
                s = getParam("category").split("*");
                fil = fil.filter((e : {category: string;})=>{
                    let val = String(e.category)
                    return ((s[0] === "" && s.length === 1) || s[0] === "null")?true:s.includes(val.replaceAll(" ",""))
                })

                fil = fil.filter((e : {description: string;})=>{
                        let val = String(e.description)
                        let s = getParam("search")
                        return (s === "" || s === "null")?true:val.toLowerCase().replaceAll(" ","").includes(s)
                    })

                setResultFilteredList(fil)
            })
    }, [resultList]);

    
    return <div>
        
        <div className="flex w-full">
            <div className="w-96 h-[100vh] pt-3">
                <input type="text" onChange={fill} className="w-[90%] h-[32px] bg-white rounded-md m-auto block p-2" placeholder="search any products"/>
                <div className="w-full mt-2 p-2 h-80 overflow-y-scroll">
                {
                    brands.map((e :string, index : number)=>{
                        return (<div onClick={ ()=> setBrand(e)} className="col-span-1 h-12 flex items-center mb-1 bg-white text-slate-900 p-1 relative overflow-hidden" key={index} >
                                    <h1 className="text-xl ">{e}</h1>
                                </div>) 
                    })          
                   
                }
                </div>

                <div className="w-full mt-2 p-2 h-80 overflow-y-scroll">
                {
                    category.map((e :string, index : number)=>{
                        return (<div onClick={ ()=> setCategory(e)} className="col-span-1 h-12 flex items-center mb-1 bg-white text-slate-900 p-1 relative overflow-hidden" key={index} >
                                    <h1 className="text-xl text-slate-900">{e}</h1>
                                </div>) 
                    })          
                   
                }
                </div>
            </div>
            <div className="grid ml-3 w-[100%] grid-flow-row-dense grid-cols-4 gap-4 mt-4">
            
            {resultFilteredList.map((e : {id: string; images: string[];  title: string; description: string; price: string}, i) => {     
                return (
                <div className="col-span-1 h-80 bg-white p-1 relative overflow-hidden" key={e.id} >
                    <Link to={"/product?id=" + e.id}>
                    <img className="h-52 object-cover w-full" src={e.images[0]} alt="" />
                    <h1 className="text-xl ">{e.title}</h1>
                    <h1 className="text-lg w-[90%] text-blue-600">{e.price} $</h1>
                    <h1 className="text-base w-[90%]">{e.description}</h1>
                    </Link>
                    <button onClick={()=> toCart(e.id)} className="absolute bottom-28 right-2 bg-slate-900 bg-opacity-40 backdrop-blur-sm text-white p-1 rounded-sm ">
                       {(!cart.includes(parseInt(e.id)))?"Add to cart": "remove from card"}
                    </button>
                </div>
               
                ) 
            })}
              
            </div>
        </div>
    </div>
} 

export default Home

