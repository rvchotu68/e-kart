import "./cart-dropdown.styles.scss";
import Button from "../button/button.component";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";
import CartItem from "../cart-item/cart-item.component";
import { useNavigate } from "react-router-dom";

const CartDropDown = () =>{
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();
    const checkoutHandler = () =>{
        navigate("/checkout");
    }
    return(
        <div className="cart-dropdown-container">
        <div className="cart-items">
        {
            cartItems.map(cartItem =>{
                return <CartItem key={cartItem.id} product = {cartItem} />
            })
        }
        </div>
        <Button buttonType="reverse" onClick={checkoutHandler}>Go To Checkout</Button>
        </div>
    );
}

export default CartDropDown;