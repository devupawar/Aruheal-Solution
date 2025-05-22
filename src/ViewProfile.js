import React, { useEffect, useState } from 'react';
import axios from 'axios'; // To make HTTP requests
import { FaUser } from 'react-icons/fa';
import './css/Viewprofile.css'

const ViewProfile = () => {
  const [user, setUser] = useState(null); // State to store user data
  const [isEditing, setIsEditing] = useState(false); // To toggle between view and edit modes
  const [updatedUser, setUpdatedUser] = useState({ username: '', email: '', password: '' }); // State for updated user data
  const [message, setMessage] = useState(''); // To show success or error messages

  const token = localStorage.getItem('token'); // Assuming you store the JWT in localStorage

  // Fetch current user data
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/currentuser', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data); // Store user data in state
        setUpdatedUser({ username: response.data.username, email: response.data.email, password: '' }); // Initialize the update form
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };
    fetchUser();
  }, [token]);

  // Handle edit button click
  const handleEditClick = () => {
    setIsEditing(true); // Enable edit mode
  };

  // Handle input changes in the edit form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission to update user
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        'https://api.aruhealths.com/api/api/updateuser',
        { id: user.id, ...updatedUser },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage('User updated successfully!');
      setUser(response.data.user); // Update the user data in the state with the updated data
      setIsEditing(false); // Switch back to view mode
    } catch (error) {
      console.error('Error updating user:', error);
      setMessage('Failed to update user. Please try again.');
    }
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        <div className="profile-header">
          <FaUser className="profile-image" />
          <div>
            <h2>{user.username}</h2>
          </div>
          <button className="edit-button" onClick={handleEditClick}>
            Edit
          </button>
        </div>

        <div className="profile-info">
          <h3>Personal Information</h3>
          {!isEditing ? (
            <>
              <p><strong>Name:</strong> {user.username}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </>
          ) : (
            <form onSubmit={handleFormSubmit} className="edit-profile-form">
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className="input-group">
                <label>Email</label>
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
             
              <button type="submit" className="save-button">Save</button>
            </form>
          )}
        </div>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
};

export default ViewProfile;
