import React, { useState, useEffect } from "react";
import Header from "../../../header/header";
import axios from 'axios';
import { useHistory } from 'react-router-dom';


const QuizResultPageList = () => {
    const history = useHistory();


    const [incomingQuizResult, setIncomingQuizResult] = useState([]);

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
          .get("http://localhost:8000/api/wa/result-list/", config)
          .then((response) => setIncomingQuizResult(response.data))
          .catch((error) => console.error("Error fetching data:", error));
      }, []);
    

    return (
        <div>
            <Header nav_text_color="#12086f" />
            <div className="container mt-5 pt-5">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Date</th>
                            <th scope="col">Name</th>
                            <th scope="col">Age</th>
                            <th scope="col">Depression Level</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                        incomingQuizResult.map(item => (
                            <tr key={item.id} onClick={() => history.push('/quiz-result', {id:item.id})}>
                                <td>{item.date}</td>
                                <td>{item.user_name}</td>
                                <td>{item.age}</td>
                                <td>{item.dp_level}</td>
                                <td>{item.is_seen ? "Seen" : "Not Seen"}</td>
                            </tr>
                        )) 
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default QuizResultPageList;