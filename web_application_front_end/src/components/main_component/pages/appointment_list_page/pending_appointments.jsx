import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const PendingAppointments = () => {
    const history = useHistory();
    const [pendingAppointments, setPendingAppointments] = useState([]);

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

        axios.get('http://localhost:8000/api/wa/user_pending_appointments/', config)
            .then(response => setPendingAppointments(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
                console.error('JWT token not found.');
            });
    }, []);

    const completeAppointment = async (id) => {
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
                `http://127.0.0.1:8000/api/wa/complete-appointment/${id}/`,
                {
                    is_checked: true,
                },
                config
            );

            if (response && response.data) {
                console.log("Update successful", response.data);
                // Handle success or navigate to another page
                history.push('/appointment-list');
            }
        } catch (error) {
            console.error('Error during data update:', error);
        }
    }

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
                            <th scope="col">Complete</th>
                            <th scope="col">Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingAppointments.map((appointment) => (
                            <tr key={appointment.id}>
                                <td>{appointment.first_name} {appointment.last_name}</td>
                                <td>{appointment.scheduled_date}</td>
                                <td>{appointment.scheduled_time_period}</td>
                                <td>{appointment.dp_level}</td>
                                <td><button className="btn btn-success btn-sm" onClick={() => completeAppointment(appointment.id)}>Complete</button></td>
                                <td className="text-primary" style={{ cursor: 'pointer' }} onClick={() => history.push('/appointment-details', { id: appointment.id })}>view details</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PendingAppointments;
