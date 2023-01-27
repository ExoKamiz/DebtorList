import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const api_url = "http://localhost:8080";
const userEmail = localStorage.getItem("user_email");

const Update = () => {
    const [data, setData] = useState({
      firstName: "",
      lastName: "",
      amount: "",
      date: new Date(),
    });
    const [debtor, setDebtors] = useState([]);

    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const url = `${api_url}/api/debtor/${userEmail}/${userId}`;
          const { data: res } = await axios.post(url, { debtorsList: data });
          navigate("/");
          console.log(res.message);
          getDebtors();
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


};
export default Update;