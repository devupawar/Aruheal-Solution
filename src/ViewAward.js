import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Import Axios
import './css/viewaward.css';

const ViewAwards = () => {
  const [awards, setAwards] = useState([]);
  const [selectedAward, setSelectedAward] = useState(null); // Track the award being updated
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const [formData, setFormData] = useState({ awardTitle: '', awardYear: '', awardImage: null });

  // Function to fetch awards
  const fetchAwards = async () => {
    try {
      const response = await axios.get('https://api.aruhealths.com/api/api/allaward');
      setAwards(response.data);
    } catch (error) {
      console.error('Error fetching awards:', error);
    }
  };

  useEffect(() => {
    // Fetch all awards when the component loads
    fetchAwards();
  }, []);

  // Function to delete an award
  const deleteAward = async (id) => {
    if (window.confirm('Are you sure you want to delete this award?')) {
      try {
        const response = await axios.post('https://api.aruhealths.com/api/api/deleteaward', {
          awardId: id,
        });
        if (response.status === 200) {
          setAwards(awards.filter((award) => award.id !== id)); // Remove deleted award from state
        } else {
          alert(response.data.message);
        }
      } catch (error) {
        console.error('Error deleting award:', error);
      }
    }
  };

  // Function to open the update modal
  const openUpdateModal = (award) => {
    setSelectedAward(award); // Store the selected award
    setFormData({
      awardTitle: award.awardTitle,
      awardYear: award.awardYear,
      awardImage: null, // Image will only be updated if a new file is selected
    });
    setShowModal(true); // Open modal
  };

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle file input
  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      awardImage: e.target.files[0], // Store the selected file
    }));
  };

  // Function to update an award
  const updateAward = async () => {
    const formDataToSend = new FormData();
    formDataToSend.append('awardId', selectedAward.id);
    formDataToSend.append('awardTitle', formData.awardTitle);
    formDataToSend.append('awardYear', formData.awardYear);

    // Only append awardImage if a new file is selected
    if (formData.awardImage) {
      formDataToSend.append('awardImage', formData.awardImage); // Append the new image
    }

    try {
      const response = await axios.put('https://api.aruhealths.com/api/api/updateaward', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        // Re-fetch the awards data to ensure it displays correctly
        await fetchAwards();
        setShowModal(false); // Close modal after updating
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error updating award:', error);
    }
  };

  return (
    <div className="view-awards">
      <h2>Award List</h2>
      <div className="award-cards">
        {awards.length === 0 ? (
          <p>No awards available</p>
        ) : (
          awards.map((award) => (
            <div key={award.id} className="award-card">
              <img
                src={`https://api.aruhealths.com/${award.awardImage}`} // Serve image from backend
                alt={award.awardTitle}
              />
              <h3>{award.awardTitle}</h3>
              <p className="award-year">{award.awardYear}</p>

              {/* Update and Delete buttons */}
              <div className="card-buttons">
                <button className="update-btn" onClick={() => openUpdateModal(award)}>
                  Update
                </button>
                <button className="delete-btn" onClick={() => deleteAward(award.id)}>
                  Delete
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal for updating the award */}
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update Award</h3>
            <label>Award Title:</label>
            <input
              type="text"
              name="awardTitle"
              value={formData.awardTitle}
              onChange={handleInputChange}
            />
            <label>Award Year:</label>
            <input
              type="text"
              name="awardYear"
              value={formData.awardYear}
              onChange={handleInputChange}
            />
            <label>Award Image (optional):</label>
            <input type="file" onChange={handleFileChange} />

            <div className="modal-buttons">
              <button onClick={updateAward}>Save Changes</button>
              <button onClick={() => setShowModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewAwards;
