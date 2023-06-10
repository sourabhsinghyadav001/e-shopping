import classes from "./Card.module.css";
export function Card({ src, details, price }) {
  return (
    <div className={classes.container}>
      <div className={classes.imageContainer}>
        <img src={src} alt="product image" />
      </div>
      <div className={classes.details}>
        <div className={classes.productDetails}>{details}</div>
        <div className={classes.productPrice}>{"₹ " + price}</div>
        <button className={classes.button}>Add to Card</button>
      </div>
    </div>
  );
}
