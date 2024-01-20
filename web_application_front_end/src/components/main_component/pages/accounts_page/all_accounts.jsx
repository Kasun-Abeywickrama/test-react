import axios from "axios";
import React, {useState, useEffect} from "react";
import Header from "../../../header/header";
import {useHistory} from 'react-router-dom';



const All_Accounts = () => {
    const history = useHistory();

    const [userAccounts, setUserAccounts] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            console.error("JWT token not found.");
            return;
          }
      
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          axios
          .get("http://localhost:8000/api/wa/get_all_accounts/", config)
          .then((response) => setUserAccounts(response.data))
          .catch((error) => console.error("Error fetching data:", error));

    },[]);

    return(
      <>
        <Header nav_text_color="#12086f" /><div className="container mt-5 pt-5">
        <table className="table">
          <thead>
            <tr>
              <th scope="col" >ID</th>
              <th scope="col" >Username</th>
              <th scope="col" >Role</th>
              <th scope="col">Edit / Delete</th>
            </tr>
          </thead>
          <tbody>
            {userAccounts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.username}</td>
                <td>{item.role_name}</td>
                <td><button className="btn btn-primary px-4" onClick={() => history.push("edit-account/", {id: item.id})}>Edit</button> <button className="btn btn-danger">Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </>
    );
}

export default All_Accounts;