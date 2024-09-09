"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const TreatmentTable = () => {
  const [treatments, setTreatments] = useState([]);
  const [newTreatmentName, setNewTreatmentName] = useState("");
  const [newTreatmentDescription, setNewTreatmentDescription] = useState("");
  const [newTreatmentImage, setNewTreatmentImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchTreatments = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/treatment/gettreatments"
        );
        setTreatments(response.data);
      } catch (error) {
        console.error("Error fetching treatments:", error);
      }
    };

    fetchTreatments();
  }, []);

  const handleImageUpload = (e) => {
    setNewTreatmentImage(e.target.files[0]);
  };

  const handleAddTreatment = async () => {
    // setShowEditForm(false);
    if (newTreatmentName && newTreatmentDescription && newTreatmentImage) {
      const formData = new FormData();
      formData.append("name", newTreatmentName);
      formData.append("description", newTreatmentDescription);
      formData.append("image", newTreatmentImage);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/treatment/addtreatment",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedTreatment = response.data.treatment;

          setTreatments([...treatments, addedTreatment]);
          setNewTreatmentName("");
          setNewTreatmentDescription("");
          setNewTreatmentImage(null);
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding treatment:", error);
      }
    } else {
      alert("Add the required fields: name, description and image");
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Treatments</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Treatment"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Treatment</h3>
          <input
            type="text"
            placeholder="Treatment Name"
            value={newTreatmentName}
            onChange={(e) => setNewTreatmentName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <ReactQuill
            value={newTreatmentDescription}
            onChange={setNewTreatmentDescription}
            className="mb-4"
            placeholder="Enter treatment description..."
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleAddTreatment}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Treatment
          </button>
        </div>
      )}

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Treatment Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment) => (
            <tr key={treatment._id}>
              <td className="border px-4 py-2">
                <img
                  src={`/${treatment.image}`}
                  alt={treatment.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{treatment.name}</td>
              <td
                className="border px-4 py-2"
                dangerouslySetInnerHTML={{ __html: treatment.description }}
              />
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TreatmentTable;
