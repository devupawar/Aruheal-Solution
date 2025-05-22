import React, { useState, forwardRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { setAuth } from './redux/actions';
import { Button, Dropdown, Nav, Offcanvas } from 'react-bootstrap';
import './css/MyNavbar.css';
import { FaUserCircle } from 'react-icons/fa';

// Custom Dropdown Toggle component
const CustomToggle = forwardRef(({ children, onClick }, ref) => (
    <a
        href=""
        ref={ref}
        onClick={(e) => {
            e.preventDefault(); // Prevent the default anchor behavior
            onClick(e);
        }}
        style={{ display: 'flex', alignItems: 'center' }} // Align items properly
    >
        <FaUserCircle size={30} className="profile-icon" />
        <span className="username">{children}</span> {/* Display username next to icon */}
    </a>
));

const MyNavbar = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const isAuthenticated = useSelector(state => state.auth.isAuthenticated); // Get auth state
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const username = useSelector(state => state.auth.user?.username); // Assuming username is stored in auth state

    const handleLogout = async () => {
        try {
            await axios.post('https://api.aruhealths.com/api/api/logout'); // Call your logout API
            localStorage.removeItem('token');
            dispatch(setAuth(false));
            navigate('/'); // Redirect to login page
        } catch (error) {
            console.error('Logout failed:', error);
        }
    };

    return (
        isAuthenticated && (
            <>
                <div className="navbar-container">
                    <Button variant="primary" onClick={handleShow} className="menu-button">
                        ☰ Admin Menu
                    </Button>
                    <div className="profile-section">
                        <Dropdown align="end">
                            <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-components">
                                {username || 'User'} {/* Fallback to 'User' if username is undefined */}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item href="/viewprofile">View Profile</Dropdown.Item>
                                <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>

                {/* Offcanvas Sidebar */}
                <Offcanvas show={show} onHide={handleClose} placement="start">
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title>Admin Panel</Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="flex-column">
                            {/* Admin Panel Navigation Links */}
                            <Nav.Link as={Link} to="/dashboard" onClick={handleClose}>
                                🏠 Dashboard
                            </Nav.Link>
                            <Nav.Link as={Link} to="/addproduct" onClick={handleClose}>
                                ➕ Add Product
                            </Nav.Link>
                            <Nav.Link as={Link} to="/addfaq" onClick={handleClose}>
                                ➕ Add FAQ
                            </Nav.Link>
                            <Nav.Link as={Link} to="/addtestimonial" onClick={handleClose}>
                                ➕ Add Testimonial
                            </Nav.Link>
                            <Nav.Link as={Link} to="/addblog" onClick={handleClose}>
                                ➕ Add Blog
                            </Nav.Link>
                            <Nav.Link as={Link} to="/addaward" onClick={handleClose}>
                                ➕ Add Award
                            </Nav.Link>
                            
                            <Nav.Link as={Link} to='/viewenquiries' onClick={handleClose}>
                            📧 View Enquiries
                        </Nav.Link>
                        <Nav.Link as={Link} to='/viewdistributors' onClick={handleClose}>
                            📧 View Distributor Enquiries
                        </Nav.Link>
                        <Nav.Link as={Link} to='/settings' onClick={handleClose}>
                            ⚙️ Settings
                        </Nav.Link>
                        </Nav>
                    </Offcanvas.Body>
                </Offcanvas>
            </>
        )
    );
};

export default MyNavbar;
