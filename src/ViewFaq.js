import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ViewFaqs.css'; // Add your CSS file for styling

const ViewFaq = () => {
  const [faqs, setFaqs] = useState([]);  // State to store FAQ data
  const [editingFaq, setEditingFaq] = useState(null);  // State to track which FAQ is being updated
  const [updatedFaq, setUpdatedFaq] = useState({
    question: '',
    answer: ''
  });

  // Fetch all FAQs when the component loads
  useEffect(() => {
    fetchFaqs();
  }, []);

  // Function to fetch FAQs from the backend
  const fetchFaqs = async () => {
    try {
      const response = await axios.get('https://api.aruhealths.com/api/api/allfaqs'); // Your backend endpoint
      setFaqs(response.data);
    } catch (error) {
      console.error('Error fetching FAQs:', error);
    }
  };

  // Function to delete an FAQ
  const deleteFaq = async (id) => {
    try {
      await axios.post('https://api.aruhealths.com/api/api/deletefaq', { fid: id });
      fetchFaqs(); // Refresh the FAQ list after deletion
    } catch (error) {
      console.error('Error deleting FAQ:', error);
    }
  };

  // Open the update modal for the selected FAQ
  const openUpdateModal = (faq) => {
    setEditingFaq(faq); // Set the FAQ being edited
    setUpdatedFaq({
      question: faq.question,
      answer: faq.answer
    });
  };

  // Handle the form input for updating an FAQ
  const handleUpdateInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedFaq((prevFaq) => ({
      ...prevFaq,
      [name]: value,
    }));
  };

  // Submit the updated FAQ data to the backend
  const updateFaq = async () => {
    try {
      await axios.post('https://api.aruhealths.com/api/api/updatefaq', {
        fid: editingFaq.id,
        question: updatedFaq.question,
        answer: updatedFaq.answer
      });
      fetchFaqs(); // Refresh the FAQ list after updating
      setEditingFaq(null); // Close the modal after update
    } catch (error) {
      console.error('Error updating FAQ:', error);
    }
  };

  return (
    <div className="view-faqs-container">
      <h2>View FAQs</h2>
      <table className="faqs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Question</th>
            <th>Answer</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {faqs.map((faq) => (
            <tr key={faq.id}>
              <td>{faq.id}</td>
              <td>{faq.question}</td>
              <td>{faq.answer}</td>
              <td>
                <button onClick={() => deleteFaq(faq.id)} className="delete-button">Delete</button>
                <button onClick={() => openUpdateModal(faq)} className="update-button">Update</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Update FAQ Modal */}
      {editingFaq && (
        <div className="modal">
          <div className="modal-content">
            <h3>Update FAQ</h3>
            <label>Question</label>
            <input
              type="text"
              name="question"
              value={updatedFaq.question}
              onChange={handleUpdateInputChange}
            />
            <label>Answer</label>
            <textarea
              name="answer"
              value={updatedFaq.answer}
              onChange={handleUpdateInputChange}
            ></textarea>
            <button onClick={updateFaq} className="save-button">Save</button>
            <button onClick={() => setEditingFaq(null)} className="cancel-button">Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ViewFaq;
