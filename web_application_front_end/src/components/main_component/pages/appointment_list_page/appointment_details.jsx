import React, { useState, useEffect } from "react";
import Header from "../../../header/header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Accordion from "react-bootstrap/Accordion";

const AppointmentDetails = () => {
  const location = useLocation();
  const [incomingQuizResult, setIncomingQuizResult] = useState([]);

  // Use optional chaining to handle potential undefined values
  const receivedData = location.state;
  // console.log(receivedData);

  useEffect(() => {
    // Fetch the list of pages from the backend
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
      .get(
        `http://127.0.0.1:8000/api/wa/user_appointment_details/${receivedData.id}/`,
        config
      )
      .then((response) => setIncomingQuizResult(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [receivedData.id]);


  const now = incomingQuizResult.score;
  let variant;
  if (now > 50) {
    variant = "success";
  } else if (now > 30) {
    variant = "warning";
  } else {
    variant = "danger";
  }

  // const labelStyle = {
  //   fontSize: "14px",
  //   color: "black",
  // };

  return (
    <React.Fragment>
      <Header nav_text_color="#12086f" />
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between">
          <h2 className="text-secondary">Appointment Details</h2>
        </div>
        <hr />
        <div className="row mb-4 mt-4">
          <div className="col-md-4 mb-4">Sheduled Date : {incomingQuizResult.scheduled_date}</div>
          <div className="col-md-4 mb-4">Sheduled Time : {incomingQuizResult.scheduled_time_period}</div>
          <div className="col-md-4 mb-4">Name : {incomingQuizResult.first_name} {incomingQuizResult.last_name}</div>
          <div className="col-md-4 mb-4">Age : {incomingQuizResult.age}</div>
          <div className="col-md-4 mb-4">
            Depression Level : {incomingQuizResult.dp_level}
          </div>
          <div className="col-md-4 mb-4">
            Response Description : {incomingQuizResult.response_description}
          </div>
        </div>  
        <ProgressBar
          variant={variant}
          now={now}
          label={`Score : ${now}%`}
          style={{ height: "25px", fontSize: "17px" }}
        />

        <Accordion>
          <Accordion.Item eventKey="0" className="mt-4">
            <Accordion.Header>Questions and Answers</Accordion.Header>
            <Accordion.Body></Accordion.Body>
          </Accordion.Item>
        </Accordion>
      </div>
    </React.Fragment>
  );
};

export default AppointmentDetails;
