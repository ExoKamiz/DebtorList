import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
const api_url = "http://localhost:8080";
const userEmail = localStorage.getItem("user_email");



const MyDebtors = () => {
  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    amount: "",
    date: new Date(),
  });
  const [debtors, setDebtors] = useState([]);

  function DebtorDetails(props) {
    const [isEdit, setIsEdit] = useState(false);
    const [data, setData] = useState({
      id: props.id,
      firstName: props.firstName,
      lastName: props.lastName,
      amount: props.amount,
      date: props.date,
    });
    const [error, setError] = useState("");
    const handleChange = ({ currentTarget: input }) => {
      setData({ ...data, [input.name]: input.value });
    };
  
    const handleSubmit = async (e) => {
      try {
        const id = data.id;
        console.log(id)
  
        const url = `${api_url}/api/debtor/${userEmail}/update/${id}`;
        const { data: res } = await axios.put(url, data );
        console.log(res.message);
        setIsEdit(false);
        
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
  
    const handleDelete = async (e) => {
      try {
        const id = data.id;
        console.log(id)
  
        const url = `${api_url}/api/debtor/${userEmail}/delete/${id}`;
        const { data: res } = await axios.delete(url);
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
  
    return (<>
            <td>{isEdit ? 
              (<button onClick={handleSubmit}>SAVE</button>) 
              :
              (<button onClick={() => {setIsEdit(true)}}>EDIT</button>)}
            </td>
  
            <td>{isEdit ? (<input
              type="text"
              name="firstName"
              value={data.firstName}
              onChange={handleChange}
              required>
            </input>) 
            : (props.firstName)}</td>
  
            <td>{isEdit ? (<input
              type="text"
              name="lastName"
              value={data.lastName}
              onChange={handleChange}
              required>
            </input>) 
              :(props.lastName)}</td> 
  
            <td>{isEdit ? (<input
              type="number"
              name="amount"
              value={data.amount}
              onChange={handleChange}
              required>
            </input>) 
             :(props.amount)}</td> 
            <td>{isEdit ? (<input
              type="date"
              name="date"
              value={data.date}
              onChange={handleChange}
              required>
            </input>) 
              :props.date}</td>
            <td><button onClick={handleDelete}>Delete</button></td>
            </> 
      );
  };

  const getDebtors = useCallback(async () => {
    try {
        const url = `${api_url}/api/debtor/${userEmail}`;
        let res = await axios.get(url);
        setDebtors(res.data.debtors)
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          setError(error.response.data.message);
        }
      }
  }, [])
  useEffect(()=>{
    getDebtors();
  },[getDebtors])
  console.log(debtors);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${api_url}/api/debtor/${userEmail}`;
      const { data: res } = await axios.post(url, { debtorsList: data });
      navigate("/");
      console.log(res.message);
      getDebtors();
      setData({
        firstName: "",
        lastName: "",
        amount: "",
        date: new Date(),
      });
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
    <div className={styles.signup_container}>
      <div className={styles.signup_form_container}>
        <div className={styles.right}>
          <form className={styles.form_container} onSubmit={handleSubmit}>
            <h1>List of my debtors</h1>
            <input
              type="text"
              placeholder="First Name"
              name="firstName"
              onChange={handleChange}
              value={data.firstName}
              required
              className={styles.input}
            />
            <input
              type="text"
              placeholder="Last Name"
              name="lastName"
              onChange={handleChange}
              value={data.lastName}
              required
              className={styles.input}
            />
            <input
              type="number"
              placeholder="Amount"
              name="amount"
              onChange={handleChange}
              value={data.amount}
              required
              className={styles.input}
            />
            <input
              type="date"
              placeholder="Date"
              name="date"
              onChange={handleChange}
              value={data.date}
              required
              className={styles.input}
            />
            {error && <div className={styles.error_msg}>{error}</div>}
            <button type="submit" className={styles.green_btn}>
              Add debtor
            </button>
          </form>
        </div >
        <div className="container">
          <table className="table table-bordered">  
              <tr>  
                  <th></th> 
                  <th>Name</th>  
                  <th>Last name</th>  
                  <th>Amount</th>  
                  <th>Data</th>  
              </tr>  
      
              {debtors.map((debtor, index) => {
                return (
                  <tr key={index}>
                    <DebtorDetails 
                      id = {debtor._id}
                      lastName={debtor.lastName}
                      firstName={debtor.firstName}
                      amount={debtor.amount}
                      date={debtor.date}/>
                </tr>)
                })}
    
          </table>  
        </div>
        

        
      </div>
      <div></div>
    </div>
  );
};
export default MyDebtors;
