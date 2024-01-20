import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../header/header";
import {useHistory} from 'react-router-dom';
import { useLocation } from "react-router-dom/cjs/react-router-dom.min";

function Edit_Account() {

  const location = useLocation();

  const receivedData = location.state;

  const [roles, setRoles] = useState([]);
  const history = useHistory();
  const [userDetails, setUserDetails] = useState([]);
  const [role, setRole] = useState("");


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
      .get("http://localhost:8000/api/wa/roles/", config)
      .then((response) => setRoles(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);
  
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
      .get(`http://localhost:8000/api/wa/get_user_account_details/${receivedData.id}/`, config)
      .then((response) => setUserDetails(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [ receivedData.id ]);

  const handleEditAccount = async (e) => {
    e.preventDefault();
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
    console.log(role);
    await axios.put(`http://localhost:8000/api/wa/update_user_account_details/${receivedData.id}/`, {
      role: role
    }, config)

    history.push("/all-accounts");
  }

  return (
    <React.Fragment>
      <Header nav_text_color="#12086f" />
      <div className="container-fluid pt-5">
        <div className="row">
            <div className="col-md-6">
            <form className="mx-5 px-5 w-100 mt-5">
          <h1>Edit Account</h1>
          <hr></hr>
          <div className="form-group mt-4">
            <label htmlFor="role" className="mb-1">
              Role
            </label>
            <select
              className="form-select"
              aria-label="Default select example"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value={userDetails.role} hidden>
                {userDetails.role_name}
              </option>
              {roles.map((item) => (
                <option key={item.id} value={item.id}>
                  { item.name }
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary mt-3" onClick={handleEditAccount}>
            Update
          </button>
          <button type="reset" className="btn btn-secondary mt-3 ms-3">Cancel</button>
        </form>
            </div>
            <div className="col-md-6">
               
            </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Edit_Account;
