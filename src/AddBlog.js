import React, { useState } from 'react';
import axios from 'axios';
import './css/AddBlog.css';
import { Link } from 'react-router-dom';
const AddBlog = () => {
  const [blog, setBlog] = useState({
    BlogTitle: '',      // Changed 'title' to 'BlogTitle'
    description: '',
    Date: '',           // Changed 'date' to 'Date'
  });

  const [message, setMessage] = useState('');  // State for success message
  const [error, setError] = useState('');      // State for error message

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBlog({
      ...blog,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Clear the message before the submission
    setError('');    // Clear error message before submission

    try {
      const response = await axios.post('https://api.aruhealths.com/api/api/addblog', blog); // Send data as it is

      if (response.status === 200) {
        setMessage('Blog added successfully!');
        // Optionally, clear the form
        setBlog({ BlogTitle: '', description: '', Date: '' });
      } else {
        setError('Failed to add the blog. Please try again.');
      }
    } catch (error) {
      setError('Error submitting the form. Please check the server.');
      console.error('Error submitting the form:', error);
    }
  };

  return (
    <div className="add-blog-container">
      <h2 className="form-header">Add New Blog</h2>
      <form className="add-blog-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="BlogTitle">Blog Title</label>
          <input
            type="text"
            id="BlogTitle"
            name="BlogTitle"
            value={blog.BlogTitle}
            onChange={handleChange}
            placeholder="Enter blog title"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={blog.description}
            onChange={handleChange}
            placeholder="Enter blog description"
            rows="4"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="Date">Date</label>
          <input
            type="date"
            id="Date"
            name="Date"
            value={blog.Date}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-button">Add Blog</button>
       <Link to='/viewblogs' > <button className='view-button' >View Blog</button></Link>
      </form>

      {/* Success Message */}
      {message && <p className="success-message">{message}</p>}
      
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddBlog;
