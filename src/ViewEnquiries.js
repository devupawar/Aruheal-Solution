import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ViewEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEnquiries = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/allenquiries'); // Adjust the URL to your API endpoint
        setEnquiries(response.data); // Assuming the response data is an array of enquiries
      } catch (err) {
        setError('Error fetching enquiries.'); // Handle error
      } finally {
        setLoading(false);
      }
    };

    fetchEnquiries();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this enquiry?")) {
      try {
        await axios.delete(`https://api.aruhealths.com/api/api/enquiry/${id}`); // Adjust the URL to your API endpoint
        setEnquiries(enquiries.filter(enquiry => enquiry.id !== id)); // Remove the deleted enquiry from the state
      } catch (err) {
        setError('Error deleting enquiry.'); // Handle error
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading enquiries...</div>;
  }

  if (error) {
    return <div className="text-center text-danger">{error}</div>;
  }

  return (
    <div className="container-fluid py-5">
      <div className="container">
        <h1 className="text-primary mb-4 text-center">View Enquiries</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-striped text-center">
            <thead className="bg-primary text-white">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Subject</th>
                <th>Message</th>
                <th>Date</th>
                <th>Actions</th> {/* Add Actions column */}
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enquiry) => (
                <tr key={enquiry.id}>
                  <td>{enquiry.name}</td>
                  <td>{enquiry.email}</td>
                  <td>{enquiry.subject}</td>
                  <td>{enquiry.message}</td>
                  <td>{enquiry.createdAt}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(enquiry.id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ViewEnquiries;
