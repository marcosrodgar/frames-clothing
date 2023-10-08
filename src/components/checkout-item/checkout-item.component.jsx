import './checkout-item.styles.scss'
import { removeItemFromCart, addItemToCart, clearItemFromCart } from '../store/cart/cart.action';
import { useDispatch } from 'react-redux';
import { selectCartItems } from '../store/cart/cart.selector.js'
import { useSelector } from 'react-redux';

const CheckoutItem = ({cartItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const clearItemHandler = () => dispatch(clearItemFromCart(cartItems, cartItem));
    const addItemHandler = () => dispatch(addItemToCart(cartItems, cartItem));
    const removeItemHandler = () => dispatch(removeItemFromCart(cartItems, cartItem));
    
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