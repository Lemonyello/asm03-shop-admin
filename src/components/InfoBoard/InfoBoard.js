import styles from "./InfoBoard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDollarSign,
  faFileCirclePlus,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

export default function InfoBoard({ users, earningsMon, newOrder }) {
  return (
    <div className={styles.boards}>
      <div className={styles.board}>
        <div>
          <p>{users}</p>
          <h4>Clients</h4>
        </div>
        <FontAwesomeIcon icon={faUserPlus} className={styles.icon} />
      </div>
      <div className={styles.board}>
        <div>
          <span>{earningsMon.toLocaleString().split(",").join(".")}</span>
          <span>&nbsp; VND</span>
          <h4>Earnings of Month</h4>
        </div>
        <FontAwesomeIcon icon={faDollarSign} className={styles.icon} />
      </div>
      <div className={styles.board}>
        <div>
          <p>{newOrder}</p>
          <h4>New Order</h4>
        </div>
        <FontAwesomeIcon icon={faFileCirclePlus} className={styles.icon} />
      </div>
    </div>
  );
}
