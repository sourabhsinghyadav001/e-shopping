import { Link, Outlet } from "react-router-dom";
import classes from "./Navbar.module.css";
import { useUserContext } from "../context/userContext";
export function Navbar() {
  const { logged } = useUserContext();
  return (
    <>
      <div className={classes.container}>
        <Link to={"/"}>Busy Buy</Link>
        <div className={classes.links}>
          <Link className={classes.link} to="/">
            <img src="/home.png" alt="home"></img>
            Home
          </Link>
          {logged ? (
            <>
              <Link className={classes.link} to="/orders">
                <img src="/orders.png" alt="orders"></img>
                My orders
              </Link>
              <Link className={classes.link} to="/cart">
                <img src="/cart.png" alt="cart"></img>
                Cart
              </Link>
              <Link className={classes.link} to="/signout">
                <img src="/logout.png" alt="logout"></img>
                Logout
              </Link>
            </>
          ) : (
            <Link className={classes.link} to="/login">
              <img src="/signin.png" alt="login"></img>
              SignIn
            </Link>
          )}
        </div>
      </div>
      <Outlet />
    </>
  );
}
