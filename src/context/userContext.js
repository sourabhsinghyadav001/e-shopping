import { createContext, useContext, useState } from "react";
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
  return (
    <userContext.Provider
      value={{
        logged,
        setLogged,
        cart,
        setCart,
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
