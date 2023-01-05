import React, { useEffect, useState } from "react";
import icon from './../assets/icons/shopping-cart.png'


const Home = () =>{
   
    const [resultList, setResultList] = useState([]);
    const [resultFilteredList, setResultFilteredList] = useState([]);
    const [brands, setBrands] = useState<string[]>([]);

    function getParam(val: string): string {
        const urlParams = new URLSearchParams(window.location.href.split("#")[1]);
        return urlParams.get('brand') + "".replaceAll("+", " ")
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

    function fill(event : {target : HTMLInputElement}){
        let s = event.target.value;
        setResultFilteredList(resultList.filter((e : {price: string; images: string[];  title: string; description: string})=>{
            let val = String(e.title) + String(e.price)+ String(e.description)
            return val.replaceAll(" ","").toLowerCase().includes(s.toLowerCase()) 
        }))
    }
    
    
    useEffect(() => {   
        fetch('https://dummyjson.com/products?limit=100')
            .then(req => req.json()).then(res => {
                setResultList(res.products);
                setResultFilteredList(res.products);
                let a : string[] = []
                res.products.forEach((e : {brand: string}) => {
                    if(!a.includes(e.brand)) a.push(e.brand.replaceAll(" ",""))
                })

                setBrands(a)

                
            })

        
    }, []);

    useEffect(() => {
            window.addEventListener('hashchange', () => {
                let s: string[] = getParam("brand").split("*");
                setResultFilteredList(resultList.filter((e : {brand: string;})=>{
                    let val = String(e.brand)
                    return (s[0] === "")?true:s.includes(val.replaceAll(" ",""))
                }))
               
            })
    }, [resultList]);

    
    return <div>
        
        <div className="flex w-[98vw]">
            <div className="w-96 bg-black h-[100vh] pt-3">
                <input type="text" onChange={fill} className="w-[90%] h-[32px] bg-slate-700 rounded-md m-auto block p-2" placeholder="search any products"/>

                <div className="w-full mt-2 p-2 h-80 overflow-y-scroll">
                {
                    brands.map((e :string, index : number)=>{
                        return (<div onClick={ ()=> setBrand(e)} className="col-span-1 h-12 flex items-center mb-1 bg-slate-700 p-1 relative overflow-hidden" key={index} >
                                    <h1 className="text-xl text-white">{e}</h1>
                                </div>) 
                    })          
                   
                }
                </div>
            </div>
            <div className="grid ml-3 w-[100%] grid-flow-row-dense grid-cols-4 gap-4 mt-4">
            
            {resultFilteredList.map((e : {id: string; images: string[];  title: string; description: string; price: string}, i) => {     
                return (
                <div className="col-span-1 h-80 bg-white p-1 relative overflow-hidden" key={e.id} >
                    <img className="h-52 object-cover w-full" src={e.images[0]} alt="" />
                    <h1 className="text-xl ">{e.title}</h1>
                    <h1 className="text-lg w-[90%] text-blue-600">{e.price} $</h1>
                    <h1 className="text-base w-[90%]">{e.description}</h1>
                    <img src={icon} className="absolute bottom-2 right-2" alt="" />
                </div>
                ) 
            })}
              
            </div>
        </div>
    </div>
} 

export default Home

