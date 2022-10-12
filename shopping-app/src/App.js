import React, {useState, useEffect} from 'react'
import {commerce} from './lib/commerce';
import {Products, NavBar, Cart,Checkout} from './components';

import {BrowserRouter as Router, Routes,  Route} from 'react-router-dom';




const App = () => {
    const [products, setProducts] = useState([]);
    const [cart, setCart] = useState({});


    const fetchProducts = async() => {
        const { data } = await commerce.products.list();
        
        setProducts(data);

    }

    const fetchCart = async () =>{
        setCart(await commerce.cart.retrieve());
    }


    const handleAddToCart = async (productId,quantity) =>{
        const item = await commerce.cart.add(productId,quantity);

        setCart(item);
    }

    const handleUpdateCartQty = async (productId,quantity) => {
        const response = await commerce.cart.update(productId,{ quantity });

        setCart(response);
    }

    const handleRemoveFromCart = async (productId) => {
        const response = await commerce.cart.remove(productId);

        setCart(response);
    }

    const handleEmptyCart = async () => {
        const response = await commerce.cart.empty();

        setCart(response);
    }

    useEffect(()=>{
        // commerce.cart.delete();
        fetchProducts();
        fetchCart();
     
    },[]); 

    

  return (

    <Router>
        <div>
        <NavBar totalItems={cart.total_items}/>
            <Routes>
            <Route path="/" element= {<Products products={products} onAddToCart={handleAddToCart}/>} /> 
            
            <Route path="/cart" element={<Cart cart={cart} 
            onUpdateCartQty={handleUpdateCartQty} 
            onRemoveFromCart={handleRemoveFromCart} 
            onEmptyCart={handleEmptyCart}
             /> } />
             
            <Route path="/checkout" element={<Checkout cart={cart} />} /> 
            </Routes>

        </div>
    </Router>
 
  )
}

export default App