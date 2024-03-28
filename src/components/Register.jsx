import React, { useState } from "react";
import { FaMailBulk, FaLock } from "react-icons/fa";
import { Navigate } from "react-router";
import './Components.css'
import { useNavigate } from "react-router-dom";


const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordsMatch, setPasswordsMatch] = useState(false);
    const navigate = useNavigate();
    const [error, setError] = useState('');



    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
        setPasswordsMatch(e.target.value === confirmPassword);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
        setPasswordsMatch(e.target.value === password);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (passwordsMatch) {
            try {
                const response = await fetch('https://fitness-gym-genius.onrender.com/auth/register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        userEmail: username,
                        userPassword: password
                    })
                });
                if (response.ok) {
                    navigate('/login')
                } else {
                    setError("Invalid email or password!");
                }
            } catch (error) {
                setError("We're running into a problem! Come back later!");

            }
        } else {
            setError("Password don't match!");
        }
    };

    return (
        <div>
            <div className="logo">
                <img src="/logo-white.png" alt="" width={200} height={200} />
                <h1>Gym Genius</h1>
            </div>
            <div className="wrapper">
                <form onSubmit={handleSubmit}>
                    <h1>Register</h1>
                    <div className="input-box">
                        <input type="text" placeholder="Email" value={username} onChange={handleUsernameChange} required/>
                        <FaMailBulk className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} required/>
                        <FaLock className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" placeholder="Confirm password" value={confirmPassword} onChange={handleConfirmPasswordChange} required/>
                        <FaLock className="icon"/>
                    </div>
                    <p id="message">{passwordsMatch ? "Passwords match" : "Passwords do not match"}</p>
                    <button type="submit" className={passwordsMatch ? "signup-button-enabled" : "signup-button-disabled"} disabled={!passwordsMatch}>Sign up</button>
                    {error && <div className="error"><p>{error}</p></div>}
                    <div className="register-link">
                        <p>Already have an account? <a href="login">Login</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Register;
