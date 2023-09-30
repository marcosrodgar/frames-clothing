import './checkout-item.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../contexts/cart.context';

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem;
    const { removeItemFromCart, addItemToCart, clearItemFromCart } = useContext(CartContext);

    const clearItemHandler = () => clearItemFromCart(cartItem);
    const addItemHandler = () => addItemToCart(cartItem);
    const removeItemHandler = () => removeItemFromCart(cartItem);
    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <div className='name'>{name}</div>
            <span className='quantity'>
                <span onClick={removeItemHandler} className='arrow'>&#10094;</span>
                <span className='value'>{quantity}</span>
                <span onClick={addItemHandler} className='arrow'>&#10095;</span>
            </span>
            <div className='price'>{price}</div>
            <div className='remove-button' onClick={clearItemHandler}>X</div>
        </div>
    )
}

export default CheckoutItem;