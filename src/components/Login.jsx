import React, { useState } from "react";
import './Components.css';
import { FaMailBulk, FaLock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./AuthProvider";

function Login () {
    const navigate = useNavigate();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState('');
    const authContext = useAuth();

    const handleSignIn = async (e) => {
        e.preventDefault();
            const result = await authContext.login(username, password);
            if (result === true) {
                navigate("/profile");
            } else {
            setError('Incorrect email or password!');
        }
    };

    return (
        <div>
            <div className="logo">
                <img src="/logo-white.png" alt="" width={200} height={200} />
                <h1>Gym Genius</h1>
            </div>
            <div className="wrapper">
                <form onSubmit={handleSignIn}>
                    <h1>Login</h1>
                    <div className="input-box">
                        <input type="text" name="email" placeholder="Email" value={username} onChange={e => setUsername(e.target.value)} required/>
                        <FaMailBulk className="icon"/>
                    </div>
                    <div className="input-box">
                        <input type="password" name="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
                        <FaLock className="icon"/>
                    </div>
                    <button type="submit">Sign in</button>
                    {error && <div className="error"><p>{error}</p></div>}

                    <div className="register-link">
                        <p>Don't have an account? <a href="/register">Register</a></p>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Login;
