import { notFound } from 'next/navigation';
import styles from './page.module.css';

const servicesContent: Record<string, { title: string, desc: string, points: string[] }> = {
  'window-installation': {
    title: 'Window Installation & Software Setup',
    desc: 'Get your operating system installed cleanly and quickly. From Windows 10/11 formats to complete software packages tailored for your needs.',
    points: ['Genuine OS installation', 'Driver updates and setup', 'Basic utility software package', 'Data backup before format'],
  },
  'cctv-support': {
    title: 'CCTV Support & Installation',
    desc: 'Protect your home or business with premium CCTV security solutions. We offer high-definition cameras with night-vision and remote phone viewing.',
    points: ['Professional wiring and routing', 'DVR/NVR configuration', 'Mobile app linkage', 'Maintenance and repairs'],
  },
  'data-recovery': {
    title: 'Professional Data Recovery',
    desc: 'Accidentally deleted files or a failing hard drive? Our expert data recovery services can securely retrieve your lost documents and memories.',
    points: ['Hard Drive (HDD) Recovery', 'SSD Data Recovery', 'Corrupt partition restoration', 'Secure and confidential process'],
  },
  'web-development': {
    title: 'Web Development Services',
    desc: 'Boost your business presence online with our modern web development services. We build websites that are beautiful, fast, and responsive.',
    points: ['Custom UI/UX Design', 'E-commerce Solutions', 'SEO Optimization', 'Domain & Hosting Setup'],
  },
  'laptop-repair': {
    title: 'Laptop & Desktop Repair',
    desc: 'From hardware upgrades to complex motherboard repairs, our certified technicians can fix any issue preventing your computer from running smoothly.',
    points: ['Screen replacements', 'Battery & Keyboard change', 'Motherboard chip-level repair', 'RAM/SSD Upgrades'],
  }
};

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const content = servicesContent[slug];
  if (!content) return notFound();

  const waMsg = encodeURIComponent(`Hello, I'm interested in your service: ${content.title}`);

  return (
    <div className={`container ${styles.serviceLayout}`}>
      <div className={styles.heroBox}>
         <h1 className="animate-fade-up">{content.title}</h1>
         <p className="animate-fade-up" style={{animationDelay: '0.2s'}}>{content.desc}</p>
      </div>

      <div className={styles.imageGrid}>
        <div className={styles.imageBannerWrapper}>
          <img src={`/services/${slug}.png`} alt={content.title} className={styles.serviceImageBanner} />
        </div>
        <div className={styles.imageBannerWrapper}>
          <img src={`/services/${slug}-2.png`} alt={`${content.title} 2`} className={styles.serviceImageBanner} />
        </div>
      </div>

      <div className={styles.detailsGrid}>
         <div className={styles.pointsCard}>
            <h2>Why Choose <span style={{color: 'var(--primary-red)'}}>Us?</span></h2>
            <ul>
              {content.points.map((pt, idx) => (
                <li key={idx}>✓ {pt}</li>
              ))}
            </ul>
         </div>

         <div className={styles.ctaCard}>
            <h2>Ready to proceed?</h2>
            <p>We provide the best technicians in Agra, Mathura, and Firozabad. Contact us today!</p>
             <a 
               href={`https://wa.me/918410617268?text=${waMsg}`} 
               target="_blank" 
               rel="noopener noreferrer"
               className={`btn btn-red ${styles.waBtn}`}
             >
               Enquire on WhatsApp
             </a>
         </div>
      </div>
    </div>
  );
}
