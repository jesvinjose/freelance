"use client";

import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles

const TreatmentTable = () => {
  const [treatments, setTreatments] = useState([
    { id: 1, name: "Physiotherapy", description: "Treatment for muscle pain." },
    { id: 2, name: "Acupuncture", description: "Ancient Chinese medicine technique." },
    // Add more treatments as needed
  ]);
  const [newTreatmentName, setNewTreatmentName] = useState("");
  const [newTreatmentDescription, setNewTreatmentDescription] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddTreatment = () => {
    if (newTreatmentName && newTreatmentDescription) {
      const newTreatment = {
        id: treatments.length + 1,
        name: newTreatmentName,
        description: newTreatmentDescription,
      };
      setTreatments([...treatments, newTreatment]);
      setNewTreatmentName("");
      setNewTreatmentDescription("");
      setShowAddForm(false);
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
            <th className="border px-4 py-2 text-left">Treatment Name</th>
            <th className="border px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          {treatments.map((treatment) => (
            <tr key={treatment.id}>
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
