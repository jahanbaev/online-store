import React from "react";
const FilterList = (props: {
    filter(arg0: string, e: string): void;
    brands: string[]; 
    filType: string;
    }) =>{
    return <div className="w-full mt-2 p-2 h-80 overflow-y-scroll">
    {
        props.brands.map((e :string, index : number)=>{
            return (<div onClick={ ()=> props.filter(props.filType,e)} className={window.location.href.includes(e)?"h-12 flex items-center mb-1 bg-slate-900 text-white p-1":"h-12 flex items-center mb-1 bg-white text-slate-900 p-1"} key={index} >
                        <h1 className="text-xl ">{e}</h1>
                    </div>) 
        })          
       
    }
    </div>
}
export default FilterList