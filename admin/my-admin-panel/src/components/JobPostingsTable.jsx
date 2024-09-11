"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const JobPostingsTable = () => {
  const [jobs, setJobs] = useState([]);
  const [newJobDesignation, setNewJobDesignation] = useState("");
  const [newJobVacancies, setNewJobVacancies] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentJob, setCurrentJob] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/job/getjobs"
        );
        console.log(response.data); // Check the structure of the data
        setJobs(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching jobs:", error);
      }
    };

    fetchJobs();
  }, []);

  const handleAddJob = async () => {
    if (newJobDesignation && newJobVacancies) {
      // Create a JSON object for the data
      const jobData = {
        designation: newJobDesignation,
        jobvacancies: newJobVacancies,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/job/addjob",
          jobData, // Send the JSON object instead of FormData
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201) {
          const addedJob = response.data.job;

          // Update state with the newly added consultant
          setJobs([...jobs, addedJob]);
          setNewJobDesignation("");
          setNewJobVacancies("");
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding job:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/job/deletejob/${id}`);
      setJobs(jobs.filter((job) => job._id !== id));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  const handleCancel = () => {
    setCurrentJob(null);
    setShowEditForm(false);
    setNewJobDesignation("");
    setNewJobVacancies("");
  };

  const handleEdit = (job) => {
    setCurrentJob(job); // Set the current doctor to be edited
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateJob = async () => {
    if (currentJob) {
       // Create a JSON object for the data
       const jobData = {
        designation: newJobDesignation||currentJob.designation,
        jobvacancies: newJobVacancies||currentJob.jobvacancies,
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/api/job/updatejob/${currentJob._id}`,
          jobData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const updatedJob = response.data.job;

          setJobs(
            jobs.map((job) => (job._id === updatedJob._id ? updatedJob : job))
          );

          setCurrentJob(null); // Clear the current job state
          setShowEditForm(false); // Hide the edit form
          setNewJobDesignation("");
          setNewJobVacancies("");
        }
      } catch (error) {
        console.error("Error updating job:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Jobs</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false); // Ensure the Edit form is closed
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Job"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Job</h3>
          <input
            type="text"
            placeholder="Job Designation"
            value={newJobDesignation}
            onChange={(e) => setNewJobDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Job Vacancies"
            value={newJobVacancies}
            onChange={(e) => setNewJobVacancies(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleAddJob}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Job
          </button>
        </div>
      )}

      {showEditForm && currentJob && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Job</h3>
          <input
            type="text"
            placeholder={currentJob.designation}
            value={newJobDesignation}
            onChange={(e) => setNewJobDesignation(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentJob.jobvacancies}
            value={newJobVacancies}
            onChange={(e) => setNewJobVacancies(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdateJob}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Job
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 my-2 sm:my-0 sm:ml-4"
          >
            Cancel
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Designation</th>
            <th className="border px-4 py-2 text-left">Number of Vacancies</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.map((job) => (
            <tr key={job._id}>
              <td className="border px-4 py-2">{job.designation}</td>
              <td className="border px-4 py-2">{job.jobvacancies}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(job)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(job._id)}
                  className="bg-red-500 text-white px-2 py-1 rounded-md hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default JobPostingsTable;
