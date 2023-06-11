import { useEffect, useRef, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseSettings";
import classes from "./Home.module.css";
import { Card } from "../components/Card";
import { GridLoader } from "react-spinners";
export function Home() {
  const [products, setProducts] = useState([]);
  const categories = useRef({});
  const [filterValue, setFilterValue] = useState(70000);
  const [filterCategories, setFilterCategories] = useState({});
  const [searchKeyword, setSearchKeyword] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function getData() {
      const docRef = doc(db, "products", "all");
      const result = (await getDoc(docRef)).data().values.map((e) => {
        e.price = Math.round(e.price) * 70;
        categories.current[e.category] = true;
        return e;
      });
      setProducts(result);
      setLoading(false);
    }
    getData();
  }, []);
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
  return (
    <>
      <div className={classes.search}>
        <input
          className={classes.searchInput}
          value={searchKeyword}
          placeholder="Search By Name"
          onChange={(event) =>
            setSearchKeyword(event.currentTarget.value.toLowerCase())
          }
        />
      </div>
      <div className={classes.container}>
        <div className={classes.left}>
          <aside className={classes.filter}>
            <h2>Filter</h2>
            <div>{filterValue}</div>
            <input
              type="range"
              min={0}
              max={70000}
              onChange={(event) =>
                setFilterValue(parseInt(event.currentTarget.value))
              }
              value={filterValue}
            />
            {Object.keys(categories.current).map((key) => (
              <div
                style={{ textAlign: "left", marginBottom: "1rem" }}
                key={key}
              >
                <input
                  type="checkbox"
                  onChange={(event) => {
                    if (event.currentTarget.checked) {
                      setFilterCategories((prev) => ({ ...prev, [key]: true }));
                    } else {
                      const { [key]: _, ...rest } = filterCategories;
                      setFilterCategories(rest);
                    }
                  }}
                />
                {key}
              </div>
            ))}
          </aside>
        </div>
        <div className={classes.right}>
          {(Object.keys(filterCategories).length
            ? products.filter(
                (product) =>
                  product.price <= filterValue &&
                  filterCategories[product.category] &&
                  product.title.toLowerCase().includes(searchKeyword)
              )
            : products.filter(
                (product) =>
                  product.price <= filterValue &&
                  product.title.toLowerCase().includes(searchKeyword)
              )
          ).map((element) => (
            <Card
              key={element.id}
              src={element.image}
              details={element.title}
              price={element.price}
              id={element.id}
              addToCartMode={true}
            />
          ))}
        </div>
      </div>
    </>
  );
}
