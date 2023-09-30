import './checkout.styles.scss'
import { useContext } from 'react';
import { CartContext } from '../../contexts/cart.context.jsx'
import CheckoutItem from '../../checkout-item/checkout-item.component';

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    
    const headerBlocks = [
        'product', 'description', 'quantity', 'price', 'remove'
    ];

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                {headerBlocks.map(headerBlock => 
                <div className='header-block'>
                    <span>{headerBlock}</span>
                </div>
                )}
            </div>
            {cartItems.map(cartItem => <CheckoutItem cartItem={cartItem}/>)}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
       
    )

}

export default Checkout;