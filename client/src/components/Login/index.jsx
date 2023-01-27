import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styles from "./styles.module.css"

const api_url = "http://localhost:8080";

const Login = () => {
  const [data, setData] = useState({ email: "", password: "" });

  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${api_url}/api/auth`;
      const { data: res } = await axios.post(url, data);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user_email", res.data.email);

      window.location = "/";
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  return (
    <div className={styles.singup_box}>

      <form className={styles.form_container}
        onSubmit={handleSubmit}>

        <h1>Login to Your Account</h1>
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          value={data.email}
          required
          className={styles.input}
        />

        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />

        {error && <div
          className={styles.error_msg}>{error}</div>}

        <button type="submit"
          className={styles.btn}>
          Sing In
        </button>
      </form>

    </div>
  );
};

export default Login;
