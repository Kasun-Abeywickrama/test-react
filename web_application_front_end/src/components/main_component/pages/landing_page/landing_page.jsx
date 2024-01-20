import React from "react";
import { Link } from 'react-router-dom';

import Header from "../../../header/header";

import LandingPageCSS from "./landing_page.module.css";

import { useHistory } from "react-router-dom";

// import HeaderCSS from "./header.module.css";

function Landing_page() {

  const history = useHistory();

  const token = localStorage.getItem("access_token");
    if (token) {
      history.push("/dashboard");
    }

  return (
    <React.Fragment>
      <Header nav_text_color="White"/>

      <div className={`${LandingPageCSS.hero_section} container-fluid`}>
        <div className="container h-100 pt-5">
          <div className="row h-100">
            <div className={`${LandingPageCSS.hero_col_1} col-lg-8 mt-5`}>
              <h1 className={`${LandingPageCSS.hero_heading}  mb-4 mt-5`}>Depression Management System</h1>
              <p className={`${LandingPageCSS.hero_text}`}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Adipisci nobis omnis  .
              </p>
              <Link to="/signin">
                <button className={`${LandingPageCSS.sign_in_btn} btn btn-outline-light mt-4`}>Sign in</button>
              </Link>
            </div>
            <div className="col-lg-4 mt-5">
              <div className={`${LandingPageCSS.phone_wrapper}`}>
                  <div className={`${LandingPageCSS.phone_1}`}></div>
                  <div className={`${LandingPageCSS.phone_2}`}></div>
                  {/* <img src="https://bootstrapmade.com/demo/templates/SoftLand/assets/img/phone_1.png" alt=""  />
                  <img src="https://bootstrapmade.com/demo/templates/SoftLand/assets/img/phone_2.png" alt="" /> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default Landing_page;
