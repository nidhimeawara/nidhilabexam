import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:5000/api/users/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });
            const result = await response.json();
            if (result.success) {
                console.log(result.message);
                navigate('/dashboard'); // Redirect to the dashboard or desired page after login
            } else {
                console.log(result.message); // Display error message if login fails
            }
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <input
                name="email"
                placeholder="Email"
                onChange={handleChange}
                value={formData.email}
            />
            <input
                name="password"
                type="password"
                placeholder="Password"
                onChange={handleChange}
                value={formData.password}
            />
            <button onClick={handleLogin}>Login</button>
        </div>
    );
}

export default Login;
