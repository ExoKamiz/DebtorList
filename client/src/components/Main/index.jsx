import styles from "./styles.module.css";
import React from "react";
import { Link } from 'react-router-dom';

const DebtorsList = () => {
    const token = localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("email");
        window.location.reload();
    };

    return (
        <div className={styles.menu}>
            <div className="Bigcontainer">
                <nav className={styles.navbar}>
                    <Link to="/"><h1>List of my debtors</h1></Link>

                    {token && (
                        
                        <button className={styles.link} onClick={handleLogout}>
                            Logout
                        </button>
                    )}
                    {!token && (
                        <ul>
                            <li className={styles.link}>
                                <Link to="/login">Login</Link>
                            </li>

                            <li className={styles.link}>
                                <Link to="/signup">Sign up</Link>
                            </li>
                        </ul>
                    )}

                </nav>
            </div>
        </div>
    );
};

export default DebtorsList;