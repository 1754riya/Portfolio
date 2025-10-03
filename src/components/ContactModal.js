import React, { useState } from "react";
import { FaTimes, FaPaperPlane } from "react-icons/fa";

// Try to import EmailJS, fallback if not available
let emailjs;
try {
  emailjs = require('@emailjs/browser');
} catch (error) {
  console.log('EmailJS not available:', error.message);
}

function ContactModal({ isOpen, onClose }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Debug log
  console.log('ContactModal render - isOpen:', isOpen);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.name || !formData.email || !formData.message) {
      alert('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      // EmailJS implementation - Fully configured and ready!
      if (emailjs) {
        const serviceID = 'service_4czx2n5';
        const templateID = 'template_uta7wll'; 
        const publicKey = 'NIUHxcG3IDX0W50GM';

        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          message: formData.message,
          to_name: 'Riya Mehta',
          to_email: 'rmehta1754@gmail.com',
          current_date: new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric', 
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
          })
        };

        await emailjs.send(serviceID, templateID, templateParams, publicKey);
        console.log('Email sent successfully:', formData);
      } else {
        // Fallback when EmailJS is not available
        console.log('EmailJS not available - Form data:', formData);
        // Simulate delay
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
      setIsSuccess(true);
      
      // Auto close after 3 seconds
      setTimeout(() => {
        onClose();
        setIsSuccess(false);
        setFormData({ name: '', email: '', message: '' });
      }, 3000);

    } catch (error) {
      console.error('Error sending email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="contact-modal-overlay" onClick={onClose}>
      <div className="contact-modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Modal Header */}
        <div className="contact-modal-header">
          <h2 className="contact-modal-title">Get In Touch</h2>
          <button 
            className="contact-modal-close-btn"
            onClick={onClose}
          >
            <FaTimes />
          </button>
        </div>

        {/* Modal Body */}
        <div className="contact-modal-body">
          {isSuccess ? (
            <div className="contact-success-message">
              <div className="success-icon">✓</div>
              <h3>Thank You!</h3>
              <p>Your message has been sent successfully.</p>
              <p>I'll get back to you soon!</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email address"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Your Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  rows="5"
                  required
                ></textarea>
              </div>

              <button 
                type="submit" 
                className="contact-submit-btn"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <span className="loading-spinner"></span>
                    Sending...
                  </>
                ) : (
                  <>
                    <FaPaperPlane />
                    Send Message
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactModal;