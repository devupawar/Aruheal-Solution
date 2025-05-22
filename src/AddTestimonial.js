import React, { useState } from 'react';
import './css/AddTestimonial.css';
import { Link } from 'react-router-dom';


const AddTestimonial = () => {
  const [testimonial, setTestimonial] = useState({
    testimonialname: '',
    description: '',
  });
  
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTestimonial({
      ...testimonial,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send POST request to the backend
      const response = await fetch('https://api.aruhealths.com/api/api/addtestimonial', { // Adjust URL based on your backend setup
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(testimonial),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const result = await response.json();
      console.log(result); // Handle success
      setMessage('Testimonial added successfully!'); // Success message
      // Optionally reset the form
      setTestimonial({ testimonialname: '', description: '' });
    } catch (error) {
      console.error('Error:', error);
      setMessage('Failed to add testimonial. Please try again.'); // Error message
    }
  };

  return (
    <div className="add-testimonial-container">
      <h2 className="form-header">Add New Testimonial</h2>
      <form className="add-testimonial-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="testimonialname">Name</label>
          <input
            type="text"
            id="testimonialname"
            name="testimonialname"
            value={testimonial.testimonialname}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Feedback</label>
          <textarea
            id="description"
            name="description"
            value={testimonial.description}
            onChange={handleChange}
            placeholder="Enter your testimonial"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Testimonial</button>
        <Link to='/viewtestimonials' > <button className='view-button' >View Testimonials</button></Link>
      </form>

      {message && <p className="form-message">{message}</p>} {/* Display message */}
    </div>
  );
};

export default AddTestimonial;
