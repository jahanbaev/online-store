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
		<div className='max-w-7xl m-auto'>
  	  <Routes>
			<Route path="/product" element={<Product clc={setLocalFunc}/>} />
  	      	<Route path="/cart" element={<Cart clc={setLocalFunc}/>} />
  	      	<Route path="/" element={<Home clc={setLocalFunc} />} />
			<Route path='*' element={<NotFound />}/>
  	  </Routes>
		</div>
  	</Router>;
};
export default App;

