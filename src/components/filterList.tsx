import React, { FC } from "react";


interface componentProps {
filter(arg0: string, e: string): void;
brands: string[];
filType: string;
}
const FilterList: FC<componentProps> = (props) => {
  return (
    <div className="custom-scroll w-full mt-2 p-2 h-80 overflow-y-scroll">
      {props.brands.map((brand: string, index: number) => {
        return (
          <div
            onClick={() => props.filter(props.filType, brand)}
            className={
              window.location.href.includes("="+brand) || window.location.href.includes("*"+brand)
                ? "h-12 flex items-center hover:opacity-60 cursor-pointer mb-[2px] bg-slate-900 text-white p-1"
                : "h-12 flex items-center hover:opacity-60 cursor-pointer mb-[2px] bg-white text-slate-900 p-1"
            }
            key={index}
          >
            <h1 className="text-xl">{brand}</h1>
          </div>
        );
      })}
    </div>
  );
};
export default FilterList;