import Link from 'next/link';
import styles from './layout.module.css';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <div className={styles.logo}>
          <span className={styles.logoRed}>Kartik</span> Admin
        </div>
        <nav className={styles.nav}>
          <Link href="/admin/products" className={styles.navLink}>Products Management</Link>
          <Link href="/admin/enquiries" className={styles.navLink}>View Enquiries</Link>
          <a href="/" target="_blank" className={styles.navLink} style={{marginTop: 'auto', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px'}}>View Website ↗</a>
        </nav>
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
