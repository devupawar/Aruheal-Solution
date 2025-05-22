import React, { useEffect, useState } from 'react';
import { Button, Card, Container, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; // For navigating to the Add Admin page
import axios from 'axios'; // To make API calls
import './css/Setting.css'; // Custom styles if needed

const Settings = () => {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState([]); // State to hold list of admins
  const [loading, setLoading] = useState(true); // State to handle loading status

  // Fetch all admins when the component loads
  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/getallusers'); // Replace with your API endpoint
        setAdmins(response.data); // Assuming the response is an array of admins
        setLoading(false);
      } catch (error) {
        console.error('Error fetching admins:', error);
      }
    };

    fetchAdmins();
  }, []);

  // Handle the deletion of an admin
  const handleDelete = async (id) => {
    try {
      await axios.post('https://api.aruhealths.com/api/api/deleteuser', { id }); // Assuming the delete route is POST
      setAdmins(admins.filter(admin => admin.id !== id)); // Remove deleted admin from the state
    } catch (error) {
      console.error('Error deleting admin:', error);
    }
  };

  const handleAddAdmin = () => {
    navigate('/register'); // Assuming you have a register route to add admins
  };

  return (
    <Container className="settings-container">
      <h2 className="settings-title">Settings</h2>

      {/* Add Admin Card */}
      <Card className="settings-card">
        <Card.Body>
          <Card.Title>Add Admin</Card.Title>
          <Card.Text>
            Click the button below to add a new administrator to the system.
          </Card.Text>
          <Button variant="success" onClick={handleAddAdmin}>
            Add Admin
          </Button>
        </Card.Body>
      </Card>

      {/* Admins Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <Table striped bordered hover className="mt-4">
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {admins.map((admin, index) => (
              <tr key={admin.id}>
                <td>{index + 1}</td>
                <td>{admin.username}</td>
                <td>{admin.email}</td>
                <td>
                  <Button
                    variant="danger"
                    onClick={() => handleDelete(admin.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default Settings;
