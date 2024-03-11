import styles from "./ProductList.module.css";
import ProductListItem from "./ProductListItem/ProductListItem";
import { get_products } from "../../store/url";
import { useEffect, useState } from "react";
import { getFromStorage, ROLE } from "../../store/local-storage";

const ProductListHeader = () => {
  return (
    <div className={styles.header}>
      <h5 className={styles.id}>ID</h5>
      <h5 className={styles.name}>Name</h5>
      <h5 className={styles.price}>Price</h5>
      <h5 className={styles.image}>Image</h5>
      <h5 className={styles.category}>Category</h5>
      <h5 className={styles.actions}>Edit</h5>
    </div>
  );
};

let allProducts = [];

const fetchProducts = async (setProducts) => {
  const role = getFromStorage(ROLE, "");
  try {
    const res = await fetch(get_products + "?role=" + role);

    const data = await res.json();

    if (res.ok) {
      allProducts = data;
      setProducts(data);
    }
  } catch (error) {
    return null;
  }
};

export default function ProductList() {
  const [products, setProducts] = useState(allProducts);

  useEffect(() => {
    fetchProducts(setProducts);
  }, []);

  const onSearch = (event) => {
    if (event.target.value)
      setProducts(
        allProducts.filter((prod) => prod.name.includes(event.target.value))
      );
    else fetchProducts(setProducts);
  };

  return (
    <div className={styles.list}>
      <h1>Products</h1>
      <input type="text" placeholder="Enter Search" onChange={onSearch} />
      <ProductListHeader />
      {products.length ? (
        products.map((prod, i) => (
          <ProductListItem
            key={i}
            item={prod}
            onDeleteHandler={(productId) => {
              const newProds = products.filter((p) => p._id !== productId);
              allProducts = newProds;
              setProducts(newProds);
            }}
          />
        ))
      ) : (
        <p>No products.</p>
      )}
    </div>
  );
}
