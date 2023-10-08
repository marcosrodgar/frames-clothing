import { Outlet, Link } from 'react-router-dom'
import { Fragment, useContext } from 'react';
import { ReactComponent  as CrwnLogo } from '../../assets/crown.svg'
import { CartContext } from '../../contexts/cart.context';
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';


const Navigation = () => {
    const currentUser =  useSelector(selectCurrentUser);
    const {isCartOpen} = useContext(CartContext);

    const signOutHandler = async () => {
         await signOutUser();
    }

    return (
        <Fragment>
            <NavigationContainer>
                <LogoContainer  to='/'>
                    <CrwnLogo className='logo'/>
                </LogoContainer>
                <NavLinks>
                    <NavLink  to='shop'>
                        Shop
                    </NavLink>
                    {
                        currentUser ? (
                            <NavLink as='span' onClick={signOutHandler}> Sign Out</NavLink>
                        )
                        :
                        <NavLink to='auth'>
                            Sign In
                        </NavLink>
                    }
                    <CartIcon/>                   
                </NavLinks>
                {
                    isCartOpen &&
                    <CartDropdown/>
                }             
            </NavigationContainer>
            <Outlet/>
        </Fragment>
    )
  }

  export default Navigation;