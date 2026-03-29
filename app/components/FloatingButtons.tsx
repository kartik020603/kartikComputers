'use client';
import React from 'react';
import styles from './FloatingButtons.module.css';

export default function FloatingButtons() {
  return (
    <div className={styles.floatingContainer}>
      <a href="tel:+918410617268" className={`${styles.floatBtn} ${styles.callBtn} ${styles.bounceBtn}`} aria-label="Call Us">
        📞 Call
      </a>
      <a href="https://wa.me/918410617268?text=Hello%20Kartik%20Computers!" target="_blank" rel="noopener noreferrer" className={`${styles.floatBtn} ${styles.whatsappBtn}`} aria-label="WhatsApp">
        💬 WhatsApp
      </a>
    </div>
  );
}
