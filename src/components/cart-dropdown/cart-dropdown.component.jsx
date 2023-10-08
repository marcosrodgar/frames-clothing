import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import Button from '../button/button.component.jsx'
import CartItem from '../cart-item/cart-item.component'
import { selectCartItems } from '../store/cart/cart.selector.js'
import { setIsCartOpen } from '../store/cart/cart.action.js'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'

const CartDropdown = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const cartItems = useSelector(selectCartItems);

    const goToCheckout = () => {
        navigate("/checkout");
        dispatch(setIsCartOpen(false));
    }
    
    return(
        <CartDropdownContainer>
            <CartItems>
                {
                    cartItems.length ? cartItems.map(item => <CartItem key={item.id} cartItem={item}/>)
                    : <EmptyMessage>Your cart is empty</EmptyMessage>
                }         
            </CartItems>
            <Button onClick={goToCheckout}>GO TO CHECKOUT</Button>
        </CartDropdownContainer>
    )
}

export default CartDropdown;