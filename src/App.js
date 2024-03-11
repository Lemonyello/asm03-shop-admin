import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Login from "./pages/login/Login";
import DashboardPage, { loader as loaderDashboard } from "./pages/Dashboard";
import AddProductPage from "./pages/AddProduct";
import ProductsPage from "./pages/Products";
import ChatsPage from "./pages/chat/Chats";
import {
  action as actionAddProduct,
  loader as loaderEditProduct,
} from "./components/AddProductForm/AddProductForm";
import EditProductPage from "./pages/EditProduct";
import { useEffect, useContext } from "react";
import ShopContext from "./store/shop-context";
import { removeFromStorage, ROLE } from "./store/local-storage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
    errorElement: <h1>Something went wrong.</h1>,
  },

  {
    path: "/",
    element: <Layout />,
    errorElement: <h1>Something went wrong.</h1>,
    children: [
      {
        path: "home",
        element: <DashboardPage />,
        loader: loaderDashboard,
      },
      {
        path: "add-product",
        element: <AddProductPage />,
        action: actionAddProduct,
      },
      {
        path: "edit-product/:productId",
        element: <EditProductPage />,
        loader: loaderEditProduct,
        action: actionAddProduct,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "chats",
        element: <ChatsPage />,
      },
    ],
  },
]);

function App() {
  const { socket, setChats } = useContext(ShopContext);

  useEffect(() => {
    removeFromStorage(ROLE);

    socket.on("new_user_chat", ({ room, msg, username }) => {
      setChats((prevState) => {
        prevState.push({ room, chat: [{ username, msg }] });
        return [...prevState];
      });
      socket.emit("admin_join_room", { username: "abc", room });
    });

    socket.on("receive_message", ({ room, username, msg }) => {
      setChats((prevState) => {
        prevState
          .find((conversation) => conversation.room === room)
          .chat.push({ username, msg });
        return [...prevState];
      });
    });

    socket.on("user_leave_chat", ({ room }) => {
      setChats((prevState) =>
        prevState.filter((conversation) => conversation.room !== room)
      );
    });
  }, [setChats, socket]);

  return <RouterProvider router={router} />;
}

export default App;
