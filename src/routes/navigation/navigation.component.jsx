import "./navigation.styles.scss";
import { Outlet, Link } from "react-router-dom";
import { Fragment } from "react";
import { ReactComponent as CrwnLogo } from "../../assets/crown.svg";
// import SignIn from "../sign-in/sigin-in.component";
// import Shop from "../shop/shop.component";

const Navigation = () => {
  return (
    <Fragment>
      <div className="navigation">
        <Link className="logo-container" to="/">
          <div>
            <CrwnLogo className="logo"/>
          </div>
        </Link>
        <div className="nav-links-container">
          <Link className="nav-link" to="/shop">
            Shop
          </Link>
          <Link className="nav-link" to="/sign-in">Sign In</Link>
        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;
