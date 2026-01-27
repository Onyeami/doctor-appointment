import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/LoginPage.css";

export default function DoctorLoginPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                if (data.role !== 'doctor') {
                    setError('Access denied. This login is for doctors only.');
                    return;
                }
                localStorage.setItem('user', JSON.stringify(data));
                navigate('/doctor-dash');
            } else {
                setError(data.message || 'Login failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="login-page">
            <div className="login-card">
                <h2 className="login-title">Doctor Portal</h2>
                <p className="login-subtitle">
                    Sign in to manage your appointments
                </p>

                {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <form className="login-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Email Address</label>
                        <input
                            type="email"
                            name="email"
                            placeholder="doctor@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            placeholder="••••••••"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="login-btn">
                        Login as Doctor
                    </button>

                    <div className="login-footer">
                        <span>Don’t have a doctor account?</span>
                        <a href="/register-doctor">Sign up here</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
