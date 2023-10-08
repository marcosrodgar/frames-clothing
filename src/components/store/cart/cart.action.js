import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../../utils/reducer/reducer.utils";

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

export const addItemToCart = (cartItems, productToAdd) =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, addCartItem(cartItems, productToAdd));

export const removeItemFromCart = (cartItems,productToRemove) =>
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, removeCartItem(cartItems, productToRemove));
  
export const clearItemFromCart = (cartItems, productToClear) => 
    createAction(CART_ACTION_TYPES.SET_CART_ITEMS, clearCartItem(cartItems, productToClear));
  
export const setIsCartOpen = (isCartOpen) => createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, isCartOpen);