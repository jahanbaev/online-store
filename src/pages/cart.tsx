import React,{ FC, useEffect, useRef, useState } from "react";
import Popup from "../components/Popup";
import { getCartList, addCart } from "../scripts/addCart";
import { useLocation } from "react-router";
import { Link } from 'react-router-dom';
import { setUrl, getParam } from "../scripts/setUrl";
import Product from './product';
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
    "amount": number
}

const Cart: React.FunctionComponent<{clc: () => void;}> = (props) =>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [test, settest] = useState<product[]>([]);
    const [list, settList] = useState<product[]>([]);
    const [maxElems, setMaxElems] = useState<number>(1);
    const [pageIndex, setPageIndex] = useState<number>(1);
    const [pagination, setPagination] = useState<number[]>([]);
    const [products, setproductsLen] = useState<{length:number,total:number}>({length:0,total:0});
    const [discount, setDiscount] = useState<number>(0);
    const [promCodes, setPromCodes] = useState<{val: string; list: string[]}>({val: "",list:[]});
    const [hidden, setHidden] = useState<boolean>(false);
    const promo = useRef<HTMLDivElement>(null);
    const promoInput = useRef<HTMLInputElement>(null);
    const maxInput = useRef<HTMLInputElement>(null);

    const {state} = useLocation();
    
    
    useEffect(():void => {
        const st = (state === null)?0:state.id
        if(st > 0)show()
        getList()
        setMaxElems(2)
        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settest])

    function show(){
        setHidden(true)
    }

    useEffect(():void => {
        let i: number = 0;
        let p: number[] = [];
        for(i = 0; i < Math.floor(list.length / maxElems); i++){
            p.push(i+1);
        }
        if(Math.floor(list.length / maxElems) !== list.length / maxElems) p.push(i+1);
        setPagination(p);

        if(p.length  < pageIndex && pagination.length !== 0) {
            setPageIndex(p.length)
        }
    }, [maxElems, list.length])

    useEffect(():void => {
        maxInput.current!.value = (getParam("max") === 'null')?'2':getParam("max")
        localStorage.setItem("cart", JSON.stringify(list));
        props.clc();
        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        let len = 0
        let total = 0
        products.forEach(e=>{
            len += e.amount
            total += e.amount * e.price
        })
        if(localStorage.getItem("promos") === null) localStorage.setItem("promos","[]")
        setproductsLen({length:len,total:total})
        setDiscount(total - (total/100 * 10 * promCodes.list.length))
        setPromCodes({val: "", list: JSON.parse(localStorage.getItem("promos")+"")})
        }, [list])

    function setTo(event: {target : HTMLInputElement}):void{
        setUrl("max",event.target!.value)
        setMaxElems((event.target.value === "")?1:parseInt(event.target.value));
        getList();
    }

    function updateList():void{
        let s: product = {
            id: 0,title: "", description: "", price: 0, discountPercentage:0, rating: 0, stock: 0, brand: "", category: "",thumbnail: "",images: [], amount: 1
        }
        list.push(s)
        settList(list.filter(elem=> elem.id !== 0).sort(function(a : product, b: product){return b.amount - a.amount}))
    }

    function minus(id: number):void{
        list.forEach((e, i)=>{
           if(e.id === id) {
            if(list[i].amount === 1){
                settList(list.filter(elem=> elem.id !== id))
            }else{
                var listOrg: product = {...list[i]}
                let n : number  = parseInt(listOrg.amount + "") - 1;
                listOrg.amount = n;
                list[i] = listOrg
                updateList()
            }
        }
        })
    }

    function plus(id: number):void{
        list.forEach((e, i)=>{
           if(e.id === id) {
                let num : number  = parseInt(list[i].amount + "") + 1
                if(list[i].stock >= num)
                list[i].amount = num;
            }
        })
        updateList()
    }

    function getList(): void {
        if(localStorage.getItem('cart') == null){
            localStorage.setItem("cart", "[]")
        }

        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)
        let i: number = 0;
        let p: number[] = []
        for(i = 0; i < Math.floor(list.length / maxElems); i++){
            p.push(i+1)
        }
        if(Math.floor(list.length / maxElems) !== list.length / maxElems) p.push(i+1)
        setPagination(p)
    }

    function removePromo(e:string): void{
        let list: string[] = promCodes.list
        setPromCodes({val: "", list: list.filter(el=> e !== el )})
        localStorage.setItem("promos", JSON.stringify(list.filter(el=> e !== el)))
        setDiscount(products.total - (products.total/100 * 10 * list.filter(el=> e !== el ).length))
    }

    function listPromo(): void{
        promoInput.current!.value = ""
        promo.current!.classList.add("hidden")
        let list: string[] = promCodes.list
        list.push(promCodes.val+"")
        setPromCodes({val: "", list: list})
        localStorage.setItem("promos",JSON.stringify(list))
        setDiscount(products.total - (products.total/100 * 10 * list.length))
    }

    function setPromo(e:{target:HTMLInputElement}): void{
        let promos = ["rs","epm","test"]
        promo.current!.classList.add("hidden")
        if(promos.includes(e.target.value.toLocaleLowerCase()) && !promCodes.list.includes(e.target.value.toLocaleLowerCase())){
            promo.current!.classList.remove("hidden")
            promo.current!.querySelector("p")!.innerText = "10% " + e.target.value
            setPromCodes({val: e.target!.value, list: promCodes.list})
        }
    }

    return <div className="flex">
        <Popup hidden={hidden} reverse={()=>{setHidden(false); return false; }}/>
        <div className="w-full pt-2">
           <div className="flex ml-2 items-center">max croducts: <input type="text" ref={maxInput} placeholder="max" onChange={setTo}  className="p-2 m-2" /></div> 
            {
                list.map((e : product, index : number)=>{
                    return (<div  className={(((pageIndex - 1) * maxElems) + maxElems > index && ((pageIndex - 1) * maxElems) <= index )?"p-2 relative":"p-2 hidden relative"}   key={index} > 
                                <div className="bg-white  relative w-full flex p-1 items-center">
                                    <Link to={"/product?id=" + e.id} className="flex w-full">
                                        <p className="absolute min-w-[15px] h-5 top-1 text-center rounded-sm pl-1 pr-1 left-1 leading-5 bg-black text-white bg-opacity-40 backdrop-blur-lg ">{index + 1}</p>
                                        <img src={e.images[0]} className="w-32 h-28" alt="" />
                                        <div className="p-2 w-full h-28 items-start flex flex-col">
                                        <h1 className="text-xl text-slate-900">{e.title}  <span className="ml-5 text-xl text-blue-700">{e.price} $</span></h1>
                                        <h1 className="text-xl text-slate-900">{e.description}</h1>
                                        </div>
                                    </Link>
                                    <div>
                                    <div className="flex h-[100%] items-center justify-center">
                                        <p onClick={()=> minus(e.id)} className="w-5 h-5 bg-slate-900 text-white flex justify-center items-center cursor-pointer">-</p>
                                        <p className="p-2">{(e.amount == null)?"1":e.amount}</p>
                                        <p onClick={()=> plus(e.id)}  className="w-5 h-5 bg-slate-900 text-white flex justify-center items-center cursor-pointer">+</p>
                                    </div>
                                    <p className="opacity-70">stock: {e.stock}</p>
                                    </div>
                                </div>
                            </div>) 
                })

            }

            <div className={(list.length === 0)?"visible":"hidden"}>
                <h1 className="text-center w-full text-3xl mt-10">no products (</h1>
            </div>

        <div className="w-full flex justify-center">
            {
                pagination.map(e=>{
                    return <div key={e} onClick={()=> setPageIndex(e)} className={ (pageIndex === e)?"opacity-50 w-12 h-12 m-2 flex items-center justify-center bg-slate-900 text-white":"w-12 h-12 m-2 flex items-center justify-center bg-slate-900 text-white"}>{e}</div>
                })
            }
        </div>
    </div>
    <div className="w-[32rem] pt-[4.4rem] min-h-[100px] p-2">
        <div className="bg-white w-full h-full p-1 text-center">
            <h1 className="text-3xl mt-6">Products: {products.length}</h1>
            <h1 className={(products.total === discount)?"text-3xl mt-6":"text-3xl mt-6 line-through"}>Total: {products.total}</h1>
            <h1 className={"text-3xl mt-3 mb-2"}>{(products.total !== discount)?"Discount: " + discount:""}</h1>
            {
                promCodes.list.map((e:string)=>{
                    return (
                        <div className="w-full relative h-10 flex justify-center items-center bg-gray-200 mt-1 p-1">Promo code {e} -10% <button className="ml-auto bg-black p-1 text-white absolute right-1" onClick={()=>removePromo(e)}>remove</button></div>
                    )
                })
            }

            
            <input ref={promoInput} onChange={setPromo} className="w-full bg-gray-200 mt-4 mb-3 h-10 p-2" placeholder="enter promo code (epm, rs, test)" type="text" />
            <div className="flex mb-3 hidden" ref={promo} >
                <p className="w-full text-left text-xl">-10% blah blah</p>
                <button onClick={()=>listPromo()} className="bg-black text-white w-16 h-8">Add</button>
            </div>
            <button onClick={()=>show()} className="bg-blue-700 text-white w-full h-10">Buy now</button>
        </div>
    </div>
    </div>
} 

export default Cart