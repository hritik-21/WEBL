import React, { useState } from 'react';
import './RegistrationForm.css';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        interest: ''
    });

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionSuccess, setSubmissionSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error if present
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const validate = () => {
        let tempErrors = {};
        if (!formData.fullName.trim()) tempErrors.fullName = 'Full Name is required';
        if (!formData.email) {
            tempErrors.email = 'Email address is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            tempErrors.email = 'Please enter a valid email address';
        }
        if (!formData.interest) tempErrors.interest = 'Please select an area of interest';

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (validate()) {
            setIsSubmitting(true);

            // Artificial delay to mimic server request
            setTimeout(() => {
                setIsSubmitting(false);
                setSubmissionSuccess(true);
                setFormData({ fullName: '', email: '', interest: '' }); // Reset form
            }, 1000);
        }
    };

    return (
        <div className="form-wrapper">
            <div className="form-header">
                <h2>Join Our Community</h2>
                <p>Register to receive latest updates and news.</p>
            </div>

            <form className="form-body" onSubmit={handleSubmit} noValidate>
                <div className="form-field">
                    <label htmlFor="fullName" className="field-label">Full Name</label>
                    <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        className={`field-input ${errors.fullName ? 'has-error' : ''}`}
                        placeholder="e.g. Sarah Smith"
                    />
                    {errors.fullName && <div className="error-msg">{errors.fullName}</div>}
                </div>

                <div className="form-field">
                    <label htmlFor="email" className="field-label">Email Address</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className={`field-input ${errors.email ? 'has-error' : ''}`}
                        placeholder="name@company.com"
                    />
                    {errors.email && <div className="error-msg">{errors.email}</div>}
                </div>

                <div className="form-field">
                    <label htmlFor="interest" className="field-label">Area of Interest</label>
                    <div style={{ position: 'relative' }}>
                        <select
                            id="interest"
                            name="interest"
                            value={formData.interest}
                            onChange={handleChange}
                            className={`field-input ${errors.interest ? 'has-error' : ''}`}
                            style={{ appearance: 'none', cursor: 'pointer' }} // Custom select styles
                        >
                            <option value="" disabled>Select a topic</option>
                            <option value="development">Software Development</option>
                            <option value="design">Graphic Design</option>
                            <option value="marketing">Digital Marketing</option>
                            <option value="data">Data Science</option>
                        </select>
                        <div style={{ position: 'absolute', right: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#64748b' }}>
                            ▼
                        </div>
                    </div>
                    {errors.interest && <div className="error-msg">{errors.interest}</div>}
                </div>

                <button type="submit" className="submit-btn" disabled={isSubmitting}>
                    {isSubmitting ? 'Registering...' : 'Complete Registration'}
                </button>

                {submissionSuccess && (
                    <div className="success-message">
                        <svg className="success-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        <span>Success! You've been registered.</span>
                    </div>
                )}
            </form>
        </div>
    );
};

export default RegistrationForm;
