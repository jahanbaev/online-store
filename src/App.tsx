import React, { useState, useEffect} from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Product from './pages/product';
import { productAmount } from './scripts/interfaces';
const App = () => {	
	const [local, setLocals] = useState<number>(0)
	const [count, setCount] = useState<number>(0)
	
	useEffect(() => {
		setLocal()
	},[local])

	function setLocal(){
		let products: productAmount[] = JSON.parse(localStorage.getItem('cart')  + "")
		let sum = 0;
		let count = 0;

    	products.forEach((e : {price: number; amount: number})=>{
			sum += e.price * e.amount;
			count++
		})
		setLocals(sum)
		setCount(count)
	}
	
  	return <Router>
  	  <nav className="bg-slate-900 flex items-center justify-between flex-wrap bg-grey-darkest p-6  w-full z-10 pin-t">
			<div className="flex items-center flex-no-shrink text-white mr-6">
				<Link className="text-white no-underline hover:text-white hover:no-underline" to="/">
					<span className="text-2xl pl-2"><i className="em em-grinning"></i>Online Store</span>
				</Link>
			</div>

			<div className="block lg:hidden">
				<button id="nav-toggle" className="flex items-center px-3 py-2 border rounded text-grey border-grey-dark hover:text-white hover:border-white">
					<svg className="fill-current h-3 w-3" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path></svg>
				</button>
			</div>

			<div className="w-full flex-grow lg:flex lg:items-center lg:w-auto hidden pt-6 lg:pt-0" id="nav-content">
				<ul className="list-reset lg:flex justify-end flex-1 items-center">
				<li className="mr-3">
						<p className="text-white mr-5">cart price: {local}$</p>
					</li>
					<li className="mr-3">
						<Link className="inline-block py-2 px-4 text-white no-underline" to="/">Home</Link>
					</li>
					<li className="mr-3 relative">
						<p className='bg-red-600 scale-75 translate-y-[-5px] translate-x-2 text-white min-w-[2rem] h-6 text-center p-0 rounded-3xl absolute right-0'>{count}</p>
						<Link className="inline-block text-white no-underline hover:text-grey-lighter hover:text-underline py-2 px-4" to="/cart">cart</Link>
					</li>

				</ul>
			</div>
		</nav>
		<div className='max-w-7xl m-auto'>
  	  <Routes>
			<Route path="/product" element={<Product clc={setLocal}/>} />
  	      	<Route path="/cart" element={<Cart clc={setLocal}/>} />
  	      	<Route path="/" element={<Home clc={setLocal} />} />
  	  </Routes>
		</div>
  	</Router>;
};
export default App;
function useSelector(arg0: (state: any) => any) {
	throw new Error('Function not implemented.');
}

