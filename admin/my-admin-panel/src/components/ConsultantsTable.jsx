"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ConsultantsTable = () => {
  const [consultants, setConsultants] = useState([]);
  const [newConsultantName, setNewConsultantName] = useState("");
  const [newConsultantQualification, setNewConsultantQualification] =
    useState("");
  const [newConsultantImage, setNewConsultantImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentConsultant, setCurrentConsultant] = useState(null); // To store the current consultant details for editing

  useEffect(() => {
    const fetchConsultants = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/consultant/getconsultants"
        );
        setConsultants(response.data);
      } catch (error) {
        console.error("Error fetching consultants:", error);
      }
    };

    fetchConsultants();
  }, []);

  const handleImageUpload = (e) => {
    setNewConsultantImage(e.target.files[0]);
  };

  const handleAddConsultant = async () => {
    if (newConsultantName && newConsultantQualification && newConsultantImage) {
      const formData = new FormData();
      formData.append("name", newConsultantName);
      formData.append("qualification", newConsultantQualification);
      formData.append("image", newConsultantImage);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/consultant/addconsultant",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedConsultant = response.data.consultant;

          setConsultants([...consultants, addedConsultant]);
          setNewConsultantName("");
          setNewConsultantQualification("");
          setNewConsultantImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding consultant:", error);
      }
    } else {
      alert("Add the required fields: name, qualification and image");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/consultant/deleteconsultant/${id}`
      );
      setConsultants(consultants.filter((consultant) => consultant._id !== id));
    } catch (error) {
      console.error("Error deleting consultant:", error);
    }
  };

  const handleCancel = () => {
    setCurrentConsultant(null);
    setShowEditForm(false);
    setNewConsultantName("");
    setNewConsultantQualification("");
    setNewConsultantImage(null);
  };

  const handleEdit = (consultant) => {
    setCurrentConsultant(consultant); // Set the current consultant to be edited
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateConsultant = async () => {
    if (currentConsultant) {
      const formData = new FormData();
      formData.append("name", newConsultantName || currentConsultant.name);
      formData.append(
        "qualification",
        newConsultantQualification || currentConsultant.qualification
      );

      // Only append a new image if a new one is selected
      if (newConsultantImage) {
        formData.append("image", newConsultantImage);
      }

      try {
        const response = await axios.put(
          `http://localhost:5000/api/consultant/updateconsultant/${currentConsultant._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedConsultant = response.data.consultant;

          setConsultants(
            consultants.map((consultant) =>
              consultant._id === updatedConsultant._id
                ? updatedConsultant
                : consultant
            )
          );

          setCurrentConsultant(null); // Clear the current consultant state
          setShowEditForm(false); // Hide the edit form
          setNewConsultantName("");
          setNewConsultantQualification("");
          setNewConsultantImage(null);
        }
      } catch (error) {
        console.error("Error updating consultant:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Consultants</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Consultant"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Consultant</h3>
          <input
            type="text"
            placeholder="Consultant Name"
            value={newConsultantName}
            onChange={(e) => setNewConsultantName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Qualification"
            value={newConsultantQualification}
            onChange={(e) => setNewConsultantQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleAddConsultant}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Consultant
          </button>
        </div>
      )}

      {showEditForm && currentConsultant && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Consultant</h3>
          <input
            type="text"
            placeholder={currentConsultant.name}
            value={newConsultantName}
            onChange={(e) => setNewConsultantName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentConsultant.qualification}
            value={newConsultantQualification}
            onChange={(e) => setNewConsultantQualification(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleUpdateConsultant}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Consultant
          </button>
          <button
            onClick={handleCancel}
            className="bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
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
          {consultants.map((consultant) => (
            <tr key={consultant._id}>
              <td className="border px-4 py-2">
                <img
                  src={`/${consultant.image}`}
                  alt={consultant.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{consultant.name}</td>
              <td className="border px-4 py-2">{consultant.qualification}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(consultant)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(consultant._id)}
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

export default ConsultantsTable;
