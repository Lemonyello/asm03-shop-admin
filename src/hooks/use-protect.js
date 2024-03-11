import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getFromStorage, ROLE } from "../store/local-storage";

const useProtect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = getFromStorage(ROLE, "");

    if (!role) navigate("/");
    else {
      if (role !== "admin") navigate("/chats");
    }
  }, [navigate]);
};

export default useProtect;
