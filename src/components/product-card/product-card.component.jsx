import './product-card.styles.scss'
import  Button, {BUTTON_TYPE_CLASSES} from '../button/button.component';
import { addItemToCart } from '../store/cart/cart.action';
import { useDispatch } from 'react-redux';
import { selectCartItems } from '../store/cart/cart.selector.js';
import { useSelector } from 'react-redux';

const ProductCard = ({product}) =>{
    const { name, imageUrl, price } = product;
    const dispatch = useDispatch();
    const cartItems = useSelector(selectCartItems);

    const addItemToCartHandler = () => dispatch(addItemToCart(cartItems, product));


    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className="footer">
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button onClick={addItemToCartHandler}buttonType={BUTTON_TYPE_CLASSES.inverted}>Add to cart</Button>
        </div>
    )

}

export default ProductCard;