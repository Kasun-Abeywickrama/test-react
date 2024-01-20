import React, {useState} from "react";
import Header from "../../../header/header";
import PendingAppointments from "./pending_appointments";
import CompletedAppointments from "./completed_appointments";



const AppointmentList = () => {

const [isPendingAppointmentsVisible, setIsPendingAppointmentsVisible] = useState(true);
const [isCompletedAppointmentsVisible, setIsCompletedAppointmentsVisible] = useState(false);

const togglePendingAppointments = () => {
  setIsPendingAppointmentsVisible(true);
  setIsCompletedAppointmentsVisible(false);
}
const toggleCompletedAppointments = () => {
  setIsCompletedAppointmentsVisible(true);
  setIsPendingAppointmentsVisible(false);
}

  return (
    <>
      <Header nav_text_color="#12086f" />
      <div className="container mt-5 pt-5">
        <div>

          <input type="radio" class="btn-check" name="options-outlined" id="primary-outlined" autocomplete="off" checked onClick={togglePendingAppointments}/>
          <label class="btn btn-outline-primary me-4" for="primary-outlined">Pending</label>

          <input type="radio" class="btn-check" name="options-outlined" id="success-outlined" autocomplete="off" onClick={toggleCompletedAppointments}/>
          <label class="btn btn-outline-success me-4" for="success-outlined">Completed</label>
        </div>
      </div>
      {isPendingAppointmentsVisible && <PendingAppointments />}
      {isCompletedAppointmentsVisible && <CompletedAppointments />}
    </>
  );
};
export default AppointmentList;
