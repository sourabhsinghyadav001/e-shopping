import { doc, onSnapshot, setDoc } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { db } from "../firebaseSettings";
import { getAuth, onAuthStateChanged } from "firebase/auth";
export const userContext = createContext();
export function useUserContext() {
  const data = useContext(userContext);
  return data;
}
export function UserDataProvider({ children }) {
  const [logged, setLogged] = useState(false);
  const [cart, setCart] = useState({});
  const [orders, setOrders] = useState({});
  const [email, setEmail] = useState("");
  let unsubCart = null;
  useEffect(() => {
    async function syncCart() {
      unsubCart = onSnapshot(doc(db, "cart", email), (snapshot) => {
        setCart(snapshot.data());
      });
    }
    if (logged) syncCart();
  }, [logged, email]);
  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLogged(true);
        setEmail(user.email);
      }
    });
    return () => unsubCart();
  }, []);
  const updateCart = async (obj) => {
    await setDoc(doc(db, "cart", email), obj);
  };
  return (
    <userContext.Provider
      value={{
        logged,
        setLogged,
        cart,
        updateCart,
        orders,
        setOrders,
        email,
        setEmail,
      }}
    >
      {children}
    </userContext.Provider>
  );
}
