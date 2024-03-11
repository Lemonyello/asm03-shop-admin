import { Link, useLocation, useNavigate } from "react-router-dom";
import styles from "./NavBar.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faComment,
  faShapes,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { removeFromStorage, ROLE } from "../../../store/local-storage";

export default function NavBar() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const onLogout = () => {
    removeFromStorage(ROLE);
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <Link to="/home" className={pathname === "/home" ? styles.active : ""}>
        <FontAwesomeIcon icon={faShapes} />
        <span>Dashboard</span>
      </Link>
      <Link
        to="/add-product"
        className={pathname === "/add-product" ? styles.active : ""}
      >
        <FontAwesomeIcon icon={faSquarePlus} />
        <span>Add Product</span>
      </Link>
      <Link
        to="/products"
        className={pathname === "/products" ? styles.active : ""}
      >
        <FontAwesomeIcon icon={faBoxesStacked} />
        <span>Products</span>
      </Link>
      <Link to="/chats" className={pathname === "/chats" ? styles.active : ""}>
        <FontAwesomeIcon icon={faComment} />
        <span>Chats</span>
      </Link>
      <button onClick={onLogout}>Logout</button>
    </div>
  );
}
