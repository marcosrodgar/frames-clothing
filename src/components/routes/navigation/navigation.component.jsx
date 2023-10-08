import { Outlet } from 'react-router-dom'
import { Fragment } from 'react';
import { ReactComponent  as CrwnLogo } from '../../assets/crown.svg'
import {NavigationContainer, LogoContainer, NavLinks, NavLink} from './navigation.styles'
import { signOutUser } from '../../../utils/firebase/firebase.utils';
import CartIcon from '../../cart-icon/cart-icon.component';
import CartDropdown from '../../cart-dropdown/cart-dropdown.component';
import { useSelector } from 'react-redux';
import { selectCurrentUser } from '../../store/user/user.selector';
import { selectIsCartOpen } from '../../store/cart/cart.selector';


const Navigation = () => {
    const currentUser =  useSelector(selectCurrentUser);
    const isCartOpen = useSelector(selectIsCartOpen);

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