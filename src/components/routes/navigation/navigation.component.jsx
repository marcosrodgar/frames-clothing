import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react';
import { ReactComponent  as CrwnLogo } from '../../assets/crown.svg'
import { UserContext } from '../../contexts/user.context';
import { CartContext } from '../../contexts/cart.context';
import './navigation.styles.scss'
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';

const Navigation = () => {
    const {currentUser } = useContext(UserContext);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
         await signOutUser();
    }

    return (
        <Fragment>
            <div className='navigation'>
                <Link className='logo-container' to='/'>
                    <CrwnLogo className='logo'/>
                </Link>
                <div className='nav-links-container'>
                    <Link className='nav-link' to='shop'>
                        Shop
                    </Link>
                    {
                        currentUser ? (
                            <span className='nav-link' onClick={signOutHandler}> Sign Out</span>
                        )
                        :
                        <Link className='nav-link' to='auth'>
                            Sign In
                        </Link>
                    }
                    <CartIcon/>                   
                </div>
                {
                    isCartOpen &&
                    <CartDropdown/>
                }
              
            </div>
            <Outlet/>
        </Fragment>
    )
  }

  export default Navigation;