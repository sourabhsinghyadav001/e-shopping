import classes from "./Orders.module.css";
import { GridLoader } from "react-spinners";
import { doc, getDoc } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebaseSettings";
import { useUserContext } from "../context/userContext";

export function Orders() {
  const { logged, email } = useUserContext();
  const [orders, setOrders] = useState({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchData() {
      const data = (await getDoc(doc(db, "orders", email))).data();
      setOrders(data);
    }
    if (logged) fetchData();
    setLoading(false);
  }, [logged]);
  if (loading)
    return (
      <div
        style={{
          textAlign: "center",
          marginTop: "calc(50vh - 86px)",
        }}
      >
        <GridLoader />
      </div>
    );
  if (!logged) {
    return (
      <div style={{ textAlign: "center" }}>
        <h1>Not logged in!</h1>
      </div>
    );
  }

  return (
    <div className={classes.container}>
      {Object.entries(orders).map(([key, tableData]) => {
        let total = 0;
        return (
          <div style={{ textAlign: "center", marginBottom: "2rem" }} key={key}>
            <h2>Ordered On:- {tableData.timestamp}</h2>
            <table className={classes.table}>
              <thead>
                <tr>
                  <td>Title</td>
                  <td>Price</td>
                  <td>Quantity</td>
                  <td>Total Price</td>
                </tr>
              </thead>
              <tbody>
                {Object.entries(tableData).map(([key, itemData]) => {
                  if (key !== "timestamp")
                    total += itemData.count * itemData.price;
                  return (
                    key !== "timestamp" && (
                      <tr key={key}>
                        <td>{itemData.details}</td>
                        <td>
                          {"₹ "}
                          {itemData.price}
                        </td>
                        <td>{itemData.count}</td>
                        <td>
                          {"₹ "}
                          {itemData.count * itemData.price}
                        </td>
                      </tr>
                    )
                  );
                })}
                <tr className={classes.totalPrice}>
                  <td>
                    {"₹ "}
                    {total}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </div>
  );
}
