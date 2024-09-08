"use client";

import { useState,useEffect  } from "react";
import axios from "axios";

const DutyDoctorsTable = () => {
  const [doctors, setDoctors] = useState([]);
  const [newDoctorName, setNewDoctorName] = useState("");
  const [newDoctorQualification, setNewDoctorQualification] = useState("");
  const [newDoctorImage, setNewDoctorImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/dutydoctor/getdutydoctors");
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

  const handleAddDoctor =async () => {
    if (newDoctorName && newDoctorQualification && newDoctorImage) {
      const formData = new FormData();
      formData.append("name", newDoctorName);
      formData.append("qualification", newDoctorQualification);
      formData.append("image", newDoctorImage);

      try {
        const response = await axios.post("http://localhost:5000/api/dutydoctor/adddutydoctor", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });

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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DutyDoctorsTable;
