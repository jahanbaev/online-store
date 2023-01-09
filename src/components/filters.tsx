import React from "react";
import { setUrl, getParam } from "../scripts/setUrl";
const Filter = (props: {
  found: React.LegacyRef<HTMLDivElement> | undefined;
}) => {
  const setSort = (e: { target: HTMLSelectElement }): void => {
    setUrl("sort", e.target.value);
  };
  return (
    <div className="flex w-full mt-3">
      <select onChange={setSort} className="ng-pristine ng-valid ng-touched">
        <option value="sort-title" className="sort-name">
          Sort options:
        </option>
        <option
          value="price-asc"
          selected={getParam("sort") === "price-asc" ? true : false}
        >
          Sort by price ASC
        </option>
        <option
          value="price-desc"
          selected={getParam("sort") === "price-desc" ? true : false}
        >
          Sort by price DESC
        </option>
        <option
          value="rating-asc"
          selected={getParam("sort") === "rating-asc" ? true : false}
        >
          Sort by rating ASC
        </option>
        <option
          value="rating-desc"
          selected={getParam("sort") === "rating-desc" ? true : false}
        >
          Sort by rating DESC
        </option>
        <option
          value="discount-asc"
          selected={getParam("sort") === "discount-asc" ? true : false}
        >
          Sort by discount ASC
        </option>
        <option
          value="discount-desc"
          selected={getParam("sort") === "discount-desc" ? true : false}
        >
          Sort by discount DESC
        </option>
      </select>

      <div className="text-xl m-auto" ref={props.found}></div>

      <div className="flex p-1 w-32 bg-white">
        <button
          onClick={() => setUrl("big", "false")}
          className={
            !window.location.href.includes("big=true")
              ? "bg-slate-900 text-white w-full text-lg "
              : "text-slate-900 bg-gray-200 w-full text-lg "
          }
        >
          4x4
        </button>
        <button
          onClick={() => setUrl("big", "true")}
          className={
            window.location.href.includes("big=true")
              ? "bg-slate-900 text-white w-full text-lg ml-1"
              : "text-slate-900 bg-gray-200 w-full text-lg ml-1"
          }
        >
          2x2
        </button>
      </div>
    </div>
  );
};

export default Filter;
