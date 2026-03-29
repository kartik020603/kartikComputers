'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

type Enquiry = { id: string; name: string; mobile: string; description: string; address: string; status: string; createdAt: string };

const STATUS_OPTIONS = ['not viewed', 'follow up', 'enquiry fulfiled'];

export default function AdminEnquiries() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [filter, setFilter] = useState('ALL');
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => { loadEnquiries(); }, []);

  const loadEnquiries = async () => {
    const res = await fetch('/api/enquiries');
    const data = await res.json();
    setEnquiries(data);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    await fetch(`/api/enquiries/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus })
    });
    loadEnquiries(); // Reload smooth
  };

  const deleteEnquiry = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/enquiries/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    loadEnquiries();
  };

  const filtered = filter === 'ALL' ? enquiries : enquiries.filter(e => e.status === filter);

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Enquiries Management</h1>
        <div className={styles.filterBox}>
          <label>Status Filter:</label>
          <select value={filter} onChange={e => setFilter(e.target.value)}>
            <option value="ALL">All Enquiries</option>
            {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
          </select>
        </div>
      </div>

      <div className={styles.cardGrid}>
         {filtered.length === 0 ? (
           <p className={styles.empty}>No enquiries found matching this filter.</p>
         ) : (
           filtered.map(eq => (
             <div key={eq.id} className={styles.enqCard}>
               <div className={styles.cardHeader}>
                  <select 
                    value={eq.status || 'not viewed'} 
                    onChange={e => updateStatus(eq.id, e.target.value)}
                    className={`${styles.statusSelect} ${styles[eq.status.replace(' ', '')] || styles.statusDefault}`}
                  >
                    {STATUS_OPTIONS.map(opt => <option key={opt} value={opt}>{opt}</option>)}
                  </select>
                  <span className={styles.date}>{new Date(eq.createdAt).toLocaleString()}</span>
               </div>
               <h3>{eq.name}</h3>
               <div className={styles.contactInfo}>
                 <p>📞 {eq.mobile}</p>
                 <p>📍 {eq.address}</p>
               </div>
               <div className={styles.descBox}>
                 <strong>Message:</strong>
                 <p>{eq.description}</p>
               </div>
               <div className={styles.actionsBox}>
                 <button className={styles.delBtn} onClick={() => deleteEnquiry(eq.id)}>Delete Enquiry</button>
               </div>
             </div>
           ))
         )}
      </div>

      {deleteId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '400px' }}>
            <h2>Confirm Delete</h2>
            <p style={{ color: '#555', marginBottom: '20px' }}>Are you sure you want to permanently delete this enquiry? This action cannot be undone.</p>
            <div className={styles.modalActions}>
              <button onClick={() => setDeleteId(null)} className="btn" style={{backgroundColor: '#e2e8f0', color: '#333'}}>Cancel</button>
              <button onClick={confirmDelete} className="btn" style={{backgroundColor: 'var(--primary-red)', color: 'white'}}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
