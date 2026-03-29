import { notFound } from 'next/navigation';
import prisma from '@/lib/prisma';
import Link from 'next/link';
import styles from './product.module.css';
import ProductGallery from './ProductGallery';
import { Product } from '@prisma/client';

export default async function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  const product = await prisma.product.findUnique({
    where: { id }
  });

  if (!product) return notFound();

  // Parse details
  const images: string[] = JSON.parse(product.images || '[]');
  const specs: string[] = JSON.parse(product.specs || '[]');
  const mainImg = images.length > 0 ? images[0] : '/placeholder.png';

  // Fetch related products (same category, exclude current)
  const related = await prisma.product.findMany({
    where: { 
      category: product.category,
      id: { not: product.id }
    },
    take: 3
  });

  const whatsappMessage = encodeURIComponent(`Hello Kartik Computers! I want to order this product: ${product.name} (Price: ₹${product.price}).`);

  return (
    <div className={`container ${styles.detailLayout}`}>
      <div className={styles.productSplit}>
        <ProductGallery images={images} name={product.name} />

        <div className={styles.infoSection}>
          <span className={styles.badge}>{product.category}</span>
          <h1 className={styles.title}>{product.name}</h1>
          <p className={styles.price}>₹{product.price.toLocaleString()}</p>
          
          <div className={styles.stockStatus}>
            {product.stock > 0 ? (
              <span className={styles.inStock}>✓ In Stock ({product.stock} available)</span>
            ) : (
              <span className={styles.outOfStock}>✗ Out of Stock</span>
            )}
          </div>

          <p className={styles.description}>{product.description}</p>
          
          {specs.length > 0 && (
             <div className={styles.specs}>
               <h3>Specifications</h3>
               <ul>
                 {specs.map((spec, idx) => <li key={idx}>{spec}</li>)}
               </ul>
             </div>
          )}

          <a 
            href={`https://wa.me/918410617268?text=${whatsappMessage}`} 
            target="_blank" 
            rel="noopener noreferrer"
            className={`btn btn-red ${styles.orderBtn}`}
          >
            🛒 Order via WhatsApp
          </a>
        </div>
      </div>

      {related.length > 0 && (
        <div className={styles.relatedSection}>
           <h2 className="section-title">Related <span>Products</span></h2>
           <div className={styles.relatedGrid}>
             {related.map((rel: Product) => {
                const relImages = JSON.parse(rel.images || '[]');
                const relImg = relImages.length > 0 ? relImages[0] : '/placeholder.png';
                return (
                  <Link href={`/store/${rel.id}`} key={rel.id} className={styles.relatedCard}>
                    <img src={relImg} alt={rel.name} />
                    <h4>{rel.name}</h4>
                    <p>₹{rel.price.toLocaleString()}</p>
                  </Link>
                );
             })}
           </div>
        </div>
      )}
    </div>
  );
}
