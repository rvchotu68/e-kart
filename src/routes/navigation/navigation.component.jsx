import { Outlet } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { signOutHandler } from "../../utils/firebase/firebase.utils";
import ShoppingCartIcon from "../../component/shopping-cart-icon/shopping-cart-icon.component";
import CartDropDown from "../../component/cart-dropdown/cart-dropdown.component";
import { useSelector } from "react-redux";
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink,
} from "./navigation.styles";
import { isCartActiveSelector } from "../../store/cart/cart.selector";

const Navigation = () => {
 const currUser = useSelector(state => state.user.currUser); 
  // const { isCartActive } = useContext(CartContext);
  const isCartActive = useSelector(isCartActiveSelector);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">Shop</NavLink>
          { currUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">Sign In</NavLink>
          )}
          <ShoppingCartIcon />
        </NavLinksContainer>
        {isCartActive && <CartDropDown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
