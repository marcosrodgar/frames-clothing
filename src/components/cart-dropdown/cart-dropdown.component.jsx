import {CartDropdownContainer, EmptyMessage, CartItems} from './cart-dropdown.styles.jsx'
import Button from '../button/button.component.jsx'
import CartItem from '../cart-item/cart-item.component'
import { useContext } from 'react'
import { CartContext } from '../contexts/cart.context'
import { useNavigate } from 'react-router-dom'

const CartDropdown = () => {
    const navigate = useNavigate();
    const { cartItems, setIsCartOpen } = useContext(CartContext);

    const goToCheckout = () => {
        navigate("/checkout");
        setIsCartOpen(false);
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