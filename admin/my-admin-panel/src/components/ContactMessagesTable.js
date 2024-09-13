"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const ContactMessagesTable = () => {
  const [contactmessages, setContactMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newMobile, setNewMobile] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);

  const [showEditForm, setShowEditForm] = useState(false); // State to control the visibility of the edit form
  const [currentContactMessage, setCurrentContactMessage] = useState(null);

  useEffect(() => {
    const fetchContactMessages = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/contactmessage/getcontactmessages"
        );
        console.log(response.data); // Check the structure of the data
        setContactMessages(response.data); // Assuming API returns { dutyDoctors: [...] }
      } catch (error) {
        console.error("Error fetching contactmessages:", error);
      }
    };

    fetchContactMessages();
  }, []);

  const handleAddContactMessage = async () => {
    if (newMessage && newFirstName && newLastName && newEmail && newMobile) {
      // Create a JSON object for the data
      const contactMessageData = {
        firstName: newFirstName,
        lastName: newLastName,
        mobile: newMobile,
        email: newEmail,
        message: newMessage,
      };

      try {
        const response = await axios.post(
          "http://localhost:5000/api/contactmessage/addcontactmessage",
          contactMessageData, // Send the JSON object instead of FormData
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 201) {
          const addedContactMessage = response.data.contactmessage;

          // Update state with the newly added consultant
          setContactMessages([...contactmessages, addedContactMessage]);
          setNewMessage("");
          setNewFirstName("");
          setNewLastName("");
          setNewMobile("");
          setNewEmail("");
          setShowAddForm(false);
        }
      } catch (error) {
        console.error("Error adding contactmessage:", error);
      }
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/contactmessage/deletecontactmessage/${id}`
      );
      setContactMessages(
        contactmessages.filter((contactmessage) => contactmessage._id !== id)
      );
    } catch (error) {
      console.error("Error deleting contactmessage:", error);
    }
  };

  const handleCancel = () => {
    setCurrentContactMessage(null);
    setShowEditForm(false);
    setNewMessage("");
    setNewFirstName("");
    setNewLastName("");
    setNewMobile("");
    setNewEmail("");
  };

  const handleEdit = (contactmessage) => {
    setCurrentContactMessage(contactmessage); // Set the current doctor to be edited
    setShowEditForm(true); // Show the edit form
    setShowAddForm(false); // Hide the add form if it is open
  };

  const handleUpdateContactMessage = async () => {
    if (currentContactMessage) {
      // Create a JSON object for the data
      const contactMessageData = {
        firstName: newFirstName || currentContactMessage.firstName,
        lastName: newLastName || currentContactMessage.lastName,
        email: newEmail || currentContactMessage.email,
        mobile: newMobile || currentContactMessage.mobile,
        message: newMessage || currentContactMessage.message,
      };

      try {
        const response = await axios.put(
          `http://localhost:5000/api/contactmessage/updatecontactmessage/${currentContactMessage._id}`,
          contactMessageData,
          {
            headers: { "Content-Type": "application/json" },
          }
        );

        if (response.status === 200) {
          const updatedContactMessage = response.data.contactmessage;

          setContactMessages(
            contactmessages.map((contactmessage) =>
              contactmessage._id === updatedContactMessage._id
                ? updatedContactMessage
                : contactmessage
            )
          );

          setCurrentContactMessage(null); // Clear the current job state
          setShowEditForm(false); // Hide the edit form
          setNewMessage("");
          setNewFirstName("");
          setNewLastName("");
          setNewMobile("");
          setNewEmail("");
        }
      } catch (error) {
        console.error("Error updating contactmessage:", error);
      }
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold">Contact Messages</h2>
        <button
          onClick={() => {
            setShowAddForm(!showAddForm);
            setShowEditForm(false); // Ensure the Edit form is closed
          }}
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          {showAddForm ? "Cancel" : "Add Contact Message"}
        </button>
      </div>

      {showAddForm && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Add New Job</h3>
          <input
            type="text"
            placeholder="First Name"
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder="Last Name"
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
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
          <input
            type="text"
            placeholder="Message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border p-2 w-full mb-4"
          />

          <button
            onClick={handleAddContactMessage}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
          >
            Save Contact Message
          </button>
        </div>
      )}

      {showEditForm && currentContactMessage && (
        <div className="mb-6 p-4 border rounded-md bg-white shadow">
          <h3 className="text-lg font-medium mb-2">Edit Contact Message</h3>
          <input
            type="text"
            placeholder={currentContactMessage.firstName}
            value={newFirstName}
            onChange={(e) => setNewFirstName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentContactMessage.lastName}
            value={newLastName}
            onChange={(e) => setNewLastName(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentContactMessage.email}
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentContactMessage.mobile}
            value={newMobile}
            onChange={(e) => setNewMobile(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <input
            type="text"
            placeholder={currentContactMessage.message}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="border p-2 w-full mb-4"
          />
          <button
            onClick={handleUpdateContactMessage}
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Update Contact Message
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
            <th className="border px-4 py-2 text-left">First Name</th>
            <th className="border px-4 py-2 text-left">Last Name</th>
            <th className="border px-4 py-2 text-left">Email</th>
            <th className="border px-4 py-2 text-left">Mobile</th>
            <th className="border px-4 py-2 text-left">Message</th>
            <th className="border px-4 py-2 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {contactmessages.map((contactmessage) => (
            <tr key={contactmessage._id}>
              <td className="border px-4 py-2">{contactmessage.firstName}</td>
              <td className="border px-4 py-2">{contactmessage.lastName}</td>
              <td className="border px-4 py-2">{contactmessage.email}</td>
              <td className="border px-4 py-2">{contactmessage.mobile}</td>
              <td className="border px-4 py-2">{contactmessage.message}</td>
              <td className="border px-4 py-2">
                <button
                  onClick={() => handleEdit(contactmessage)}
                  className="bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600 mr-2"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(contactmessage._id)}
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

export default ContactMessagesTable;
