import React from "react";
import { useDispatch, useSelector } from "react-redux";
import FoodItemCard from "./FoodItemCard";
import { clearCart } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const handleClearCart = () => {
    dispatch(clearCart());
  }
  return (
    <div className="cartSection">
      <h1 className="cartItems">Cart Items - {cartItems.length}</h1>
      <button className="clearCartBTN" onClick={()=> handleClearCart()}>Clear Cart</button>
      <div className="cart">
        {cartItems.map((item) => (
          <FoodItemCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
};

export default Cart;
