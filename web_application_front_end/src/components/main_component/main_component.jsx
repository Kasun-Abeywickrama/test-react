import React, { useState } from "react";
import LandingPage from "./pages/landing_page/landing_page";
import Signin from "./pages/signin_page/signin";
import Dashboard from "./pages/dashboard_page/dashboard";
// import CreateAccount from "./pages/accounts_page/create_account";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
// import Logout from "./pages/Logout_page/logout";
import Role from "./pages/role_page/role";
import { Modal } from "react-bootstrap";
// import QuizResultPageList from "./pages/quiz_result_page_list/quiz_result_page";
// import QuizResultPage from "./pages/quiz_result_page/quiz_result";
// import AppointmentList from "./pages/appointment_list_page/appointment_list";
// import AppointmentDetails from "./pages/appointment_list_page/appointment_details";
// import EditAccount from "./pages/accounts_page/edit_account";
// import AllAccounts from "./pages/accounts_page/all_accounts";

const MainComponent = () => {
  const [showModal, setShowModal] = useState(false);
  const [modal_title, setModalTitle] = useState("");
  const [modal_message, setModalMessage] = useState("");

  const handleModal = (title, message, type) => {
    setShowModal(!showModal);
    setModalTitle(title);
    setModalMessage(message);
    if (type === "e") {
      setShowModal(!showModal);
      setModalTitle(title);
      setModalMessage(message);
    }
    setTimeout(() => {
      setShowModal(false);
    } , 2000);
  };

  return (
    <React.Fragment>
      <Modal show={showModal} onHide={handleModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modal_title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{modal_message}</p>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-primary w-25"
            onClick={() => {
              setShowModal(!showModal);
            }}
          >
            Ok
          </button>
        </Modal.Footer>
      </Modal>
      <Router>
        <Switch>
        {/* <Route path="/all-accounts">
             <AllAccounts />
          </Route>
        <Route path="/edit-account">
            <EditAccount />
          </Route>
        <Route path="/appointment-details">
            <AppointmentDetails />
          </Route>
          <Route path="/appointment-list">
            <AppointmentList />
          </Route>
          <Route path="/quiz-result">
            <QuizResultPage />
          </Route>
          <Route path="/quiz-result-list">
            <QuizResultPageList />
          </Route> */}
          <Route path="/role">
            <Role />
          </Route>
          {/* <Route path="/logout">
            <Logout />
          </Route> */}
          <Route path="/signin">
            <Signin handleModal={handleModal} />
          </Route>
          <Route path="/dashboard">
            <Dashboard handleModal={handleModal} />
          </Route>
          {/* <Route path="/account">
            <CreateAccount />
          </Route> */}
          <Route path="/">
            <LandingPage />
          </Route>
        </Switch>
      </Router>
    </React.Fragment>
  );
};

export default MainComponent;
