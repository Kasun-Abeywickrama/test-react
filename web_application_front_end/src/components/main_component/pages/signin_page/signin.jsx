import React, { useState } from "react";
import axios from "axios";
import Header from "../../../header/header";
import SigninCSS from "./signin.module.css";
import { useHistory } from 'react-router-dom';

function Signin({ handleModal }) {


  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const history = useHistory();

  const handleSignIn = async (e) => {
    e.preventDefault();
  

    try {
      const response = await axios.post("http://127.0.0.1:8000/api/wa/signin/", {
        username: email,
        password: password,
      });

      const { access_token, refresh_token, user } = response.data;

      // Store tokens in localStorage or cookies
      localStorage.setItem('access_token', access_token);
      localStorage.setItem('refresh_token', refresh_token);

      // Check if 'data' property is available in the response
      if (response && response.data) {
        // Handle successful authentication, e.g., redirect to a new page
        console.log("Authentication successful", user); // if you want, you can use response.data intead of user
        handleModal("Sign in", "Sigin successful","e");
        history.push('/dashboard');

      } else {
        console.error("Unexpected response format:", response);
      }

    } catch (error) {
      // Check if 'response' property is available in the error
      if (error.response && error.response.data) {
        // Handle authentication error
        console.error("Authentication failed", error.response.data);
        handleModal("Sign in failed", "Please check your credentials","e");
      } else {
        // Handle other types of errors
        console.error("Unexpected error format:", error);
      }
    }
    
  };
  

  return (
    <React.Fragment>
      <Header nav_text_color="#12086f" />
      {/* <button onClick={() => handleModal("Title","Message")}>On Modal</button> */}
      <div className="container-fluid" style={{ marginTop: "60px" }}>
        <div className="container" style={{ marginTop: "60px" }}>
          <div className="row">
            <div className={`${SigninCSS.hero_image} col`}></div>
            <div className={`${SigninCSS.hero_form_wrapper} col pt-5`}>
              <form className="mx-5 px-3" onSubmit={handleSignIn}>
                <h1 className="text-primary text-center mb-4">Sign in</h1>
                <div className="mb-3">
                  <label htmlFor="exampleInputEmail1" className="form-label">
                    Email address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <div id="emailHelp" className="form-text">
                    We'll never share your email with anyone else.
                  </div>
                </div>
                <div className="mb-3 pt-2">
                  <label htmlFor="exampleInputPassword1" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="exampleInputPassword1"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <div className="row mb-4 mt-2">
                  <div className="col d-flex">
                    <div className="form-check">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        value=""
                        id="form2Example34"
                        defaultChecked  
                      />
                      <label className="form-check-label" htmlFor="form2Example34">
                        {" "}
                        Remember me{" "}
                      </label>
                    </div>
                  </div>

                  <div className="col text-end">
                    <a href="#!">Forgot password?</a>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary w-25 float-end mt-2">
                  Sign in
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Signin;
