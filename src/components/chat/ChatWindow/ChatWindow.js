import styles from "./ChatWindow.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useRef, useContext } from "react";
import ShopContext from "../../../store/shop-context";

export default function ChatWindow() {
  const chatRef = useRef();
  const { socket, chats, currentRoom } = useContext(ShopContext);
  const currentConversation = chats.find(
    (conversation) => conversation.room === currentRoom
  );

  return (
    <div className={styles["window-input"]}>
      <div className={styles.window}>
        {chats.length && currentConversation ? (
          currentConversation.chat.map((chat, i) =>
            chat.username === "server" ? (
              <div className={styles.admin} key={i}>
                <p>You: {chat.msg}</p>
              </div>
            ) : (
              <div className={styles.client} key={i}>
                <img
                  src="./resource/business profile pic.PNG"
                  alt="business man"
                />
                <p>Client: {chat.msg}</p>
              </div>
            )
          )
        ) : (
          <p>Click on a conversation to chat.</p>
        )}
      </div>
      <div className={styles["chat-input"]}>
        <input type="text" placeholder="Type and enter" ref={chatRef} />
        <button
          onClick={() => {
            socket.emit("send_message", {
              username: "server",
              msg: chatRef.current.value,
              room: currentRoom,
            });
            chatRef.current.value = "";
          }}
        >
          <FontAwesomeIcon icon={faPaperPlane} className={styles.icon} />
        </button>
      </div>
    </div>
  );
}
