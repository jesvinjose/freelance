"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const DutyDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorQualification, setNewDoctorQualification] = useState("");
  const [newDoctorImage, setNewDoctorImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentDutyDoctor, setCurrentDutyDoctor] = useState(null);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/dutydoctor/getdutydoctors"
        );
        console.log(response.data); // Check the structure of the data
        setDoctors(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching duty doctors:", error);
      }
    };

    fetchDoctors();
  }, []);

  const handleImageUpload = (e) => {
    setNewDoctorImage(e.target.files[0]);
  };

  const handleAddDoctor = async () => {
    if (newDoctorName && newDoctorQualification && newDoctorImage) {
      const formData = new FormData();
      formData.append("name", newDoctorName);
      formData.append("qualification", newDoctorQualification);
      formData.append("image", newDoctorImage);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/dutydoctor/adddutydoctor",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedDoctor = response.data.dutydoctor;

          // Update state with the newly added consultant
          setDoctors([...doctors, addedDoctor]);
          setNewDoctorName("");
          setNewDoctorQualification("");
          setNewDoctorImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding dutydoctor:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/dutydoctor/deletedutydoctor/${id}`
      );
      setDoctors(doctors.filter((doctor) => doctor._id !== id));
    } catch (error) {
      console.error("Error deleting dutydoctor:", error);
    }
  };

  const handleCancel = () => {
    setCurrentDutyDoctor(null);
    setShowEditForm(false);
    setNewDoctorName("");
    setNewDoctorQualification("");
    setNewDoctorImage(null);
  };

  const handleEdit = (doctor) => {
    setCurrentDutyDoctor(doctor); // Set the current doctor to be edited
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateDutyDoctor = async () => {
    if (currentDutyDoctor) {
      const formData = new FormData();
      formData.append("name", newDoctorName || currentDutyDoctor.name);
      formData.append(
        "qualification",
        newDoctorQualification || currentDutyDoctor.qualification
      );

      // Only append a new image if a new one is selected
      if (newDoctorImage) {
        formData.append("image", newDoctorImage);
      }

      try {
        const response = await axios.put(
          `http://localhost:5000/api/dutydoctor/updatedutydoctor/${currentDutyDoctor._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedDutyDoctor = response.data.dutydoctor;

          setDoctors(
            doctors.map((doctor) =>
              doctor._id === updatedDutyDoctor._id
                ? updatedDutyDoctor
                : doctor
            )
          );

          setCurrentDutyDoctor(null); // Clear the current consultant state
          setShowEditForm(false); // Hide the edit form
          setNewDoctorName("");
          setNewDoctorQualification("");
          setNewDoctorImage(null);
        }
      } catch (error) {
        console.error("Error updating consultant:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Duty Doctors</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false); // Ensure the Edit form is closed
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Duty Doctor"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Duty Doctor</h3>
          <input
            type="text"
            placeholder="Doctor Name"
            value={newDoctorName}
            onChange={(e) => setNewDoctorName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={newDoctorQualification}
            onChange={(e) => setNewDoctorQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleAddDoctor}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Duty Doctor
          </button>
        </div>
      )}

      
{showEditForm && currentDutyDoctor && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Duty Doctor</h3>
          <input
            type="text"
            placeholder={currentDutyDoctor.name}
            value={newDoctorName}
            onChange={(e) => setNewDoctorName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentDutyDoctor.qualification}
            value={newDoctorQualification}
            onChange={(e) => setNewDoctorQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleUpdateDutyDoctor}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Duty Doctor
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
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Qualification</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor._id}>
              <td className="border px-4 py-2">
                <img
                  // src={doctor.image}
                  src={`/admin-backend/${doctor.image}`} // Ensure this path is correct
                  alt={doctor.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{doctor.name}</td>
              <td className="border px-4 py-2">{doctor.qualification}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(doctor)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(doctor._id)}
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

export default DutyDoctorsTable;
