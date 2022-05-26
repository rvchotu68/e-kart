import { Outlet, Link } from "react-router-dom";
import { Fragment, useContext } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
import { Context } from "../../context/user.context";
import { signOutHandler } from "../../utils/firebase/firebase.utils";
import ShoppingCartIcon from "../../component/shopping-cart-icon/shopping-cart-icon.component";
import CartDropDown from "../../component/cart-dropdown/cart-dropdown.component";
import { CartContext } from "../../context/cart.context";
import {
  NavigationContainer,
  LogoContainer,
  NavLinksContainer,
  NavLink
} from "./navigation.styles";

const Navigation = () => {
  const { currUser } = useContext(Context);
  const { isCartActive } = useContext(CartContext);
  return (
    <Fragment>
      <NavigationContainer>
        <LogoContainer to="/">
          <CrwnLogo className="logo" />
        </LogoContainer>
        <NavLinksContainer>
          <NavLink to="/shop">
            Shop
          </NavLink>
          {currUser ? (
            <NavLink as="span" onClick={signOutHandler}>
              Sign out
            </NavLink>
          ) : (
            <NavLink to="/auth">
              Sign In
            </NavLink>
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
