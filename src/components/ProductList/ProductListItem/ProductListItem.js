import { useNavigate } from "react-router-dom";
import styles from "./ProductListItem.module.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { delete_product } from "../../../store/url";
import { getFromStorage, ROLE } from "../../../store/local-storage";

export default function ProductListItem({
  item: { _id, name, price, img1, category },
  onDeleteHandler,
}) {
  const navigate = useNavigate();

  const onDelete = () => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to delete this.",
      buttons: [
        {
          label: "Yes",
          onClick: async () => {
            const role = getFromStorage(ROLE, "");
            try {
              const res = await fetch(delete_product + "?role=" + role, {
                method: "DELETE",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({ productId: _id }),
              });

              const data = await res.json();

              if (res.ok) onDeleteHandler(_id);

              alert(data.msg);
            } catch (error) {
              console.log(error);
            }
          },
        },
        {
          label: "No",
        },
      ],
      closeOnEscape: true,
    });
  };

  return (
    <div className={styles.item}>
      <p className={styles.id}>{_id}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.price}>
        {price.toLocaleString().split(",").join(".")}
      </p>
      <div className={styles.image}>
        <img src={img1} alt={name} />
      </div>
      <p className={styles.category}>{category}</p>
      <div className={styles.actions}>
        <button onClick={navigate.bind(null, "/edit-product/" + _id)}>
          Update
        </button>
        <button onClick={onDelete}>Delete</button>
      </div>
    </div>
  );
}
