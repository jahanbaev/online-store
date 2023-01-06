import React from "react";
import { setUrl } from "../scripts/setUrl";
const Filter = (props: { found: React.LegacyRef<HTMLDivElement> | undefined; }) => {
    return (
        <div className="flex w-full mt-3">
                    <select className="ng-pristine ng-valid ng-touched">
                        <option value="sort-title" className="sort-name">Sort options:</option>
                        <option value="price-ASC">Sort by price ASC</option>
                        <option value="price-DESC">Sort by price DESC</option>
                        <option value="rating-ASC">Sort by rating ASC</option>
                        <option value="rating-DESC">Sort by rating DESC</option>
                        <option value="discount-ASC">Sort by discount ASC</option>
                        <option value="discount-DESC">Sort by discount DESC</option>
                    </select>

                    <div className="text-xl m-auto" ref={props.found}></div>

                    <div className="flex p-1 w-32 bg-white">
                        <button onClick={()=>setUrl("big","false")} className={(!window.location.href.includes("big=true"))?"bg-slate-900 text-white w-full text-lg ml-1":"text-slate-900 bg-gray-200 w-full text-lg ml-1"}>4x4</button>
                        <button onClick={()=>setUrl("big","true")} className={(window.location.href.includes("big=true"))?"bg-slate-900 text-white w-full text-lg ml-1":"text-slate-900 bg-gray-200 w-full text-lg ml-1"}>2x2</button>
                    </div>
        </div>
    )
}

export default Filter