import React, {useState, useEffect, FC} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Product from './pages/product';
import NotFound from './pages/NotFound';
import {productAmount} from './scripts/interfaces';
import Navbar from './components/navBar';

interface productSort {price: number; amount: number}

const App: FC = ()  => {	
	const [price, setPrice] = useState<number>();
	const [count, setCount] = useState<number>();
	
	useEffect(() => {
		setLocalFunc();
	}, [price])

	const setLocalFunc = () :void =>{
		if(localStorage.getItem('cart') === null){localStorage.setItem('cart','[]')}
		let products: productAmount[] = JSON.parse(localStorage.getItem('cart')  + "")
		let priceSum = 0;
		let count = 0;

    	products.forEach((product : productSort)=>{
			priceSum += product.price * product.amount;
			count += product.amount ;
		})

		setPrice(priceSum)
		setCount(count)
	}
	
  	return <Router>
  	  <Navbar price={Number(price)} amount={Number(count)}/>
		<div className='max-w-7xl m-auto min-h-[80vh]'>
  	  <Routes>
			<Route path="/product" element={<Product clc={setLocalFunc}/>} />
  	      	<Route path="/cart" element={<Cart clc={setLocalFunc}/>} />
  	      	<Route path="/" element={<Home clc={setLocalFunc} />} />
			<Route path='*' element={<NotFound />}/>
  	  </Routes>
	  
		</div>
		<div className='footer bg-slate-900 w-full h-40 flex-col text-white flex p-5 items-center'>
			<div className='w-full h-full flex items-center pb-5'>
				<img src="https://app.rs.school/static/images/logo-rsschool3.png" className="w-32 h-11 contrast-0 mr-auto" alt="" />
				<p>Github: jahanbaev</p>
			</div>
			<p className='text-xl opacity-70'>RS school 2022-2023</p>
	  </div>
  	</Router>;
};
export default App;

