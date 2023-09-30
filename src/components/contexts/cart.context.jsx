import { createContext, useEffect, useState } from "react";


const clearCartItem = (cartItems, productToClear) => {
   return cartItems.filter(cartItem => cartItem.id !== productToClear.id);
}

const removeCartItem = (cartItems, productToRemove) => {
    const existingItem = cartItems.find(item => item.id === productToRemove.id);

    if(existingItem.quantity === 1)
    {
      return cartItems.filter(cartItem => cartItem.id !== productToRemove.id)
      
    }
    
    return cartItems.map((item) => 
        item.id === productToRemove.id ? 
        {...item, quantity: item.quantity - 1}
        : item
      )
        
}

const addCartItem = (cartItems, productToAdd) => {
  const existingItem = cartItems.find(item => item.id === productToAdd.id);
  if(existingItem)
  {
    return cartItems.map((item) => 
      item.id === productToAdd.id ? 
      {...item, quantity: item.quantity + 1}
      : item
    )
  }
  return [...cartItems, {...productToAdd, quantity: 1}];
      
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: () => null,
    removeItemFromCart: () => null,
    clearItemFromCart: () => null,
    cartCount: 0,
    cartTotal: 0
})

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartCount, setCartCount] = useState(0);
    const [cartTotal, setCartTotal] = useState(0);
    const addItemToCart = (productToAdd) =>{
        setCartItems(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove) =>{
      setCartItems(removeCartItem(cartItems, productToRemove));
    }
    const clearItemFromCart = (productToClear) =>{
      setCartItems(clearCartItem(cartItems, productToClear));
    }

    useEffect(() => {
      const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
      setCartCount(newCartCount);
      const newCartTotal = cartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
      setCartTotal(newCartTotal);

    }, [cartItems])

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}