import React, { useState, useEffect } from "react";
import axios from 'axios';
import Header from "../../../header/header";

const Role = () => {
  const [allpages, setAllPages] = useState([]);
  const [name, setName] = useState('');
  const [selectedPages, setSelectedPages] = useState([]);

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
      .get("http://localhost:8000/api/wa/page/", config)
      .then((response) => setAllPages(response.data))
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  // Function to handle checkbox changes
  const handleCheckboxChange = (pageId, permissionType) => {
    const existingPage = selectedPages.find(page => page.id === pageId);
    
    if (existingPage) {
      existingPage[permissionType] = !existingPage[permissionType];
      setSelectedPages([...selectedPages]);
    } else {
      const newPage = {
        id: pageId,
        create: false,
        read: false,
        update: false,
        delete: false,
      };
      newPage[permissionType] = true;
      setSelectedPages([...selectedPages, newPage]);
    }
  };

  // Function to handle form submission
  const handlePermissions = async (e) => {
    e.preventDefault();

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

    try {
      // Send the data to the backend API
      const response = await axios.post("http://127.0.0.1:8000/api/wa/role/", {
        name: name,
        pages: selectedPages
      }, config);

      if (response && response.data) {
        console.log("Permissions added", response.data);
        // Handle success or navigate to another page
      } else {
        console.error("Unexpected response format:", response);
      }
    } catch (error) {
      console.error("Error", error);
      // Handle error and show user feedback
    }
  };

  return (
    <>
      <Header nav_text_color="#12086f" />
      <div className="container-fluid mt-5 py-4">
        <form className="mx-5 px-5 w-50 mt-5" onSubmit={handlePermissions}>
          <h2 className="mb-4">Add New Role</h2>
          <hr />
          <div className="mb-3">
            <label htmlFor="name" className="form-label">Role Name</label>
            <input type="text" className="form-control" id="name" name="name" onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="mb-3">
            <label className="form-label mb-3 mt-3">Permissions</label>
            <div className="row">
              {allpages.map((page) => (
                <div key={page.id} className="col-md-3">
                  <h6 className="ps-4">{page.title}</h6>
                  {['read', 'create', 'update', 'delete'].map(permissionType => (
                    <div key={permissionType}>
                      <input 
                        type="checkbox" 
                        checked={selectedPages.some(p => p.id === page.id && p[permissionType])}
                        onChange={() => handleCheckboxChange(page.id, permissionType)}
                      />
                      <label className="ps-2">{permissionType}</label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>                     
      </div>
    </>
  );
};

export default Role;
