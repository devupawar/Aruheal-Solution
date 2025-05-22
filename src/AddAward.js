import React, { useState } from 'react';
import './css/AddAward.css';
import { Link } from 'react-router-dom';

const AddAward = () => {
    const [awardData, setAwardData] = useState({
        awardTitle: '',
        awardYear: '',
        image: null,
    });

    // Handle changes for form inputs
    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === 'image') {
            setAwardData({ ...awardData, image: files[0] }); // Handle file input
        } else {
            setAwardData({ ...awardData, [name]: value }); // Handle text input
        }
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('awardTitle', awardData.awardTitle);
        formData.append('awardYear', awardData.awardYear);
        formData.append('image', awardData.image); // Ensure 'image' matches the input name

        try {
            const response = await fetch('https://api.aruhealths.com/api/api/addaward', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            if (response.ok) {
                alert('Award added successfully!');
                setAwardData({
                    awardTitle: '',
                    awardYear: '',
                    image: null,
                });
            } else {
                alert('Failed to add award: ' + result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while adding the award.');
        }
    };

    return (
        <div className="add-award-form-container">
            <h2 className="form-header">Add New Award</h2>
            <form className="add-award-form" onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="awardTitle">Award Title</label>
                    <input
                        type="text"
                        id="awardTitle"
                        name="awardTitle"
                        value={awardData.awardTitle}
                        onChange={handleChange}
                        placeholder="Enter award title"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="awardYear">Award Year</label>
                    <input
                        type="text"
                        id="awardYear"
                        name="awardYear"
                        value={awardData.awardYear}
                        onChange={handleChange}
                        placeholder="Enter award year"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="image">Award Image</label>
                    <input
                        type="file"
                        id="image"
                        name="image"
                        accept="image/*"
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="submit-button">Add Award</button>
                <Link to='/viewaward'>
                    <button className="view-button">View Awards</button>
                </Link>
            </form>
        </div>
    );
};

export default AddAward;
