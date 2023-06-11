import { useRef } from "react";
import { useUserContext } from "../context/userContext";
import classes from "./Card.module.css";
import { setDoc, doc, deleteField, updateDoc } from "firebase/firestore";
import { db } from "../firebaseSettings";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Card({ id, src, details, price, addToCartMode }) {
  const buttonRef = useRef(null);
  const { email, logged, cart, updateCart } = useUserContext();
  const navigate = useNavigate();
  const addToCart = async () => {
    if (!logged) {
      navigate("/login");
      return;
    }
    buttonRef.current.innerHTML = "Adding...";
    try {
      const docRef = doc(db, "cart", email);
      if (!Object.keys(cart ?? {}).length || !cart[id]) {
        await setDoc(
          docRef,
          { [id]: { src, details, price, count: 1 } },
          { merge: true }
        );
        toast("Added to cart");
      } else {
        await setDoc(
          docRef,
          { [id]: { count: cart[id].count + 1 } },
          { merge: true }
        );
        toast("Increased cart count");
      }
    } catch (err) {
      console.log(err);
      toast("Something went wrong");
    }

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
        {addToCartMode && (
          <button
            ref={buttonRef}
            className={classes.button}
            onClick={addToCart}
          >
            Add to Cart
          </button>
        )}
        {!addToCartMode && (
          <>
            <div className={classes.plusMinus}>
              <img
                src="/minus.png"
                onClick={async () => {
                  try {
                    if (cart[id].count >= 2) {
                      await setDoc(
                        doc(db, "cart", email),
                        {
                          [id]: { count: cart[id].count - 1 },
                        },
                        { merge: true }
                      );
                      toast("decreased count");
                    } else {
                      await updateDoc(doc(db, "cart", email), {
                        [id]: deleteField(),
                      });
                      toast("removed from cart");
                    }
                  } catch (err) {
                    toast("Something went wrong");
                  }
                }}
              />
              {cart[id].count}
              <img
                src="/plus.png"
                onClick={async () => {
                  try {
                    await setDoc(
                      doc(db, "cart", email),
                      {
                        [id]: { count: cart[id].count + 1 },
                      },
                      { merge: true }
                    );
                    toast("increased count");
                  } catch (err) {
                    toast("Something went wrong");
                  }
                }}
              />
            </div>
            <div style={{ textAlign: "center" }}>
              <button
                className={classes.remove}
                onClick={async () => {
                  try {
                    await updateDoc(doc(db, "cart", email), {
                      [id]: deleteField(),
                    });
                    toast("removed from cart");
                  } catch (err) {
                    toast("Something went wrong");
                  }
                }}
              >
                Remove from Cart
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
