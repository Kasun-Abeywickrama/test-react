import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const CompletedAppointments = () => {
    const history = useHistory();


    const [pending_appointments, setPending_Appointments] = useState([]);

    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('access_token');

        if (!token) {
            // Handle the case where the token is not available (e.g., redirect to login)
            console.error('JWT token not found.');
            return;
        }

        // Include the token in the request headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        axios.get('http://localhost:8000/api/wa/user_completed_appointments/', config)
            .then(response => setPending_Appointments(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
                console.error('JWT token not found.');
            });
    }, []);



    return (
        <div className="container mt-4">
            <div className="table-responsive">
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Date</th>
                        <th scope="col">Time</th>
                        <th scope="col">Depression Level</th>
                        <th scope="col">Details</th>
                    </tr>
                </thead>
                <tbody>
                    {pending_appointments.map((appointment) => (
                        <tr key={appointment.id}>
                            <td>{appointment.first_name} {appointment.last_name}</td>
                            <td>{appointment.scheduled_date}</td>
                            <td>{appointment.scheduled_time_period}</td>
                            <td>{appointment.dp_level}</td>
                            <td className="text-primary" style={{ cursor: 'pointer'}} onClick={() => history.push('/appointment-details', {id: appointment.id})}>view details</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        </div>
    )
}

export default CompletedAppointments;