import React, { useState } from 'react';
import {
  Code2, Database, Cloud, BookOpen,
  CheckCircle, Globe, Briefcase,
  X, Send, BookMarked, Users, Award, Phone
} from 'lucide-react';
import axios from 'axios';
import './index.css';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', subject: '', message: ''
  });
  const [formStatus, setFormStatus] = useState({ status: 'idle', message: '' }); // idle, submitting, success, error

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus({ status: 'submitting', message: '' });

    try {
      // Sending request to the backend API
      const response = await axios.post('/api/contact', formData);
      setFormStatus({ status: 'success', message: response.data.message || 'Some one will contact you shortly' });
      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormStatus({ status: 'idle', message: '' });
      }, 3000);
    } catch (error) {
      setFormStatus({
        status: 'error',
        message: error.response?.data?.error || 'Failed to send message. Please try again.'
      });
    }
  };

  return (
    <div className="app">
      {/* Navbar */}
      <nav className="navbar">
        <div className="container nav-content">
          <div className="nav-logo">
            <span className="text-gradient">&lt;Learn</span>Coding/&gt;
          </div>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#courses">Courses</a></li>
            <li><a href="#services">Services</a></li>
            <li><a href="#about">About</a></li>
          </ul>
          <button className="btn btn-outline" onClick={() => setIsModalOpen(true)}>
            Contact Us
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        <div className="hero-bg-glow"></div>
        <div className="container">
          <div className="hero-content fade-in">
            <h1 className="hero-title">
              Educate. Engage. <span className="text-gradient">Excel.</span>
            </h1>
            <p className="hero-subtitle">
              Empowering Middle-School to Graduate Students, and Professionals, to build successful careers in IT. Master Java, SQL, Cloud, and more with expert guidance.
            </p>
            <div className="hero-buttons">
              <a href="#courses" className="btn btn-primary">
                Explore Courses
              </a>
              <button onClick={() => setIsModalOpen(true)} className="btn btn-outline">
                Book a Session
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section id="courses" className="section">
        <div className="container">
          <div className="text-center" style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <h2 style={{ fontSize: '2.5rem' }}>Our <span className="text-gradient">Curriculum</span></h2>
            <p className="text-secondary" style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
              Comprehensive training designed for all skill levels.
            </p>
          </div>

          <div className="courses-grid">
            <div className="glass-panel">
              <div className="course-icon"><Code2 size={24} /></div>
              <h3 className="course-title">Core Java</h3>
              <p className="course-desc">Master the fundamentals of Object-Oriented Programming, data structures, and core Java concepts.</p>
            </div>

            <div className="glass-panel">
              <div className="course-icon"><BookMarked size={24} /></div>
              <h3 className="course-title">Advanced Java & Spring Boot</h3>
              <p className="course-desc">Build enterprise-ready web applications, microservices, and robust APIs using the Spring framework.</p>
            </div>

            <div className="glass-panel">
              <div className="course-icon"><Database size={24} /></div>
              <h3 className="course-title">SQL & Databases</h3>
              <p className="course-desc">Learn database design, complex queries, optimization, and relational database management.</p>
            </div>

            <div className="glass-panel">
              <div className="course-icon"><Cloud size={24} /></div>
              <h3 className="course-title">Cloud Computing Basics</h3>
              <p className="course-desc">Get started with AWS, deployment strategies, and modern cloud infrastructure principles.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Services/Benefits Section */}
      <section id="services" className="section benefits-section">
        <div className="container">
          <div className="benefits-grid">
            <div className="benefits-content">
              <h2 style={{ fontSize: '2.5rem', marginBottom: '1.5rem' }}>
                More Than Just <span className="text-gradient">Tutoring</span>
              </h2>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                We provide end-to-end support for your IT journey. Whether you are a student struggling with an assignment or a professional looking to upskill.
              </p>

              <ul className="benefits-list">
                <li className="benefit-item">
                  <CheckCircle className="benefit-icon" size={20} />
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Assignment & Project Help</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>We ensure you never miss a deadline. Get help with your assignments with a full code walkthrough to equip you for the future.</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <CheckCircle className="benefit-icon" size={20} />
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Continuous Support</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>24/7 access to updated tutorial documents and hands-on coding materials.</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <CheckCircle className="benefit-icon" size={20} />
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Job Interview Assistance</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Resume writing support and targeted interview preparation to help you land your dream job.</p>
                  </div>
                </li>
                <li className="benefit-item">
                  <CheckCircle className="benefit-icon" size={20} />
                  <div>
                    <h4 style={{ marginBottom: '0.3rem' }}>Creating Portfolio Website</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Build a professional portfolio website to showcase your skills, projects, and experience to potential employers.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(58, 123, 213, 0.1)', borderRadius: '12px', color: 'var(--accent-blue)' }}>
                  <Users size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>For Students</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Middle School, High School & College</p>
                </div>
              </div>

              <div style={{ width: '100%', height: '1px', background: 'var(--glass-border)' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <div style={{ padding: '1rem', background: 'rgba(0, 210, 255, 0.1)', borderRadius: '12px', color: 'var(--accent-blue)' }}>
                  <Award size={32} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem' }}>For Professionals</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Broaden expertise in modern tech</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="about" className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-col" style={{ gridColumn: 'span 2' }}>
              <div className="nav-logo" style={{ marginBottom: '1rem' }}>
                <span className="text-gradient">&lt;Learn</span>Coding/&gt;
              </div>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '1.5rem', maxWidth: '300px' }}>
                Dedicated to providing high-quality IT education and project support for aspiring tech professionals.
              </p>
              <div className="social-links">
                <a href="https://github.com/prakashg1984/TechPocWorkspace" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Globe size={20} />
                </a>
                <a href="https://www.linkedin.com/in/prakash-ganaesan-b92a9217/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <Briefcase size={20} />
                </a>
                <a href="https://pgtechworkspace941539389.wordpress.com/" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <BookOpen size={20} />
                </a>
              </div>
            </div>

            <div className="footer-col">
              <h3>Quick Links</h3>
              <ul className="footer-links">
                <li><a href="#home">Home</a></li>
                <li><a href="#courses">Courses</a></li>
                <li><a href="#services">Assignment Help</a></li>
                <li><a href="https://www.superprof.ca/core-java-trainer-with-more-than-years-industry-experience-training-basic-and-advanced-java-with-hands-coding-help-with.html#reviews" target="_blank" rel="noopener noreferrer">Google Reviews</a></li>
              </ul>
            </div>

            <div className="footer-col">
              <h3>Contact</h3>
              <ul className="footer-links">
                <li style={{ color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <Phone size={16} /> +1 647.464.0761
                </li>
                <li style={{ color: 'var(--text-secondary)' }}>Available 24/7 for support</li>
                <li>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    style={{ background: 'none', border: 'none', color: 'var(--accent-blue)', cursor: 'pointer', fontSize: '1rem', padding: 0 }}
                  >
                    Send us a message
                  </button>
                </li>
              </ul>
            </div>
          </div>

          <div style={{ textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem', borderTop: '1px solid var(--glass-border)', paddingTop: '2rem' }}>
            &copy; {new Date().getFullYear()} Learn Coding Academy. All rights reserved.
          </div>
        </div>
      </footer>

      {/* Contact Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'active' : ''}`}>
        <div className="modal-content">
          <button className="close-btn" onClick={() => setIsModalOpen(false)}>
            <X size={24} />
          </button>

          <h2 style={{ marginBottom: '0.5rem' }}>Get in <span className="text-gradient">Touch</span></h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem', fontSize: '0.9rem' }}>
            Have a question or need assignment help? Drop us a message.
          </p>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
              <div className="form-group">
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="John Doe"
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Phone (Optional)</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="form-control"
                  placeholder="123-456-7890"
                />
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className="form-control"
                placeholder="john@example.com"
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Subject (Optional)</label>
              <input
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Course Inquiry / Assignment Help"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleInputChange}
                className="form-control"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>

            {formStatus.status === 'success' && (
              <div style={{ color: '#4ade80', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formStatus.message}
              </div>
            )}

            {formStatus.status === 'error' && (
              <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>
                {formStatus.message}
              </div>
            )}

            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: '100%' }}
              disabled={formStatus.status === 'submitting'}
            >
              {formStatus.status === 'submitting' ? 'Sending...' : (
                <>Send Message <Send size={18} /></>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
