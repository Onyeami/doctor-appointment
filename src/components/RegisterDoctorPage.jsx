import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../css/RegisterPage.css"; // Reuse existing styles

export default function RegisterDoctorPage() {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match");
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/api/auth/register/doctor', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    name: formData.name,
                    email: formData.email,
                    password: formData.password
                }),
            });

            const data = await response.json();

            if (response.ok) {
                // Successful registration - redirect to login page
                navigate('/login-doctor');
            } else {
                setError(data.message || 'Registration failed');
            }
        } catch (err) {
            setError('Network error. Please try again.');
        }
    };

    return (
        <div className="register-page">
            <div className="register-card">
                <h2 className="register-title">Doctor Registration</h2>
                <p className="register-subtitle">
                    Join our network of healthcare professionals
                </p>

                {error && <div className="error-message" style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

                <form className="register-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Full Name (Dr.)</label>
                        <input
                            type="text"
                            name="name"
                            placeholder="Dr. John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

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

                    <div className="form-group">
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="••••••••"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <button type="submit" className="register-btn">
                        Register as Doctor
                    </button>

                    <div className="register-footer">
                        <span>Already have an account?</span>
                        <a href="/login">Login</a>
                    </div>
                </form>
            </div>
        </div>
    );
}
