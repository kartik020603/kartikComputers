import Image from 'next/image';
import styles from './page.module.css';

export default function Home() {
  return (
    <div className={styles.homeContainer}>
      {/* Hero Section */}
      <section className={styles.heroSection}>
        <div className={styles.carousel}>
          <div className={styles.carouselTrack}>
             <div className={styles.carouselItem}><Image src="/images/hero1.png" alt="Hero 1" fill style={{objectFit: 'cover'}} priority /></div>
             <div className={styles.carouselItem}><Image src="/images/hero2.png" alt="Hero 2" fill style={{objectFit: 'cover'}} priority /></div>
             <div className={styles.carouselItem}><Image src="/images/hero3.png" alt="Hero 3" fill style={{objectFit: 'cover'}} priority /></div>
             {/* Duplicate for infinite effect */}
             <div className={styles.carouselItem}><Image src="/images/hero1.png" alt="Hero 1" fill style={{objectFit: 'cover'}} /></div>
             <div className={styles.carouselItem}><Image src="/images/hero2.png" alt="Hero 2" fill style={{objectFit: 'cover'}} /></div>
             <div className={styles.carouselItem}><Image src="/images/hero3.png" alt="Hero 3" fill style={{objectFit: 'cover'}} /></div>
          </div>
        </div>
        <div className={styles.heroOverlay}>
          <h1 className="animate-fade-up">Welcome to <span style={{color: 'var(--primary-red)'}}>Kartik</span> Computers</h1>
          <p className="animate-fade-up" style={{ animationDelay: '0.2s' }}>
            Your Trusted Technology Partner in Agra, Mathura, and Firozabad.
          </p>
          <div className={`${styles.heroButtons} animate-fade-up`} style={{ animationDelay: '0.4s' }}>
             <a href="/store" className="btn btn-red">Explore Store</a>
             <a href="/services" className="btn btn-blue">Our Services</a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className={`container ${styles.servicesSection}`}>
        <h2 className="section-title">Our <span>Services</span></h2>
        <div className={styles.servicesGrid}>
          {['CCTV Installation', 'Window Installation', 'Laptop/Desktop Repair', 'New Laptops', 'Old Laptops', 'Gaming Assembled Systems'].map((service, index) => (
            <div key={index} className={styles.serviceCard}>
               <div className={styles.serviceIcon}>⚙️</div>
               <h3>{service}</h3>
               <p>Professional setup, repair, and maintenance with a focus on premium quality.</p>
            </div>
          ))}
        </div>
      </section>

      {/* Reviews Section */}
      <section className={styles.reviewsSection}>
        <div className="container">
          <h2 className="section-title" style={{color: 'white'}}>Customer <span>Reviews</span></h2>
          <div className={styles.reviewsGrid}>
            {[
              {loc: 'Agra', text: 'Fastest laptop repair in town. Very professional and reliable!'}, 
              {loc: 'Mathura', text: 'Got my CCTV installed! Neat wiring and crisp video quality.'},
              {loc: 'Firozabad', text: 'Purchased a refurbished laptop, works absolutely flawlessly like brand new!'},
              {loc: 'India', text: 'The absolute best place to assemble a high-end gaming PC efficiently.'}
            ].map((rev, idx) => (
              <div key={idx} className={styles.reviewCard}>
                <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
                <p>"{rev.text}"</p>
                <h4>Happy Customer, {rev.loc}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Trust Us */}
      <section className={`container ${styles.trustSection}`}>
        <h2 className="section-title">Why <span>Trust Us?</span></h2>
        <div className={styles.trustGrid}>
           <div className={styles.trustItem}>
              <h3>10+ Years Experience</h3>
              <p>We boast a decade of solid experience in computer electronics and sales.</p>
           </div>
           <div className={styles.trustItem}>
              <h3>Certified Technicians</h3>
              <p>Our team consists of highly trained and certified hardware specialists.</p>
           </div>
           <div className={styles.trustItem}>
              <h3>Quality Assured</h3>
              <p>Everything from CCTV networks to assembled gaming rigs is stringently tested.</p>
           </div>
        </div>
      </section>
    </div>
  );
}
