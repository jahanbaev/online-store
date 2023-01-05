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
    const [test, settest] = useState<product[]>([]);
    const [list, settList] = useState<product[]>([]);
    const [maxElems, setMaxElems] = useState(1)
    const [pageIndex, setPageIndex] = useState(1)
    const [pagination, setPagination] = useState<number[]>([])
    useEffect(() => {
        getList()
        setMaxElems(2)
    }, [settest])


    useEffect(() => {
        let products : product[] = JSON.parse(localStorage.getItem('cart')  + "")
        settList(products)

        let i: number = 0;
        let p: number[] = []
        for(i = 0; i < Math.floor(list.length / maxElems); i++){
            p.push(i+1)
        }
        if(Math.floor(list.length / maxElems) !== list.length / maxElems) p.push(i+1)
        setPagination(p)

    }, [maxElems])

    function setTo(event: {target : HTMLInputElement}){
        setMaxElems( (parseInt(event.target.value) == 0)?1:parseInt(event.target.value))
        getList()
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
            <input type="text" placeholder="max" onChange={setTo} className="p-2 m-2" value={2}/>
        {
            list.map((e : product, index : number)=>{
                    return (<div className={(((pageIndex - 1) * maxElems) + maxElems > index && ((pageIndex - 1) * maxElems) <= index )?"p-2":"p-2 hidden"}   key={index} >
                                <div className="bg-white w-full flex p-1">
                                    <img src={e.images[0]} className="w-32 h-28" alt="" />
                                    <div className="p-2">
                                    <h1 className="text-xl text-slate-900">{e.title}</h1>
                                    <h1 className="text-xl text-slate-900">{e.description}</h1>
                                    </div>
                                </div>
                            </div>) 
            })
            
        }

        <div className="w-full flex justify-center">
            {
                pagination.map(e=>{
                    return <div key={e} onClick={()=> setPageIndex(e)} className="w-12 h-12 m-2 flex items-center justify-center bg-slate-900 text-white">{e}</div>
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