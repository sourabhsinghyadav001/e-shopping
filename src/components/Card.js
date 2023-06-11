import { useRef } from "react";
import { useUserContext } from "../context/userContext";
import classes from "./Card.module.css";
export function Card({ src, details, price, addToCartMode }) {
  const buttonRef = useRef(null);
  const { cart, setCart, email } = useUserContext();
  const addToCart = async () => {
    buttonRef.current.innerHTML = "Adding...";
    
    buttonRef.current.innerHTML = "Add to Cart";
  };
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={src} alt="product" />
      </div>
      <div className={classes.details}>
        <div className={classes.productDetails}>{details}</div>
        <div className={classes.productPrice}>{"₹ " + price}</div>
        <button ref={buttonRef} className={classes.button} onClick={addToCart}>
          Add to Cart
        </button>
      </div>
    </div>
  );
}
