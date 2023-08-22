import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const useCartContext = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const saveCartToLocalStorage = cartItems => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const removeFromCart = bookId => {
    const updatedCartItems = cartItems.filter(item => item.id !== bookId);
    setCartItems(updatedCartItems);
    saveCartToLocalStorage(updatedCartItems);
  };
  
   useEffect(() => {
     const savedCartItems = localStorage.getItem('cartItems');
     if (savedCartItems) {
       setCartItems(JSON.parse(savedCartItems));
     }
   }, []);

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


