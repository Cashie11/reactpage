/**
 * FormSection Component
 * 
 * A comprehensive form component with the following features:
 * - Form validation
 * - Multiple input types (text, email, password, checkbox)
 * - Form submission handling
 * - Success feedback
 * - Responsive design
 * 
 * This component is ideal for testing:
 * - Form submission
 * - Input validation
 * - User interactions
 * - Form state management
 * - Error handling
 */
import React, { useState } from 'react';
import './FormSection.css';

const FormSection = () => {
  // State to manage form data with initial values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    subscribe: false
  });
  
  // State to track form submission status
  const [submitted, setSubmitted] = useState(false);

  /**
   * Handles changes to form inputs
   * @param {Object} e - The change event from the form input
   */
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    // Update form state based on input type
    setFormData(prev => ({
      ...prev, // Spread previous state
      [name]: type === 'checkbox' ? checked : value // Handle checkboxes differently
    }));
  };

  /**
   * Handles form submission
   * @param {Object} e - The form submission event
   */
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // In a real app, you would typically send the data to a server here
    console.log('Form submitted:', formData);
    
    // Show success message
    setSubmitted(true);
    
    // Hide success message after 3 seconds
    setTimeout(() => setSubmitted(false), 3000);
  };

  // Main component render
  return (
    <section 
      className="form-section"
      data-testid="form-section" // Test ID for easier testing
    >
      <h2>Test Form</h2>
      <form 
        onSubmit={handleSubmit} 
        data-testid="test-form"
        aria-label="Example form" // Accessibility improvement
      >
        {/* Name Input */}
        <div className="form-group" role="group" aria-labelledby="name-label">
          <label id="name-label" htmlFor="name">
            Name:
            <span className="sr-only" aria-hidden="true"> (required)</span>
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            data-testid="name-input"
            aria-required="true"
            placeholder="Enter your name"
          />
        </div>
        
        {/* Email Input */}
        <div className="form-group" role="group" aria-labelledby="email-label">
          <label id="email-label" htmlFor="email">
            Email:
            <span className="sr-only" aria-hidden="true"> (required)</span>
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            data-testid="email-input"
            aria-required="true"
            placeholder="your.email@example.com"
          />
        </div>
        
        {/* Password Input */}
        <div className="form-group" role="group" aria-labelledby="password-label">
          <label id="password-label" htmlFor="password">
            Password:
            <span className="sr-only" aria-hidden="true"> (required, minimum 6 characters)</span>
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength="6"
            data-testid="password-input"
            aria-required="true"
            placeholder="••••••"
            aria-describedby="password-hint"
          />
          <small id="password-hint" className="hint">Minimum 6 characters</small>
        </div>
        
        {/* Newsletter Subscription Checkbox */}
        <div className="form-group checkbox-group" role="group">
          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              id="subscribe"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
              data-testid="subscribe-checkbox"
            />
            <label htmlFor="subscribe">Subscribe to newsletter</label>
          </div>
        </div>
        
        <button 
          type="submit" 
          data-testid="submit-button"
          className="submit-button"
          aria-live="polite" // For screen readers to announce submission status
        >
          Submit
        </button>
        
        {/* Success Message */}
        {submitted && (
          <div 
            className="success-message" 
            data-testid="success-message"
            role="alert" // For screen readers to announce the success message
            aria-live="polite"
          >
            <span className="success-icon">✓</span>
            Form submitted successfully!
          </div>
        )}
      </form>
    </section>
  );
};

export default FormSection;
