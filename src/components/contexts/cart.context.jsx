import { createContext, useState } from "react";


export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartProducts: []
})

export const CartProvider = ({ children }) => {
    const [cartProducts, setCartProducts] = useState([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const value = {isCartOpen, setIsCartOpen, cartProducts};


    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}