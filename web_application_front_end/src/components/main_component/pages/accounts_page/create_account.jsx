import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "../../../header/header";
import {useHistory} from 'react-router-dom';

function Create_Account() {
  const history = useHistory();
  const [roles, setRoles] = useState([]);
  const [role, setRole] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async (e) => {
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

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/wa/register/",
        {
          username: username,
          email: email,
          password: password,
          auth_user_type: "admin",
          role: role,
        },
        config
      );

      if (response && response.data) {
        console.log("Signup successful", response.data);
        // localStorage.setItem("access_token", response.access_token);
        // localStorage.setItem("refresh_token", response.refresh_token);
        // history.push('/dashboard');
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      if (error.response && error.response.data) {
        console.error("Authentication failed", error.response.data);
      } else {
        console.error("Unexpected error format:", error);
      }
    }
  };

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

  return (
    <React.Fragment>
      <Header nav_text_color="#12086f" />
      <div className="container-fluid pt-5">
        <div className="container mt-5"><button className="btn btn-primary float-end  px-4" onClick={() => history.push('/all-accounts')}>Edit Accounts</button></div>
        <form className="mx-5 px-5 w-50 mt-5" onSubmit={handleCreateAccount}>
          <h1>Create a new account</h1>
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
              <option value="" disabled hidden>
                {/* Select the Role */}
              </option>
              {roles.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group mt-4">
            <label htmlFor="username" className="mb-1">
              Username
            </label>
            <input
              type="text"
              className="form-control"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="form-group mt-4">
            <label htmlFor="exampleInputEmail1" className="mb-1">
              Email address
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="form-group mt-4">
            <label htmlFor="exampleInputPassword1" className="mb-1">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary mt-3">
            Submit
          </button>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Create_Account;
