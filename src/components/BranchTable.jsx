"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import ImageHelper from "../services/helper";
import MapboxComponent from "../components/MapLocation";

const BranchTable = () => {
  const [branch, setBranch] = useState([]);
  const [newBranch, setNewBranch] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [newBranchImage, setNewBranchImage] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [currentBranch, setCurrentBranch] = useState(null);
  const [location, setLocation] = useState({ latitude: null, longitude: null });

  useEffect(() => {
    const fetchBranch = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/branch/getbranch"
        );
        setBranch(response.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };

    fetchBranch();
  }, []);

  const handleImageUpload = (e) => {
    setNewBranchImage(e.target.files[0]);
  };

  const handleAddBranch = async () => {
    if (newBranch && newMobile && newBranchImage && location.latitude && location.longitude) {
      const formData = new FormData();
      formData.append("place", newBranch);
      formData.append("mobile", newMobile);
      formData.append("image", newBranchImage);
      formData.append("latitude", location.latitude);
      formData.append("longitude", location.longitude);

      try {
        const response = await axios.post(
          "http://localhost:5000/api/branch/addbranch",
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 201) {
          const addedBranch = response.data.branch;
          setBranch([...branch, addedBranch]);
          setNewBranch("");
          setNewMobile("");
          setNewBranchImage(null);
          setLocation({ latitude: null, longitude: null });
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding branch:", error);
      }
    } else {
      alert("Please fill in all required fields.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/branch/deletebranch/${id}`);
      setBranch(branch.filter((b) => b._id !== id));
    } catch (error) {
      console.error("Error deleting branch:", error);
    }
  };

  const handleEdit = (branch) => {
    setCurrentBranch(branch);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  const handleUpdateBranch = async () => {
    if (currentBranch) {
      const formData = new FormData();
      formData.append("place", newBranch || currentBranch.place);
      formData.append("mobile", newMobile || currentBranch.mobile);
      if (newBranchImage) {
        formData.append("image", newBranchImage);
      }

      try {
        const response = await axios.put(
          `http://localhost:5000/api/branch/updatebranch/${currentBranch._id}`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
          }
        );

        if (response.status === 200) {
          const updatedBranch = response.data.branch;
          setBranch(
            branch.map((b) => (b._id === updatedBranch._id ? updatedBranch : b))
          );
          setCurrentBranch(null);
          setShowEditForm(false);
          setNewBranch("");
          setNewMobile("");
          setNewBranchImage(null);
        }
      } catch (error) {
        console.error("Error updating branch:", error);
      }
    }
  };

  const handleCancel = () => {
    setCurrentBranch(null);
    setShowEditForm(false);
    setNewBranch("");
    setNewMobile("");
    setNewBranchImage(null);
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Branch</h2>
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Branch"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Branch</h3>
          <input
            type="text"
            placeholder="Branch Name"
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Mobile Number"
            value={newMobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setNewMobile(value);
              }
            }}
            className="border p-2 w-full mb-4"
            inputMode="numeric"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
         
          <button
            onClick={handleAddBranch}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Branch
          </button>
        </div>
      )}

      {showEditForm && currentBranch && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Branch</h3>
          <input
            type="text"
            placeholder={currentBranch.place}
            value={newBranch}
            onChange={(e) => setNewBranch(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentBranch.mobile}
            value={newMobile}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, "");
              if (value.length <= 10) {
                setNewMobile(value);
              }
            }}
            className="border p-2 w-full mb-4"
          />
          <input
            type="file"
            onChange={handleImageUpload}
            className="border p-2 w-full mb-4"
            accept="image/*"
          />
          <button
            onClick={handleUpdateBranch}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Branch
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
            <th className="border px-4 py-2 text-left">Branch Name</th>
            <th className="border px-4 py-2 text-left">Mobile Number</th>
            <th className="border px-4 py-2 text-left">Location</th>
            <th className="border px-4 py-2 text-left">Action</th>
          </tr>
        </thead>
        <tbody>
          {branch.map((b) => (
            <tr key={b._id}>
              <td width="100px" className="border px-4 py-2">
                <ImageHelper size="200px" image={b.image} />
              </td>
              <td width="300px" className="border px-4 py-2">{b.place}</td>
              <td width="200px" className="border px-4 py-2">{b.mobile}</td>
              <td className="border px-4 py-2">{b.latitude}, {b.longitude}</td>
              <td width="150px" className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(b)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(b._id)}
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

export default BranchTable;
