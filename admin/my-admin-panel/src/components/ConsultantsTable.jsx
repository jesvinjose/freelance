"use client";

import { useState } from "react";
import axios from "axios";

const ConsultantsTable = () => {
  const [consultants, setConsultants] = useState([
    {
      id: 1,
      name: "Dr. Sarah Smith",
      qualification: "MD, Dermatology",
      image: "/images/sarah_smith.jpg", // Example image path
    },
    {
      id: 2,
      name: "Dr. John Doe",
      qualification: "MBBS, General Physician",
      image: "/images/john_doe.jpg", // Example image path
    },
    // Add more consultants as needed
  ]);

  const [newConsultantName, setNewConsultantName] = useState("");
  const [newConsultantQualification, setNewConsultantQualification] =
    useState("");
  const [newConsultantImage, setNewConsultantImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

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
        const response = await axios.post("http://localhost:5000/api/consultant/addconsultant", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

        if (response.status === 201) {
          const addedConsultant = response.data.consultant;

          // Update state with the newly added consultant
          setConsultants([...consultants, addedConsultant]);
          setNewConsultantName("");
          setNewConsultantQualification("");
          setNewConsultantImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding consultant:", error);
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

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Qualification</th>
          </tr>
        </thead>
        <tbody>
          {consultants.map((consultant) => (
            <tr key={consultant.id}>
              <td className="border px-4 py-2">
                <img
                  //   src={consultant.image}
                  src={`/${consultant.image}`} // Update to dynamically use the image path
                  alt={consultant.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{consultant.name}</td>
              <td className="border px-4 py-2">{consultant.qualification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultantsTable;
