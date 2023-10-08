import './checkout.styles.scss'
import CheckoutItem from '../../checkout-item/checkout-item.component';
import { selectCartItems, selectCartTotal } from '../../store/cart/cart.selector';
import { useSelector } from 'react-redux';

const Checkout = () => {
    const cartItems = useSelector(selectCartItems);
    const cartTotal = useSelector(selectCartTotal); 
    
    const headerBlocks = [
        'product', 'description', 'quantity', 'price', 'remove'
    ];

    return(
        <div className='checkout-container'>
            <div className='checkout-header'>
                {headerBlocks.map(headerBlock => 
                <div key={headerBlock} className='header-block'>
                    <span>{headerBlock}</span>
                </div>
                )}
            </div>
            {cartItems.map(cartItem => <CheckoutItem key={cartItem.id} cartItem={cartItem}/>)}
            <span className='total'>Total: ${cartTotal}</span>
        </div>
       
    )

}

export default Checkout;