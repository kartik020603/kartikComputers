import styles from './page.module.css';

export const metadata = { title: 'Testimonials | Kartik Computers' };

export default function Testimonials() {
  const reviews = [
    { loc: 'Agra', name: 'Ravi Kumar', text: 'Fastest laptop repair in town. Very professional, highly recommended for any tech issues!' },
    { loc: 'Mathura', name: 'Amit Singh', text: 'Got my CCTV installed. The wiring is incredibly neat and the camera quality is crisp 1080p.' },
    { loc: 'Firozabad', name: 'Sneha Gupta', text: 'Purchased a refurbished laptop for college, it works flawlessly like a brand new machine!' },
    { loc: 'India', name: 'Rahul Sharma', text: 'The absolute best place to assemble a high-end gaming PC. They know exactly what parts to pick.' },
    { loc: 'Agra', name: 'Priya Mehra', text: 'Excellent data recovery service. They saved all my important files from a dead hard drive.' },
    { loc: 'Mathura', name: 'Anil Dash', text: 'Windows installation was quick, affordable, and they even installed basic utilities for me.' },
    { loc: 'Firozabad', name: 'Kiran T.', text: 'Their CCTV support is unmatched! A technician came right over when my camera went offline.' },
    { loc: 'Agra', name: 'Deepak V', text: 'Amazing collection of new laptops with the latest configurations. Pricing is very competitive.' },
    { loc: 'India', name: 'Sumit R.', text: 'Very trustworthy folks. Will definitely recommend Kartik Computers to all my friends and family.' },
    { loc: 'Agra', name: 'Sanjay K.', text: 'Fixed my desktop motherboard issue within a single day. Brilliant technical expertise.' },
  ];

  return (
    <div className={`container ${styles.testiLayout}`}>
      <h1 className="section-title">Customer <span>Testimonials</span></h1>
      <p className={styles.subtitle}>See what our happy customers have to say about our 5-star reliable tech services!</p>
      
      <div className={styles.reviewsGrid}>
         {reviews.map((r, i) => (
           <div key={i} className={styles.reviewCard}>
             <div className={styles.stars}>⭐⭐⭐⭐⭐</div>
             <p className={styles.text}>"{r.text}"</p>
             <div className={styles.author}>
               <h4>{r.name}</h4>
               <span>{r.loc}</span>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
