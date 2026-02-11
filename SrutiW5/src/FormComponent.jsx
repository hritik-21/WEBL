import React, { useState } from 'react';
import './FormComponent.css';

const FormComponent = () => {
    // State for form inputs (Controlled Components)
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'student'
    });

    // State for validation errors
    const [errors, setErrors] = useState({});

    // State for submission result
    const [submittedData, setSubmittedData] = useState(null);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error dynamically when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate inputs
    const validate = () => {
        let tempErrors = {};
        let isValid = true;

        // Name validation
        if (!formData.name.trim()) {
            tempErrors.name = "Name is required";
            isValid = false;
        } else if (formData.name.length < 3) {
            tempErrors.name = "Name must be at least 3 characters";
            isValid = false;
        }

        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!formData.email) {
            tempErrors.email = "Email is required";
            isValid = false;
        } else if (!emailRegex.test(formData.email)) {
            tempErrors.email = "Invalid email format";
            isValid = false;
        }

        setErrors(tempErrors);
        return isValid;
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setSubmittedData(formData);
            // We keep the form data visible to show it's "controlled"
        } else {
            setSubmittedData(null);
            // Shake animation or focus first error could be added here
        }
    };

    return (
        <div className="form-container">
            <h2 style={{ textAlign: 'center', marginBottom: '2rem' }}>Registration Form</h2>

            <form onSubmit={handleSubmit} noValidate>
                {/* Name Input */}
                <div className="form-group">
                    <label htmlFor="name" className="form-label">Full Name</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={`form-input ${errors.name ? 'error' : ''}`}
                        placeholder="John Doe"
                        autoComplete="off"
                    />
                    {errors.name && <div className="error-message">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {errors.name}
                    </div>}
                </div>

                {/* Email Input */}
                <div className="form-group">
                    <label htmlFor="email" className="form-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`form-input ${errors.email ? 'error' : ''}`}
                        placeholder="john@example.com"
                        autoComplete="off"
                    />
                    {errors.email && <div className="error-message">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10"></circle>
                            <line x1="12" y1="8" x2="12" y2="12"></line>
                            <line x1="12" y1="16" x2="12.01" y2="16"></line>
                        </svg>
                        {errors.email}
                    </div>}
                </div>

                {/* Role Select */}
                <div className="form-group">
                    <label htmlFor="role" className="form-label">Role</label>
                    <select
                        id="role"
                        name="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="form-input"
                        style={{ cursor: 'pointer' }}
                    >
                        <option value="student">Student</option>
                        <option value="developer">Developer</option>
                        <option value="designer">Designer</option>
                        <option value="manager">Manager</option>
                    </select>
                </div>

                <button type="submit" className="submit-btn" id="submitBtn">
                    Submit Registration
                </button>
            </form>

            {/* Dynamic Results Display */}
            {submittedData && (
                <div className="result-card" id="resultCard">
                    <h3>Submission Successful!</h3>
                    <div className="result-item">
                        <span className="result-label">Name:</span>
                        <span className="result-value">{submittedData.name}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Email:</span>
                        <span className="result-value">{submittedData.email}</span>
                    </div>
                    <div className="result-item">
                        <span className="result-label">Role:</span>
                        <span className="result-value" style={{ textTransform: 'capitalize' }}>
                            {submittedData.role}
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

export default FormComponent;
