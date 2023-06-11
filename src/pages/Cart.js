import { useUserContext } from "../context/userContext";
import { Card } from "../components/Card";
import classes from "./Home.module.css";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebaseSettings";
export function Cart() {
  const { logged, cart, updateCart, email } = useUserContext();
  const navigate=useNavigate();
  const checkout = async () => {
    try {
      await setDoc(
        doc(db, "orders", email),
        {
          [new Date().getTime()]: {
            ...cart,
            timestamp: new Date().toJSON().slice(0, 10),
          },
        },
        { merge: true }
      );
      updateCart({});
      navigate("/orders")
      
    } catch (err) {
      toast("Something went wrong!");
    }
  };

  if (!logged) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Not logged in!</h1>
      </div>
    );
  }
  if (Object.keys(cart).length == 0)
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Your cart is empty</h1>
      </div>
    );
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <aside className={classes.filter}>
          <h2>
            Total Price:
            {Object.values(cart).reduce(
              (acc, item) => acc + item.count * item.price,
              0
            )}
          </h2>
          <button className={classes.purchase} onClick={checkout}>
            Purchase
          </button>
        </aside>
      </div>
      <div className={classes.right}>
        {Object.entries(cart).map(([id, element]) => (
          <Card
            key={id}
            src={element.src}
            details={element.details}
            price={element.price}
            id={id}
            addToCartMode={false}
          />
        ))}
      </div>
    </div>
  );
}
