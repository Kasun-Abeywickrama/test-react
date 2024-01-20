import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from "./dashboard.module.css"; // Import the CSS module
import Header from "../../../header/header";
import { NavLink } from 'react-router-dom';
import { useHistory } from 'react-router-dom';

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faUser } from '@fortawesome/free-solid-svg-icons';




const Dashboard = ({ handleModal }) => {

    const history = useHistory();

    const [data, setData] = useState([]);

    useEffect(() => {
        // Retrieve the JWT token from localStorage
        const token = localStorage.getItem('access_token');

        if (!token) {
            // Handle the case where the token is not available (e.g., redirect to login)
            handleModal('Error loading data', 'Please Sign In', 'e')
            console.error('JWT token not found.');
            history.push('/signin');
            return;
        }

        // Include the token in the request headers
        const config = {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        };

        axios.get('http://localhost:8000/api/wa/page/', config)
            .then(response => setData(response.data))
            .catch(error => {
                console.error('Error fetching data:', error);
                console.error('JWT token not found.');
                history.push('/signin');
            });
    }, [ handleModal, history ]);

    return (
        <React.Fragment>
            <Header nav_text_color="#12086f" />
            <div style={{ paddingTop: "60px" }} className={`container-fluid ${styles.page_content}`}>
                <div className="container pt-4" style={{}}>
                    <div className="row">
                        {data.map(item => (
                            <div key={item.id} className="col-12 col-md-6 col-lg-4 ">
                                <div className={`${styles.box_part} text-center`}>
                                    <i className={`fa fa-3x ${item.image}`} aria-hidden="true" ></i>
                                    <div className={styles.title}>
                                        <h4>{item.title}</h4>
                                    </div>
                                    <div className={styles.text}>
                                        <span className={styles.card_text}>
                                            {item.description}
                                        </span >
                                    </div>
                                    <NavLink className={styles.link} to={`/${item.fe_route}`}>Get Started</NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

export default Dashboard;
