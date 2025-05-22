import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { setAuth } from './redux/actions';
import './css/Login.css';
import { FaUser } from 'react-icons/fa';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('https://api.aruhealths.com/api/api/login', {
                email,
                password,
            });

            const { token } = response.data;
            localStorage.setItem('token', token);
            dispatch(setAuth(true));
            navigate('/dashboard');
        } catch (error) {
            if (error.response) {
                setError(error.response.data.message);
            } else {
                setError('Something went wrong. Please try again.');
            }
        }
    };

    const handleForgotPassword = () => {
        navigate('/forgot-password'); // Ensure this path matches your route configuration
    };

    return (
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
            <FaUser className="login-image" />
                <p className='login-title'>Admin Login</p>
                {error && <p className="error-message">{error}</p>}
                <div className="input-group">
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <p className="forgot-password" onClick={handleForgotPassword} role="button" tabIndex={0} onKeyPress={handleForgotPassword}>
                    Forget Password?
                </p>
                <button type="submit" className='login-button'>Sign In</button>
            </form>
        </div>
    );
};

export default Login;
