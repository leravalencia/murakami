"use client"

import React from 'react';
import { useForm, ValidationError } from '@formspree/react';
import '../contact-form.css';

function ContactForm() {
  const [state, handleSubmit] = useForm("xanedoro");
  if (state.succeeded) {
      return <p className="success-message">Thanks for your message! We'll get back to you soon.</p>;
  }
  return (
    <form onSubmit={handleSubmit} className="contact-form">
      <div className="form-group">
        <label htmlFor="email">
          Email Address
        </label>
        <input
          id="email"
          type="email" 
          name="email"
          placeholder="Enter your email"
          required
        />
        <ValidationError 
          prefix="Email" 
          field="email"
          errors={state.errors}
        />
      </div>
      <div className="form-group">
        <label htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Enter your message"
          required
        />
        <ValidationError 
          prefix="Message" 
          field="message"
          errors={state.errors}
        />
      </div>
      <button type="submit" disabled={state.submitting} className="submit-button">
        {state.submitting ? 'Sending...' : 'Send Message'}
      </button>
    </form>
  );
}

export default function Home() {
  return (
    <div className="app-container">
      <h1>Contact Us</h1>
      <ContactForm />
    </div>
  );
}

