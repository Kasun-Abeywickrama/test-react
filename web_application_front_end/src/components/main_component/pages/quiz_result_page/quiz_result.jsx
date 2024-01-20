import React, { useState, useEffect } from "react";
import Header from "../../../header/header";
import { useLocation } from "react-router-dom";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const QuizResult = () => {

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");


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
        `http://127.0.0.1:8000/api/wa/quiz-result/${receivedData.id}/`,
        config
      )
      .then((response) => setIncomingQuizResult(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, [receivedData.id]);


  const handleApointmentSubmit = async (e) => {
    e.preventDefault();
    handleClose();
    // Sample Axios update function
      try {
        const token = localStorage.getItem("access_token");
        if (!token) {
          throw new Error("JWT token not found.");
        }

        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const response = await axios.put(
          `http://127.0.0.1:8000/api/wa/set-appointment/${incomingQuizResult.id}/`,
          { scheduled_date: date, 
            scheduled_time_period: time,
            is_checked : false,
          },
          config
        );

        console.log('Update successful', response.data);
      } catch (error) {
        console.error('Error during data update:', error);
      }
  }

  //   console.log(incomingQuizResult.length);
  //   console.log(receivedData.id);
  const now = incomingQuizResult.score;
  let variant;
  if (now > 50) {
    variant = "success";
  } else if (now > 30) {
    variant = "warning";
  } else {
    variant = "danger";
  }

  const labelStyle = {
    fontSize: "14px",
    color: "black",
  };

  return (
    <React.Fragment>
      <Header nav_text_color="#12086f" />
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Make an Appointment</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group className="mb-3" controlId="">
                <Form.Label style={labelStyle}>Date</Form.Label>
                <Form.Control type="date" placeholder="Enter the date" onChange={(e) => setDate(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label style={labelStyle}>Time</Form.Label>
                <Form.Control type="time" placeholder="Enter the time" onChange={(e) => setTime(e.target.value)}/>
              </Form.Group>

              <Form.Group className="mb-3" controlId="">
                <Form.Label style={labelStyle}>Select the location</Form.Label>
                <Form.Select aria-label="Default select example">
                  <option>Open this select menu</option>
                  <option value="1">One</option>
                  <option value="2">Two</option>
                  <option value="3">Three</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleApointmentSubmit}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </>
      <div className="container mt-5 pt-5">
        <div className="d-flex justify-content-between">
          <h2 className="text-secondary">Quiz Results</h2>
          <button className="btn btn-primary" onClick={handleShow}>
            Appointment
          </button>
        </div>
        <hr />
        <div className="row mb-4 mt-4">
          <div className="col-md">Date : {incomingQuizResult.date}</div>
          <div className="col-md">Name : {incomingQuizResult.user_name}</div>
          <div className="col-md">Age : {incomingQuizResult.age}</div>
          <div className="col-md">
            Depression Level : {incomingQuizResult.dp_level}
          </div>
          <div className="col-md"></div>
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

export default QuizResult;
