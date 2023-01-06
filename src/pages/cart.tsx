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
    "amount": number
}

const Cart = (props: { clc: () => void; }) =>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [test, settest] = useState<product[]>([]);
    const [list, settList] = useState<product[]>([]);
    const [maxElems, setMaxElems] = useState(1)
    const [pageIndex, setPageIndex] = useState(1)
    const [pagination, setPagination] = useState<number[]>([])
    useEffect(() => {
        getList()
        setMaxElems(2)
        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [settest])


    useEffect(() => {
        let i: number = 0;
        let p: number[] = []
        for(i = 0; i < Math.floor(list.length / maxElems); i++){
            p.push(i+1)
        }
        if(Math.floor(list.length / maxElems) !== list.length / maxElems) p.push(i+1)
        setPagination(p)

    }, [maxElems, list.length])

    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(list))
        props.clc()
    }, [list])

    function setTo(event: {target : HTMLInputElement}){
        setMaxElems((parseInt(event.target.value) === 0)?1:parseInt(event.target.value))
        getList()
    }

    function updateList(){
        let s: product = {
            id: 0,title: "", description: "", price: 0, discountPercentage:0, rating: 0, stock: 0, brand: "", category: "",thumbnail: "",images: [], amount: 1
        }

        list.push(s)
        settList(list.filter(elem=> elem.id !== 0).sort(function(a : product, b: product){return b.amount - a.amount}))
    }

    function minus(id: number){
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

    function plus(id: number){
        list.forEach((e, i)=>{
           if(e.id === id) {
                let num : number  = parseInt(list[i].amount + "") + 1
                if(list[i].stock >= num)
                list[i].amount = num;
            }
        })
        
        updateList()
        

    }

    function getList(){
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

    return <div className="flex">
        <div className="w-full pt-2">
            <input type="text" placeholder="max" onChange={setTo} className="p-2 m-2" />
            {
                list.map((e : product, index : number)=>{
                    return (<div className={(((pageIndex - 1) * maxElems) + maxElems > index && ((pageIndex - 1) * maxElems) <= index )?"p-2":"p-2 hidden"}   key={index} >
                                <div className="bg-white w-full flex p-1 items-center">
                                    <img src={e.images[0]} className="w-32 h-28" alt="" />
                                    <div className="p-2 w-full h-28 items-start flex flex-col">
                                    <h1 className="text-xl text-slate-900">{e.title}  <span className="ml-5 text-xl text-blue-700">{e.price} $</span></h1>
                                    <h1 className="text-xl text-slate-900">{e.description}</h1>
                                    </div>
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

        <div className="w-full flex justify-center">
            {
                pagination.map(e=>{
                    return <div key={e} onClick={()=> setPageIndex(e)} className={ (pageIndex === e)?"opacity-50 w-12 h-12 m-2 flex items-center justify-center bg-slate-900 text-white":"w-12 h-12 m-2 flex items-center justify-center bg-slate-900 text-white"}>{e}</div>
                })
            }
        </div>
    </div>
    <div className="w-96 h-64 p-2">
        <div className="bg-white w-full h-full"></div>
    </div>
    </div>
} 

export default Cart