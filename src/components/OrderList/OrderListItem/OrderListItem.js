import styles from "./OrderListItem.module.css";

export default function OrderListItem({
  order: { _id, name, phone, address, bill, deliveryStatus, payStatus },
}) {
  return (
    <div className={styles.item}>
      <p className={styles.id}>{_id}</p>
      <p className={styles.name}>{name}</p>
      <p className={styles.phone}>{phone}</p>
      <p className={styles.address}>{address}</p>
      <p className={styles.total}>
        {bill.toLocaleString().split(",").join(".")}
      </p>
      <p className={styles["delivery-status"]}>{deliveryStatus}</p>
      <p className={styles["pay-status"]}>{payStatus}</p>
      <div className={styles.action}>
        <button>View</button>
      </div>
    </div>
  );
}
