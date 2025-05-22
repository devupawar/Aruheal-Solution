import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import './css/Forgot.css'; // Import the CSS file
import { IoIosArrowBack } from "react-icons/io";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [step, setStep] = useState(1); // Step 1: Email, Step 2: OTP, Step 3: Reset Password
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [timer, setTimer] = useState(0); // Timer state
    const [isTimerActive, setIsTimerActive] = useState(false); // Timer active state
    const [otpSent, setOtpSent] = useState(false); // State to track if OTP has been sent

    const navigate = useNavigate(); // Initialize useNavigate hook

    const handleSendOtp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://api.aruhealths.com/api/api/forgot-password', { email });
            setStep(2); // Move to OTP input step
            setError('');
            setSuccessMessage('OTP sent successfully. Please check your inbox.');
            setOtpSent(true); // Mark OTP as sent
            // Start the timer
            setTimer(300); // 5 minutes in seconds
            setIsTimerActive(true);
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Something went wrong. Please try again.');
            setSuccessMessage('');
            setOtpSent(false); // Reset OTP sent status on error
        }
    };

    const handleVerifyOtp = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://api.aruhealths.com/api/api/verify-otp', { email, otp });
            setStep(3); // Move to reset password step
            setError('');
            setSuccessMessage('OTP verified. Please enter your new password.');
            setIsTimerActive(false); // Stop the timer
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    const handleResetPassword = async (e) => {
        e.preventDefault();
        try {
            await axios.post('https://api.aruhealths.com/api/api/reset-password', { email, newPassword });
            setSuccessMessage('Password reset successfully. Redirecting to login page...');
            setError('');

            // Redirect to login page after a short delay
            setTimeout(() => {
                navigate('/login'); // Change '/login' to your login page route
            }, 2000); // Adjust delay as necessary
        } catch (error) {
            setError(error.response ? error.response.data.message : 'Something went wrong. Please try again.');
            setSuccessMessage('');
        }
    };

    // Timer effect
    useEffect(() => {
        let interval = null;
        if (isTimerActive && timer > 0) {
            interval = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000); // Update timer every second
        } else if (timer === 0) {
            setIsTimerActive(false); // Stop the timer when it reaches 0
            if (otpSent) {
                setError('OTP expired. Please request a new one.'); // Show error only if OTP was sent
                setSuccessMessage(''); // Clear success message
                setStep(1); // Redirect back to the email input step
                setEmail(''); // Optionally clear the email field
            }
        }

        return () => clearInterval(interval); // Cleanup on component unmount
    }, [isTimerActive, timer, otpSent]); // Include otpSent in the dependency array

    return (
        <div className="forgot-password-page">
            {/* Add your image here */}
            <img src="f.png" alt="Forgot Password" className="forgot-password-image" />
            
            {step === 1 && (
                <form onSubmit={handleSendOtp} className="forgot-password-form">
                    <h2 className='forget-title'>Forgot Password</h2>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="input-group">
                        <label>Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Send OTP</button>
                   <Link to='/login' className='back-to-login'> <p><IoIosArrowBack className='forget-icon' />Back To Login</p></Link>
                </form>
            )}

            {step === 2 && (
                <form onSubmit={handleVerifyOtp} className="otp-verification-form">
                    <h2 className='forget-title'>Verify OTP</h2>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="input-group">
                        <label>OTP</label>
                        <input
                            type="text"
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            required
                        />
                    </div>
                    {isTimerActive && (
                        <p className="timer">
                            Time remaining: {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                        </p>
                    )}
                    <button type="submit" className="submit-button">Submit OTP</button>
                    <Link to='/login' className='back-to-login'> <p><IoIosArrowBack className='forget-icon' />Back To Login</p></Link>
                </form>
            )}

            {step === 3 && (
                <form onSubmit={handleResetPassword} className="reset-password-form">
                    <h2 className='forget-title'>Reset Password</h2>
                    {error && <p className="error-message">{error}</p>}
                    {successMessage && <p className="success-message">{successMessage}</p>}
                    <div className="input-group">
                        <label>New Password</label>
                        <input
                            type="password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="submit-button">Reset Password</button>
                    
                </form>
            )}
        </div>
    );
};

export default ForgotPassword;
