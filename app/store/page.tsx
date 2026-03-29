'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './page.module.css';

type Product = {
  id: string;
  name: string;
  price: number;
  category: string;
  images: string;
  description: string;
  stock: number;
  specs: string;
};

export default function Store() {
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(data => {
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error('Expected array but got:', data);
          setProducts([]);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const filtered = products.filter(p => {
    const s = search.toLowerCase();
    const matchSearch = 
      p.name.toLowerCase().includes(s) || 
      (p.description && p.description.toLowerCase().includes(s)) ||
      (p.specs && p.specs.toLowerCase().includes(s));

    const matchCat = category === 'All' || p.category.toLowerCase().includes(category.toLowerCase());
    return matchSearch && matchCat;
  });

  return (
    <div className={`container ${styles.storeLayout}`}>
      <h1 className="section-title">Kartik <span>Store</span></h1>
      
      <div className={styles.filters}>
        <input 
          type="text" 
          placeholder="Search products..." 
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select 
          className={styles.categorySelect} 
          value={category} 
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="All">All Categories</option>
          <option value="desktop">Desktop</option>
          <option value="new laptop">New Laptops</option>
          <option value="refurbished laptop">Refurbished Laptops</option>
          <option value="cctv camera">CCTV Cameras</option>
        </select>
      </div>

      {loading ? (
        <div className={styles.loader}>Loading amazing products...</div>
      ) : filtered.length === 0 ? (
        <div className={styles.noResults}>No products found matching your criteria.</div>
      ) : (
        <div className={styles.productGrid}>
          {filtered.map(product => {
            const images = JSON.parse(product.images || '[]');
            const mainImg = images.length > 0 ? images[0] : '/placeholder.png'; // Fallback

            return (
              <Link href={`/store/${product.id}`} key={product.id} className={styles.productCard}>
                <div className={styles.productImage}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={mainImg} alt={product.name} />
                </div>
                <div className={styles.productInfo}>
                  <span className={styles.badge}>{product.category}</span>
                  <h3>{product.name}</h3>
                  <p className={styles.shortDesc}>
                    {product.description.length > 50 ? product.description.substring(0, 50) + '...' : product.description}
                  </p>
                  
                  <div className={styles.stockInfo}>
                    {product.stock > 0 && product.stock <= 10 && (
                      <span className={styles.hurryText}>⚡ Hurry! Only {product.stock} left</span>
                    )}
                    {product.stock > 10 && (
                      <span className={styles.stockText}>✓ In Stock</span>
                    )}
                    {product.stock === 0 && (
                      <span className={styles.outOfStock}>✗ Out of Stock</span>
                    )}
                  </div>

                  <p className={styles.price}>₹{product.price.toLocaleString()}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
