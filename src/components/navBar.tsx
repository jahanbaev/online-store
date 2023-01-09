import React, { FC } from "react";
import { Link } from "react-router-dom";

const Navbar: FC<{ price: number; amount: number }> = (props) => {
  return (
    <nav className="bg-slate-900 flex items-center justify-between flex-wrap bg-grey-darkest p-6  w-full z-10 pin-t">
      <div className="flex items-center flex-no-shrink text-white mr-6">
        <Link
          className="text-white no-underline hover:text-white hover:no-underline"
          to="/"
        >
          <span className="text-2xl pl-2">
            <i className="em em-grinning"></i>Online Store
          </span>
        </Link>
      </div>
      <div
        className="w-full flex-grow lg:flex lg:items-center lg:w-auto pt-6 lg:pt-0"
        id="nav-content"
      >
        <ul className="list-reset lg:flex justify-end flex-1 items-center">
          <li className="mr-3">
            <p className="text-white mr-5">cart price: {props.price}$</p>
          </li>
          <li className="mr-3">
            <Link
              className="inline-block py-2 px-4 text-white no-underline"
              to="/"
            >
              Home
            </Link>
          </li>
          <li className="mr-3 relative">
            <p className="bg-red-600 scale-75 translate-y-[-5px] translate-x-2 text-white min-w-[2rem] h-6 text-center p-0 rounded-3xl absolute right-0">
              {props.amount}
            </p>
            <Link
              className="inline-block text-white no-underline hover:text-grey-lighter hover:text-underline py-2 px-4"
              to="/cart"
            >
              cart
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
