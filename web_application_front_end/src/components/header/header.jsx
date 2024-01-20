import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import HeaderCSS from "./header.module.css";


function Header(props) {

  const [isAuth, setIsAuth] = useState(false);
  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
  }, [isAuth]);

  return (
    <React.Fragment>
      <div className="container-fluid">
        <nav
          className={`${HeaderCSS.nav_bar} container navbar navbar-expand-lg bg-body-tertiary fixed-top`}
        >
          <div className="container-fluid">
            <NavLink
              exact
              to="/"
              className="navbar-brand fs-3"
              style={{ color: props.nav_text_color }}
            >
              MindCare
            </NavLink>
            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>
            <div
              className="collapse navbar-collapse justify-content-end"
              id="navbarNav"
            >
              <ul className="navbar-nav nav nav-underline">
                <li className="nav-item ms-4">
                  <NavLink
                    exact
                    to="/"
                    className="nav-link"
                    style={{ color: props.nav_text_color }}
                    activeClassName={HeaderCSS.activeLink}
                  >
                    Home
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink
                    to="/appointment-list"
                    className="nav-link"
                    style={{ color: props.nav_text_color }}
                    activeClassName={HeaderCSS.activeLink}
                  >
                    Appointments
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  <NavLink
                    to="/dashboard"
                    className="nav-link"
                    style={{ color: props.nav_text_color }}
                    activeClassName={HeaderCSS.activeLink}
                  >
                    Dashboard
                  </NavLink>
                </li>
                <li className="nav-item ms-4">
                  {isAuth ? (
                    <NavLink
                      to="/logout"
                      className="nav-link"
                      style={{ color: props.nav_text_color }}
                      activeClassName={HeaderCSS.activeLink}
                    >
                      Logout
                    </NavLink>
                  ) : (
                    <NavLink
                      to="/Signin"
                      className="nav-link"
                      style={{ color: props.nav_text_color }}
                      activeClassName={HeaderCSS.activeLink}
                    >
                      Sign in
                    </NavLink>
                  )}
                </li>
              </ul>
            </div>
          </div>
      
        </nav>
      </div>
    </React.Fragment>
  );
}

export default Header;
