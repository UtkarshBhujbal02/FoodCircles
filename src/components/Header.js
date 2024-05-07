import { useState, useContext } from "react";
import Logo from "../assets/FoodCirclesLogo.png";
import { Link } from "react-router-dom";
import useOnline from "../utils/useOnline";
import UserContext from "../utils/UserContext";
import { useSelector } from "react-redux";
import store from "../utils/store";

// const loggedInUser = () => {
//   return true;
// };

const Title = () => (
  <a href="/">
    <img className="logo" alt="logo" src={Logo} />
  </a>
);

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const isOnline = useOnline();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="header ">
      <Title />
      <div className="nav-items">
        <ul className="flex py-10">
          <li className="px-2">
            <Link to="/">Home</Link>
          </li>
          <li className="px-2">
            <Link to="/About">About Us</Link>
          </li>
          <li className="px-2">
            <Link to="/Contact">Contact Us</Link>
          </li>
          <li className="px-2">
            <Link to="/cart">Cart-{cartItems.length} items</Link>
          </li>
        </ul>
      </div>
      <h2>{isOnline ? "🟢 Online" : "🔴 Offline"}</h2>
    

      {isLoggedIn ? (
        <button className="logout-btn" onClick={() => setIsLoggedIn(false)}>
          Logout
        </button>
      ) : (
        <button className="login-btn" onClick={() => setIsLoggedIn(true)}>
          Login
        </button>
      )}
    </div>
  );
};

export default Header;
