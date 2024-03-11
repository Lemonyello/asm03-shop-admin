import styles from "./ChatList.module.css";
import { useContext } from "react";
import ShopContext from "../../../store/shop-context";

const ChatListItem = ({ room }) => {
  const { setCurrentRoom, currentRoom } = useContext(ShopContext);

  return (
    <div
      className={`${styles.item} ${room === currentRoom ? styles.active : ""}`}
      onClick={() => setCurrentRoom(room)}
    >
      <img src="./resource/business profile pic.PNG" alt="user" />
      <h5>{room}</h5>
    </div>
  );
};

export default function ChatList() {
  const { chats } = useContext(ShopContext);

  return (
    <div className={styles.list}>
      <div className={styles.search}>
        <input type="text" placeholder="Search Contact" />
      </div>
      {chats.length ? (
        chats.map((conversation, i) => (
          <ChatListItem room={conversation.room} key={i} />
        ))
      ) : (
        <p style={{ textAlign: "center" }}>No chats.</p>
      )}
    </div>
  );
}
