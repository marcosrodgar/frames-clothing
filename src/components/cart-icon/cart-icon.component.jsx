import {CartIconContainer, ShoppingIcon, ItemCount} from './cart-icon.styles.jsx'
import { selectIsCartOpen, selectCartCount } from '../store/cart/cart.selector.js';
import { setIsCartOpen } from '../store/cart/cart.action.js';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const CartIcon = () => {
    const dispatch = useDispatch();
    const isCartOpen = useSelector(selectIsCartOpen);
    const cartCount = useSelector(selectCartCount);
    const toggleIsCartOpen = () => dispatch(setIsCartOpen(!isCartOpen));

    return(
        <CartIconContainer onClick={toggleIsCartOpen}>
            <ShoppingIcon />
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon;