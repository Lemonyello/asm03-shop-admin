import openSocket from "socket.io-client";
import ShopContext from "./shop-context";
import { useState } from "react";
import { base } from "./url";

const socket = openSocket(base.slice(0, -1));

const ShopContextProvider = ({ children }) => {
  const [chats, setChats] = useState([]);
  const [currentRoom, setCurrentRoom] = useState(null);

  return (
    <ShopContext.Provider
      value={{
        socket,
        chats,
        setChats,
        currentRoom,
        setCurrentRoom,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
