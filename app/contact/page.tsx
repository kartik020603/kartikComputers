'use client';
import { useState } from 'react';
import styles from './page.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', mobile: '', description: '', address: '' });
  const [status, setStatus] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    try {
      const res = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) {
        setStatus('Success! Your enquiry has been sent. We will contact you soon.');
        setFormData({ name: '', mobile: '', description: '', address: '' });
      } else {
        setStatus('Failed to send enquiry. Please try again.');
      }
    } catch (error) {
       setStatus('Error submitting form.');
    }
  };

  return (
    <div className={`container ${styles.contactLayout}`}>
       <h1 className="section-title">Contact <span>Us</span></h1>
       <div className={styles.contactGrid}>
          <div className={styles.infoBox}>
            <h2 className={styles.boxTitle}>Get In Touch</h2>
            <div className={styles.infoItem}>
               <span className={styles.icon}>📞</span>
               <div>
                 <h4>Mobile</h4>
                 <p>+91 84106 17268</p>
               </div>
            </div>
            <div className={styles.infoItem}>
               <span className={styles.icon}>✉️</span>
               <div>
                 <h4>Email</h4>
                 <p>ravikartikcomputers@gmail.com</p>
               </div>
            </div>
            <div className={styles.infoItem}>
               <span className={styles.icon}>📍</span>
               <div>
                 <h4>Location</h4>
                 <p>Kartik Computers, Agra, UP, India</p>
               </div>
            </div>
            
            <div className={styles.mapContainer}>
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3548.2490450187706!2d77.98690697528245!3d27.21132967647052!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x397477646b7d0499%3A0x4d7285c31e56a71c!2sKartik%20Computers!5e0!3m2!1sen!2sin!4v1774780061266!5m2!1sen!2sin" 
                width="100%" 
                height="280" 
                style={{border: 0, borderRadius: '12px'}} 
                allowFullScreen={true} 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade">
              </iframe>
            </div>
          </div>
          
          <div className={styles.formBox}>
            <h2 className={styles.boxTitle}>Book an Enquiry</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="Your full name" />
              </div>
              <div className={styles.inputGroup}>
                <label>Mobile No.</label>
                <input required type="text" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} placeholder="+91 84106..." />
              </div>
              <div className={styles.inputGroup}>
                <label>Address</label>
                <input required type="text" value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} placeholder="Area, City, PIN" />
              </div>
              <div className={styles.inputGroup}>
                <label>Enquiry Description</label>
                <textarea required rows={5} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} placeholder="How can we help you?"></textarea>
              </div>
              <button type="submit" className={`btn btn-red ${styles.submitBtn}`} disabled={status === 'Submitting...'}>Submit Enquiry</button>
              {status && <p className={styles.statusMsg}>{status}</p>}
            </form>
          </div>
       </div>
    </div>
  );
}
