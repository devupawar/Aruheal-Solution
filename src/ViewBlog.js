// ViewBlogs.jsx

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './css/ViewBlogs.css'; // Make sure to create this CSS file for styling

const ViewBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [selectedBlog, setSelectedBlog] = useState(null);
    const [updateData, setUpdateData] = useState({ BlogTitle: '', description: '', Date: '' });

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = async () => {
        try {
            const response = await axios.get('https://api.aruhealths.com/api/api/blogs');
            setBlogs(response.data);
        } catch (error) {
            console.error('Error fetching blogs:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.post('https://api.aruhealths.com/api/api/deleteblog', { bid: id });
            fetchBlogs(); // Refresh the list after deletion
        } catch (error) {
            console.error('Error deleting blog:', error);
        }
    };

    const handleUpdate = (blog) => {
        setSelectedBlog(blog);
        setUpdateData({ BlogTitle: blog.BlogTitle, description: blog.description, Date: blog.Date });
    };

    const handleUpdateSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://api.aruhealths.com/api/api/updateblog', { bid: selectedBlog.id, ...updateData });
            setSelectedBlog(null); // Clear selected blog
            fetchBlogs(); // Refresh the list after update
        } catch (error) {
            console.error('Error updating blog:', error);
        }
    };

    return (
        <div className="view-blogs-container">
            <h2>Blog List</h2>
            {blogs.length === 0 ? (
                <p>No blogs available.</p>
            ) : (
                <div className="blog-cards-container">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="blog-card">
                            <h5>{blog.BlogTitle}</h5>
                            <p>{blog.description}</p>
                            <p><strong>Date:</strong> {blog.Date}</p>
                            <button onClick={() => handleUpdate(blog)}>Update</button>
                            <button onClick={() => handleDelete(blog.id)}>Delete</button>
                        </div>
                    ))}
                </div>
            )}

            {selectedBlog && (
                <form className="update-form" onSubmit={handleUpdateSubmit}>
                    <h3>Update Blog</h3>
                    <input
                        type="text"
                        value={updateData.BlogTitle}
                        onChange={(e) => setUpdateData({ ...updateData, BlogTitle: e.target.value })}
                        placeholder="Blog Title"
                        required
                    />
                    <textarea
                        value={updateData.description}
                        onChange={(e) => setUpdateData({ ...updateData, description: e.target.value })}
                        placeholder="Description"
                        required
                    />
                    <input
                        type="date"
                        value={updateData.Date}
                        onChange={(e) => setUpdateData({ ...updateData, Date: e.target.value })}
                        required
                    />
                    <button type="submit">Update Blog</button>
                    <button type="button" onClick={() => setSelectedBlog(null)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default ViewBlogs;
