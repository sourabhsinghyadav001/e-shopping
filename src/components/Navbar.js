import { Link, Outlet } from "react-router-dom";
import classes from "./Navbar.module.css";
export function Navbar() {
  return (
    <>
      <div className={classes.container}>
        <Link to={"/"}>Busy Buy</Link>
        <div className={classes.links}>
          <Link className={classes.link} to="/">
            <img src="/home.png" alt="home"></img>
            Home
          </Link>
          <Link className={classes.link} to="/orders">
            <img src="/orders.png" alt="home"></img>
            My orders
          </Link>
          <Link className={classes.link} to="/cart">
            <img src="/cart.png" alt="home"></img>
            Cart
          </Link>
          <Link className={classes.link} to="/logout">
            <img src="/logout.png" alt="home"></img>
            Logout
          </Link>
        </div>
      </div>
      <Outlet />
    </>
  );
}
