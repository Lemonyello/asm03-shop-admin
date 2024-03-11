import { useNavigate } from "react-router-dom";
import styles from "./Auth.module.css";
import { login } from "../../store/url";
import { saveToStorage, ROLE } from "../../store/local-storage";

const Login = () => {
  const navigate = useNavigate();

  const onLogin = async (event) => {
    event.preventDefault();
    try {
      const user = {
        email: event.target.parentNode.children[1].value,
        password: event.target.parentNode.children[2].value,
      };

      const res = await fetch(login, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify(user),
      });

      const data = await res.json();

      if (!res.ok) alert(data.msg);
      else {
        saveToStorage(ROLE, data.role);
        navigate("/home");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <form className={styles.form}>
        <h1>Login</h1>
        <input type="text" name="email" placeholder="Username" required />
        <input
          type="password"
          name="password"
          placeholder="Password"
          required
        />
        <button onClick={onLogin}>Login</button>
      </form>
    </>
  );
};

export default Login;
