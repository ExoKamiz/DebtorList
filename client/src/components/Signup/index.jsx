import { useState } from "react"
import axios from "axios"
import { Link, useNavigate } from "react-router-dom"
import styles from "./styles.module.css"

const api_url = "http://localhost:8080";
const Signup = () => {
    const [data, setData] = useState({
        nickName: "",
        email: "",
        password: "",
        debtorsList: [],
    })

    const [error, setError] = useState("")
    const navigate = useNavigate()

    const handleChange = ({ currentTarget: input }) => {
        setData({ ...data, [input.name]: input.value })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const url = `${api_url}/api/users`
            const { data: res } = await axios.post(url, data)
            navigate("/login")
            console.log(res.message)
        } catch (error) {
            if (
                error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500
            ) {
                setError(error.response.data.message)
            }
        }
    }

    return (
        <div className={styles.singup_box}>
            <form className={styles.form_container} onSubmit={handleSubmit}>
                <h1>Create Account</h1>

                <input
                    type="text"
                    placeholder="Nick Name"
                    name="nickName"
                    onChange={handleChange}
                    value={data.nickName}
                    required
                    className={styles.input}
                />

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

                {error && <div className={styles.error_msg}>{error}</div>}
                <button type="submit"
                    className={styles.btn}>
                    Sign Up
                </button>
            </form>

        </div>
    );
};
export default Signup