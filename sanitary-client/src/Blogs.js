import React, { useEffect, useState } from 'react';
import axios from 'axios'; // Ensure you have axios installed

const Blogs = () => {
  const [blogsData, setBlogsData] = useState([]); // State to hold blogs data
  const [loading, setLoading] = useState(true); // State for loading status
  const [error, setError] = useState(null); // State for error handling

  useEffect(() => {
    // Function to fetch blogs data
    const fetchBlogs = async () => {
      try {
        const response = await axios.get('https://api.aruhealths.com/api/api/blogs'); // Adjust the URL based on your API
        setBlogsData(response.data); // Set the blogs data to state
      } catch (err) {
        setError(err); // Handle error
      } finally {
        setLoading(false); // Set loading to false after fetching data
      }
    };

    fetchBlogs(); // Call the fetch function
  }, []);

  if (loading) {
    return <div>Loading...</div>; // Loading state
  }

  if (error) {
    return <div>Error fetching blogs: {error.message}</div>; // Error handling
  }

  return (
    <div>
      <div className="container-fluid bg-primary hero-header mb-5">
        <div className="container text-center">
          <h1 className="display-4 text-white mb-3 animated slideInDown">Blogs</h1>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb justify-content-center mb-0 animated slideInDown">
              <li className="breadcrumb-item"><a className="text-white" href="#">About</a></li>
              <li className="breadcrumb-item text-white active" aria-current="page">Blogs</li>
            </ol>
          </nav>
        </div>
      </div>
      <div className="blogs-container">
        <h2 className="blogs-header">Latest Blog Posts</h2>
        <div className="blogs-grid">
          {blogsData.map((blog) => (
            <div key={blog.id} className="blog-item">
              <div className="blog-content">
                <h3 className="blog-title">{blog.BlogTitle}</h3>
                <p className="blog-date">{blog.Date}</p>
                <p className="blog-summary">{blog.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
