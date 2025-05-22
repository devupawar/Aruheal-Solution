import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ViewTestimonials.css'; // Your CSS file for styling

const ViewTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]); // State to store testimonial data
  const [editingTestimonial, setEditingTestimonial] = useState(null); // State to track which testimonial is being updated
  const [updatedTestimonial, setUpdatedTestimonial] = useState({
    testimonialname: '',
    description: ''
  });

  // Fetch all testimonials when the component loads
  useEffect(() => {
    fetchTestimonials();
  }, []);

  // Function to fetch testimonials from the backend
  const fetchTestimonials = async () => {
    try {
      const response = await axios.get('https://api.aruhealths.com/api/api/testimonials'); // Your backend endpoint
      setTestimonials(response.data);
      console.log(response.data)
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    }
  };

  // Function to delete a testimonial
  const deleteTestimonial = async (id) => {
    try {
      await axios.post('https://api.aruhealths.com/api/api/deletetestimonial', { tid: id });
      fetchTestimonials(); // Refresh the testimonial list after deletion
    } catch (error) {
      console.error('Error deleting testimonial:', error);
    }
  };

  // Open the update modal for the selected testimonial
  const openUpdateModal = (testimonial) => {
    setEditingTestimonial(testimonial); // Set the testimonial being edited
    setUpdatedTestimonial({
      testimonialname: testimonial.testimonialname,
     description: testimonial.description
    });
  };

  // Handle the form input for updating a testimonial
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedTestimonial((prevTestimonial) => ({
      ...prevTestimonial,
      [name]: value,
    }));
  };

  // Submit the updated testimonial data to the backend
  const updateTestimonial = async () => {
    try {
      // Update using PUT instead of POST
      await axios.post('https://api.aruhealths.com/api/api/updatetestimonial', {
        tid: editingTestimonial.id,
        testimonialname: updatedTestimonial.testimonialname, // Adjust keys to match backend expectations
        description: updatedTestimonial.description
      });
      fetchTestimonials(); // Refresh the testimonial list after updating
      setEditingTestimonial(null); // Close the modal after update
    } catch (error) {
      console.error('Error updating testimonial:', error);
    }
  };
  

  return (
    <div className="view-testimonials-container">
      <h2>View Testimonials</h2>
      <table className="testimonials-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
        {testimonials.map((testimonial) => (
  <tr key={testimonial.id}>
    <td>{testimonial.id}</td>
    <td>{testimonial.testimonialname}</td>
    <td>{testimonial.description}</td>
    <td>
      <button onClick={() => deleteTestimonial(testimonial.id)} className="delete-button">Delete</button>
      <button onClick={() => openUpdateModal(testimonial)} className="update-button">Update</button>
    </td>
  </tr>
))}

        </tbody>
      </table>

      {/* Update Testimonial Modal */}
      {editingTestimonial && (
  <div className="modal">
    <div className="modal-content">
      <h3>Update Testimonial</h3>
      <label>Name</label>
      <input
        type="text"
        name="testimonialname" // Change 'name' to 'testimonialname'
        value={updatedTestimonial.testimonialname}
        onChange={handleUpdateInputChange}
        required
      />
      <label>Message</label>
      <textarea
        name="description" // Change 'name' to 'description'
        value={updatedTestimonial.description}
        onChange={handleUpdateInputChange}
        required
      ></textarea>
      <button onClick={updateTestimonial} className="save-button">Save</button>
      <button onClick={() => setEditingTestimonial(null)} className="cancel-button">Cancel</button>
    </div>
  </div>
)}

    </div>
  );
};

export default ViewTestimonials;
