import React, { useEffect, useState } from 'react';
import axios from 'axios';
// import './ViewEnquiries.css'; // Optional: Import CSS for styling

const ViewDistributor = () => {
    const [enquiries, setEnquiries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const response = await axios.get('https://api.aruhealths.com/api/api/getAllDistributorEnquiries');
                setEnquiries(response.data);
            } catch (err) {
                setError(err.message || 'Error fetching enquiries');
            } finally {
                setLoading(false);
            }
        };

        fetchEnquiries();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this enquiry?')) {
            try {
                await axios.post('https://api.aruhealths.com/api/api/deleteDistributorEnquiry', { eid: id });
                setEnquiries(enquiries.filter(enquiry => enquiry.id !== id)); // Remove deleted enquiry from state
            } catch (err) {
                setError(err.message || 'Error deleting enquiry');
            }
        }
    };

    return (
        <div className="container">
            <h1 className="text-center">Distributor Enquiries</h1>
            {loading && <p>Loading enquiries...</p>}
            {error && <p className="text-danger">{error}</p>}
            {!loading && enquiries.length === 0 && <p>No enquiries found.</p>}
            <table className="table table-bordered mt-3">
                <thead className="table-light">
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact No</th>
                        <th>Experience</th>
                        <th>Referral</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {enquiries.map((enquiry) => (
                        <tr key={enquiry.id}>
                            <td>{enquiry.id}</td>
                            <td>{enquiry.name}</td>
                            <td>{enquiry.email}</td>
                            <td>{enquiry.contactNo}</td>
                            <td>{enquiry.experience}</td>
                            <td>{enquiry.referral}</td>
                            <td>
                                <button
                                    className="btn btn-danger"
                                    onClick={() => handleDelete(enquiry.id)}
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ViewDistributor;
