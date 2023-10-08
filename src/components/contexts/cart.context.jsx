import { createContext } from "react";
import { useReducer } from "react";
import { createAction } from "../../utils/reducer/reducer.utils";


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
});

const INITIAL_STATE = {
  isCartOpen: false,
  cartItems: [],
  cartCount: 0,
  cartTotal: 0
};

const CART_ACTION_TYPES = {
  SET_CART_ITEMS: 'SET_CART_ITEMS',
  SET_IS_CART_OPEN: 'SET_IS_CART_OPEN'
}

const cartReducer = (state, action) => {
  const { type, payload } = action;

  switch(type)
  {
    case CART_ACTION_TYPES.SET_IS_CART_OPEN:
      return{
        ...state,
        isCartOpen: payload
      }
    case CART_ACTION_TYPES.SET_CART_ITEMS:
      return{
        ...state,
        ...payload
      }
    
    default:
      throw new Error(`Unhandled type of ${type} in cartReducer`);
  }
}

export const CartProvider = ({ children }) => {
  const[state, dispatch] = useReducer(cartReducer, INITIAL_STATE);
  const { cartItems, cartCount, cartTotal, isCartOpen } = state;


  const updateCartItemsReducer = (newCartItems) => {
      const newCartCount = newCartItems.reduce((total, cartItem) => total + cartItem.quantity, 0);
      const newCartTotal = newCartItems.reduce((total, cartItem) => total + cartItem.quantity * cartItem.price, 0);
      const newState = {
        cartItems: newCartItems,
        cartCount: newCartCount,
        cartTotal: newCartTotal
      }

      dispatch(createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newState));
  }

  const setIsCartOpen = (isCartOpen) => {
    dispatch(createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen));
}
    const addItemToCart = (productToAdd) =>{
      updateCartItemsReducer(addCartItem(cartItems, productToAdd));
    }
    const removeItemFromCart = (productToRemove) =>{
      updateCartItemsReducer(removeCartItem(cartItems, productToRemove));
    }
    const clearItemFromCart = (productToClear) =>{
      updateCartItemsReducer(clearCartItem(cartItems, productToClear));
    }

    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, clearItemFromCart, cartItems, cartCount, cartTotal};

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}