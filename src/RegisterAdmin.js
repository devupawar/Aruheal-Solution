import React, { useState } from 'react';
import axios from 'axios';

const RegisterAdmin = () => {
  // State for form inputs
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // State for error and success messages
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(''); // Clear success message before making a new request

    // Validate inputs
    if (!username || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    // Prepare data for the API request
    const userData = {
      username,
      email,
      password,
    };

    try {
      // Send POST request to the API
      const response = await axios.post('https://api.aruhealths.com/api/api/register', userData);
      console.log(response.data); 
      
      // Handle success response and show success message
      setSuccess('Admin added successfully!'); 
      
      // Optionally, reset the form after successful registration
      setUsername('');
      setEmail('');
      setPassword('');
    } catch (err) {
      // Handle error response
      setError(err.response ? err.response.data.message : 'An error occurred');
    }
  };

  return (
    <div className="container">
      <h2 className="mb-4">Register Admin</h2>

      {/* Show error message if any */}
      {error && <div className="alert alert-danger">{error}</div>}
      
      {/* Show success message */}
      {success && <div className="alert alert-success">{success}</div>}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="form-label">Username</label>
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Register Admin
        </button>
      </form>
    </div>
  );
};

export default RegisterAdmin;
