import "./shopping-cart-icon.styles.scss";
import {ReactComponent as CartIcon} from "../../assets/shopping-bag.svg";
import { useContext } from "react";
import { CartContext } from "../../context/cart.context";

const ShoppingCartIcon = ()=>{
    const {isCartActive,setIsCartActive,cartItemsCount} = useContext(CartContext);

    const clickHandler = () =>{
            setIsCartActive(!isCartActive);
    }

    return(
        <div className="cart-icon-container" onClick={clickHandler}>
        <CartIcon className="shopping"/>
        <span className="item-count">{cartItemsCount}</span>
        </div>
    );
}


export default ShoppingCartIcon;