import React, { useState } from 'react';
import axios from 'axios';
import './css/AddFaq.css';
import { Link } from 'react-router-dom';

const AddFaq = () => {
  const [faq, setFaq] = useState({
    question: '',
    answer: '',
  });

  const [message, setMessage] = useState('');  // State for success or error message
  const [error, setError] = useState('');      // State for error handling

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFaq({
      ...faq,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');  // Clear any previous messages before submitting
    setError('');    // Clear any previous errors

    try {
      const response = await axios.post('https://api.aruhealths.com/api/api/addfaq', faq); // Adjust URL as needed
      
      if (response.status === 200) {
        setMessage('FAQ added successfully!');
        // Optionally clear the form fields
        setFaq({ question: '', answer: '' });
      } else {
        setError('Failed to add FAQ. Please try again.');
      }
    } catch (error) {
      setError('Error adding FAQ. Please check the server.');
      console.error('Error adding FAQ:', error);
    }
  };

  return (
    <div className="add-faq-container">
      <h2 className="form-header">Add New FAQ</h2>
      <form className="add-faq-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            id="question"
            name="question"
            value={faq.question}
            onChange={handleChange}
            placeholder="Enter FAQ question"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="answer">Answer</label>
          <textarea
            id="answer"
            name="answer"
            value={faq.answer}
            onChange={handleChange}
            placeholder="Enter FAQ answer"
            rows="4"
            required
          />
        </div>

        <button type="submit" className="submit-button">Add FAQ</button>
        <Link to='/viewfaq' > <button className='view-button' >View FAQs</button></Link>
      </form>

      {/* Success Message */}
      {message && <p className="success-message">{message}</p>}
      
      {/* Error Message */}
      {error && <p className="error-message">{error}</p>}
    </div>
  );
};

export default AddFaq;
