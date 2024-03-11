import styles from "./Chats.module.css";
import ChatList from "../../components/chat/ChatList/ChatList";
import ChatWindow from "../../components/chat/ChatWindow/ChatWindow";
import useProtect from "../../hooks/use-protect";

export default function ChatsPage() {
  useProtect();

  return (
    <div className={styles.chats}>
      <h2>Chat</h2>
      <h3>Apps / Chat</h3>
      <div>
        <ChatList />
        <ChatWindow />
      </div>
    </div>
  );
}
