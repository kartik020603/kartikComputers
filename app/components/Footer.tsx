import React from 'react';
import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.footerCol}>
          <h3><span className={styles.logoRed}>Kartik</span> Computers</h3>
          <p>Your trusted partner for all computer, laptop, and CCTV needs in Agra, Mathura, and Firozabad.</p>
        </div>
        <div className={styles.footerCol}>
          <h4>Quick Links</h4>
          <ul>
            <li><Link href="/">Home</Link></li>
            <li><Link href="/store">Store</Link></li>
            <li><Link href="/services">Services</Link></li>
            <li><Link href="/testimonials">Testimonials</Link></li>
          </ul>
        </div>
        <div className={styles.footerCol}>
          <h4>Contact Info</h4>
          <ul>
            <li>📍 Kartik Computers, Agra</li>
            <li>📞 +91 84106 17268</li>
            <li>✉️ ravikartikcomputers@gmail.com</li>
          </ul>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <p>&copy; {new Date().getFullYear()} Kartik Computers. All Rights Reserved.</p>
      </div>
    </footer>
  );
}
