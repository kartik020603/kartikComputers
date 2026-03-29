'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const isDarkHeroPage = pathname === '/' || pathname === '/about';

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''} ${isDarkHeroPage && !scrolled ? styles.transparentHome : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoRed}>Kartik</span> Computers
        </Link>
        
        <button 
          className={styles.hamburger} 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle navigation"
        >
          <span className={`${styles.bar} ${isOpen ? styles.barOpen1 : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen2 : ''}`}></span>
          <span className={`${styles.bar} ${isOpen ? styles.barOpen3 : ''}`}></span>
        </button>

        <div className={`${styles.navLinks} ${isOpen ? styles.navLinksOpen : ''}`}>
          <Link href="/">Home</Link>
          <Link href="/store">Store</Link>
          <div className={styles.dropdown}>
            <button className={styles.dropbtn}>Services ▼</button>
            <div className={styles.dropdownContent}>
              <Link href="/services/window-installation">Window Installation</Link>
              <Link href="/services/cctv-support">CCTV Support</Link>
              <Link href="/services/data-recovery">Data Recovery</Link>
              <Link href="/services/web-development">Web Development</Link>
              <Link href="/services/laptop-repair">Laptop / Desktop Repair</Link>
            </div>
          </div>
          <Link href="/about">About Us</Link>
          <Link href="/testimonials">Testimonials</Link>
          <Link href="/contact">Contact Us</Link>
        </div>
      </div>
    </nav>
  );
}
