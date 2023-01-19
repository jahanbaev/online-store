import React, {useState, useEffect, FC} from 'react';
import {Route, BrowserRouter as Router, Routes} from 'react-router-dom';
import Home from './pages/home';
import Cart from './pages/cart';
import Product from './pages/product';
import NotFound from './pages/NotFound';
import {productAmount, productSort} from './scripts/interfaces';
import Navbar from './components/sections/navBar';
import Footer from './components/sections/footer';


const App: FC = ()  => {	
	const [price, setPrice] = useState<number>();
	const [count, setCount] = useState<number>();

	enum PATH_NAMES {
		HOME_PAGE = '/',
		PRODUCT_PAGE = '/product',
		NOT_FOUND_PAGE = '*',
		CART_PAGE = '/cart'
	}
	
	useEffect(() => {
		setLocalFunc();
	}, [price])

	const setLocalFunc = () :void =>{
		if(localStorage.getItem('cart') === null){localStorage.setItem('cart','[]')}
		let products: productAmount[] = JSON.parse(String(localStorage.getItem('cart')))
		let priceSum = 0;
		let productCount = 0;

    	products.forEach((product : productSort)=>{
			priceSum += product.price * product.amount;
			productCount += product.amount;
		})
		setPrice(priceSum)
		setCount(productCount)
	}
	
  	return <Router>
  	  			<Navbar price={Number(price)} amount={Number(count)}/>
				<div className='max-w-7xl m-auto min-h-[80vh]'>
  	  				<Routes>
							<Route path={PATH_NAMES.HOME_PAGE} element={<Home calculateCart={setLocalFunc} />} />
							<Route path={PATH_NAMES.PRODUCT_PAGE} element={<Product calculateCart={setLocalFunc}/>} />
  	  				    	<Route path={PATH_NAMES.CART_PAGE} element={<Cart calculateCart={setLocalFunc}/>} />
							<Route path={PATH_NAMES.NOT_FOUND_PAGE} element={<NotFound />}/>
  	  				</Routes>
				</div>
				<Footer />
  	</Router>;
};
export default App;

