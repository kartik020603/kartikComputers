import styles from './page.module.css';
import Link from 'next/link';

export default function About() {
  return (
    <div className={styles.aboutContainer}>
      <div className={styles.heroSection}>
        <h1>About <span className={styles.primaryRed}>Kartik</span> Computers</h1>
        <p className={styles.subtitle}>21 Years of Excellence in Technology</p>
      </div>
      
      <div className={`container ${styles.contentSection}`}>
        <div className={styles.grid}>
          <div className={styles.textContent}>
            <h2>Our Legacy in Agra</h2>
            <p>
              Established over <strong>21 years ago</strong>, Kartik Computers has grown to become the most trusted technology partner in Agra, Mathura, and Firozabad. What started as a small service center has blossomed into a comprehensive sales and support hub specializing in Laptops, Desktops, Data Recovery, Web Development, and Enterprise CCTV Security.
            </p>
            <p>
              Our longevity is built on a very simple premise: <strong>honesty, premium quality, and unmatched after-sales support</strong>. We don't just sell computers; we provide lifelong technology solutions tailored exactly to your personal or business needs.
            </p>
            <div className={styles.milestones}>
              <div className={styles.milestone}>
                <span className={styles.number}>21+</span>
                <span className={styles.label}>Years Experience</span>
              </div>
              <div className={styles.milestone}>
                <span className={styles.number}>10k+</span>
                <span className={styles.label}>Happy Customers</span>
              </div>
              <div className={styles.milestone}>
                <span className={styles.number}>100%</span>
                <span className={styles.label}>Commitment</span>
              </div>
            </div>
            
            <Link href="/contact" className={`btn btn-blue ${styles.ctaBtn}`}>Get In Touch With Us</Link>
          </div>
          
          <div className={styles.imageContent}>
            <div className={styles.imagePlaceholder}>
               <img src="/about-us.png" alt="Kartik Computers Store Interior" className={styles.storePhoto} />
               <div className={styles.trustedBadge}>
                 Since 2005
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
