import styles from "./OrderList.module.css";
import OrderListItem from "./OrderListItem/OrderListItem";

const OrderListHeader = () => {
  return (
    <div className={styles.header}>
      <h4 className={styles.id}>ID User</h4>
      <h4 className={styles.name}>Name</h4>
      <h4 className={styles.phone}>Phone</h4>
      <h4 className={styles.address}>Address</h4>
      <h4 className={styles.total}>Total</h4>
      <h4 className={styles["delivery-status"]}>Delivery</h4>
      <h4 className={styles["pay-status"]}>Status</h4>
      <h4 className={styles.action}>Detail</h4>
    </div>
  );
};

export default function OrderList({ orders }) {
  return (
    <div className={styles.list}>
      <h2>History</h2>
      <OrderListHeader />
      {orders.length ? (
        orders.map((order, i) => <OrderListItem key={i} order={order} />)
      ) : (
        <p>No orders.</p>
      )}
    </div>
  );
}
