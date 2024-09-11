"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ApplicationsTable = () => {
  const [applications, setApplications] = useState([]);
  const [designations, setDesignations] = useState([]);
  const [newName, setNewName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newResume, setNewResume] = useState(null);
  const [newDesignation, setNewDesignation] = useState(""); // State for new designation
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentApplication, setCurrentApplication] = useState(null);

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/application/getapplications"
        );
        setApplications(response.data);
      } catch (error) {
        console.error("Error fetching applications:", error);
      }
    };

    const fetchDesignations = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/job/getjobs"
        );
        setDesignations(response.data); // Assuming response.data contains the list of jobs
      } catch (error) {
        console.error("Error fetching designations:", error);
      }
    };

    fetchApplications();
    fetchDesignations();
  }, []);

  const handleAddApplication = async () => {
    if (newName && newEmail && newMobile && newResume && newDesignation) {
      const formData = new FormData();
      formData.append("name", newName);
      formData.append("email", newEmail);
      formData.append("mobile", newMobile);
      formData.append("resume", newResume);
      formData.append("designation", newDesignation); // Add designation ID

      try {
        const response = await axios.post(
          "http://localhost:5000/api/application/addapplication",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedApplication = response.data.application;
          setApplications([...applications, addedApplication]);
          setNewName("");
          setNewEmail("");
          setNewMobile("");
          setNewResume(null);
          setNewDesignation(""); // Reset designation
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding application:", error);
      }
    }
  };

  const handleEdit = (application) => {
    setCurrentApplication(application); // Set the current application to be edited
    setShowEditForm(true); // Show the edit form
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/application/deleteApplication/${id}`
      );
      setApplications(applications.filter((app) => app._id !== id));
    } catch (error) {
      console.error("Error deleting application:", error);
    }
  };

  const handleCancel = () => {
    setCurrentApplication(null);
    setShowEditForm(false);
    setNewName("");
    setNewEmail("");
    setNewMobile("");
    setNewDesignation(""); // Reset designation
  };

  const handleUpdateApplication = async () => {
    if (currentApplication) {
      const applicationData = {
        name: newName || currentApplication.name,
        email: newEmail || currentApplication.email,
        mobile: newMobile || currentApplication.mobile,
        designation: newDesignation || currentApplication.designation, // Update designation
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/api/applications/updateApplication/${currentApplication._id}`,
          applicationData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const updatedApplication = response.data.application;
          setApplications(
            applications.map((app) =>
              app._id === updatedApplication._id ? updatedApplication : app
            )
          );

          setCurrentApplication(null); // Clear the current application state
          setShowEditForm(false); // Hide the edit form
          setNewName("");
          setNewEmail("");
          setNewMobile("");
          setNewDesignation(""); // Reset designation
        }
      } catch (error) {
        console.error("Error updating application:", error);
      }
    }
  };

  const handleDownloadResume = (resumePath) => {
    const url = `http://localhost:5000/${resumePath}`;
    window.open(url, "_blank");
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold mb-4">Applications</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false); // Ensure the Edit form is closed
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Application"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Application</h3>
          <input
            type="text"
            placeholder="Name"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="email"
            placeholder="Email"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Mobile"
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.title} {/* Assuming designation object has a `title` */}
              </option>
            ))}
          </select>
          <input
            type="file"
            onChange={(e) => setNewResume(e.target.files[0])}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleAddApplication}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Application
          </button>
        </div>
      )}

      {showEditForm && currentApplication && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Application</h3>
          <input
            type="text"
            placeholder={currentApplication.name}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentApplication.email}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentApplication.mobile}
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <select
            value={newDesignation}
            onChange={(e) => setNewDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          >
            <option value="">Select Designation</option>
            {designations.map((designation) => (
              <option key={designation._id} value={designation._id}>
                {designation.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleUpdateApplication}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Application
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 my-2 sm:my-0 sm:ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border">
          <thead>
            <tr>
              <th className="border p-2">Name</th>
              <th className="border p-2">Email</th>
              <th className="border p-2">Mobile</th>
              <th className="border p-2">Resume</th>
              <th className="border p-2">Designation</th>
              <th className="border p-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => (
              <tr key={application._id}>
                <td className="border p-2">{application.name}</td>
                <td className="border p-2">{application.email}</td>
                <td className="border p-2">{application.mobile}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleDownloadResume(application.resume)}
                    className="bg-indigo-600 text-white px-2 py-1 rounded-md hover:bg-indigo-700"
                  >
                    Download Resume
                  </button>
                </td>
                <td className="border p-2">{application.designation.title}</td>
                <td className="border p-2">
                  <button
                    onClick={() => handleEdit(application)}
                    className="bg-yellow-600 text-white px-2 py-1 rounded-md hover:bg-yellow-700 mr-2"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(application._id)}
                    className="bg-red-600 text-white px-2 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ApplicationsTable;
