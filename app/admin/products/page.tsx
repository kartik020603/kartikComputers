'use client';
import { useState, useEffect } from 'react';
import styles from './page.module.css';

type Product = { id: string; name: string; description: string; price: number; stock: number; category: string; images: string; specs: string };

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [formData, setFormData] = useState({ id: '', name: '', description: '', price: 0, stock: 0, category: 'desktop', specs: '' });
  const [files, setFiles] = useState<FileList | null>(null);

  useEffect(() => { loadProducts(); }, []);

  const loadProducts = async () => {
    const res = await fetch('/api/products');
    setProducts(await res.json());
  };

  const handleEdit = (p: Product) => {
    setFormData({ 
      id: p.id, 
      name: p.name, 
      description: p.description, 
      price: p.price, 
      stock: p.stock, 
      category: p.category, 
      specs: JSON.parse(p.specs || '[]').join('\n') 
    });
    setFiles(null);
    setShowModal(true);
  };

  const handleDelete = (id: string) => {
    setDeleteId(id);
  };

  const confirmDelete = async () => {
    if (!deleteId) return;
    await fetch(`/api/products/${deleteId}`, { method: 'DELETE' });
    setDeleteId(null);
    loadProducts();
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    let imageUrls: string[] = [];

    if (formData.id) {
       const existing = products.find(p => p.id === formData.id);
       if (existing) imageUrls = JSON.parse(existing.images || '[]');
    }

    if (files && files.length > 0) {
      const uploadData = new FormData();
      for (let i = 0; i < files.length; i++) uploadData.append('files', files[i]);
      const res = await fetch('/api/upload', { method: 'POST', body: uploadData });
      const data = await res.json();
      if (data.urls) imageUrls = data.urls;
    }

    const payload = {
      name: formData.name,
      description: formData.description,
      price: Number(formData.price),
      stock: Number(formData.stock),
      category: formData.category,
      specs: JSON.stringify(formData.specs.split('\n').map(s=>s.trim()).filter(s => s)),
      images: JSON.stringify(imageUrls)
    };

    if (formData.id) {
       await fetch(`/api/products/${formData.id}`, { method: 'PUT', body: JSON.stringify(payload) });
    } else {
       await fetch('/api/products', { method: 'POST', body: JSON.stringify(payload) });
    }

    setShowModal(false);
    loadProducts();
  };

  return (
    <div className={styles.adminContainer}>
      <div className={styles.header}>
        <h1>Products Management</h1>
        <button className="btn btn-blue" onClick={() => { setFormData({ id: '', name: '', description: '', price: 0, stock: 0, category: 'desktop', specs: '' }); setShowModal(true); }}>+ Add Product</button>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map(p => (
              <tr key={p.id}>
                <td style={{fontWeight: 600}}>{p.name}</td>
                <td style={{textTransform: 'capitalize'}}>{p.category}</td>
                <td style={{color: 'var(--primary-red)', fontWeight: 'bold'}}>₹{p.price}</td>
                <td>
                  <span className={p.stock > 0 ? styles.stockIn : styles.stockOut}>
                    {p.stock > 0 ? `${p.stock} in stock` : 'Out of stock'}
                  </span>
                </td>
                <td>
                  <div className={styles.actionsBox}>
                    <button className={styles.editBtn} onClick={() => handleEdit(p)}>Edit</button>
                    <button className={styles.delBtn} onClick={() => handleDelete(p.id)}>Delete</button>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && <tr><td colSpan={5} style={{textAlign: 'center', padding: '40px'}}>No products found. Add one to get started.</td></tr>}
          </tbody>
        </table>
      </div>

      {showModal && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2>{formData.id ? 'Edit Product' : 'Add New Product'}</h2>
            <form onSubmit={handleSave} className={styles.form}>
              <div className={styles.inputGroup}>
                <label>Product Name</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div className={styles.row}>
                <div className={styles.inputGroup}>
                  <label>Price (₹)</label>
                  <input required type="number" min="0" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Stock Count</label>
                  <input required type="number" min="0" value={formData.stock} onChange={e => setFormData({...formData, stock: Number(e.target.value)})} />
                </div>
                <div className={styles.inputGroup}>
                  <label>Category</label>
                  <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                    <option value="desktop">Desktop</option>
                    <option value="new laptop">New Laptop</option>
                    <option value="refurbished laptop">Refurbished Laptop</option>
                    <option value="cctv camera">CCTV Camera</option>
                  </select>
                </div>
              </div>
              <div className={styles.inputGroup}>
                <label>Description</label>
                <textarea required rows={4} value={formData.description} onChange={e => setFormData({...formData, description: e.target.value})} />
              </div>
              <div className={styles.inputGroup}>
                <label>Specifications (One per line)</label>
                <textarea rows={4} value={formData.specs} onChange={e => setFormData({...formData, specs: e.target.value})} placeholder="Intel i7 12th Gen&#10;16GB RAM&#10;512GB SSD" />
              </div>
              <div className={styles.inputGroup}>
                <label>Upload Photos (Overrides existing images)</label>
                <input type="file" multiple accept="image/*" onChange={e => setFiles(e.target.files)} className={styles.fileInput} />
              </div>
              
              <div className={styles.modalActions}>
                <button type="button" onClick={() => setShowModal(false)} className="btn" style={{backgroundColor: '#e2e8f0', color: '#333'}}>Cancel</button>
                <button type="submit" className="btn btn-blue">{formData.id ? 'Update Product' : 'Save Product'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {deleteId && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent} style={{ maxWidth: '400px' }}>
            <h2>Confirm Delete</h2>
            <p style={{ color: '#555', marginBottom: '20px' }}>Are you sure you want to permanently delete this product? This action cannot be undone.</p>
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
