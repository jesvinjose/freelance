"use client";

import { useState } from "react";

const DutyDoctorsTable = () => {
  const [doctors, setDoctors] = useState([
    {
      id: 1,
      name: "Dr. Alice Williams",
      qualification: "MBBS, Emergency Medicine",
      image: "/images/alice_williams.jpg", // Example image path
    },
    {
      id: 2,
      name: "Dr. Bob Johnson",
      qualification: "MD, Critical Care",
      image: "/images/bob_johnson.jpg", // Example image path
    },
    // Add more duty doctors as needed
  ]);

  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorQualification, setNewDoctorQualification] = useState("");
  const [newDoctorImage, setNewDoctorImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  const handleImageUpload = (e) => {
    setNewDoctorImage(e.target.files[0]);
  };

  const handleAddDoctor = () => {
    if (newDoctorName && newDoctorQualification && newDoctorImage) {
      const newDoctor = {
        id: doctors.length + 1,
        name: newDoctorName,
        qualification: newDoctorQualification,
        image: URL.createObjectURL(newDoctorImage),
      };
      setDoctors([...doctors, newDoctor]);
      setNewDoctorName("");
      setNewDoctorQualification("");
      setNewDoctorImage(null);
      setShowAddForm(false);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Duty Doctors</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
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

      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border px-4 py-2 text-left">Image</th>
            <th className="border px-4 py-2 text-left">Name</th>
            <th className="border px-4 py-2 text-left">Qualification</th>
          </tr>
        </thead>
        <tbody>
          {doctors.map((doctor) => (
            <tr key={doctor.id}>
              <td className="border px-4 py-2">
                <img
                  src={doctor.image}
                  alt={doctor.name}
                  className="h-16 w-16 object-cover rounded-full"
                />
              </td>
              <td className="border px-4 py-2">{doctor.name}</td>
              <td className="border px-4 py-2">{doctor.qualification}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutyDoctorsTable;
