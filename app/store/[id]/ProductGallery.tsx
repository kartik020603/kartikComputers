'use client';
import { useState, useEffect } from 'react';
import styles from './product.module.css';

export default function ProductGallery({ images, name }: { images: string[], name: string }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isEnlarged, setIsEnlarged] = useState(false);

  const mainImg = images.length > 0 ? images[currentIndex] : '/placeholder.png';

  // Prevent background scrolling when enraged
  useEffect(() => {
    if (isEnlarged) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isEnlarged]);

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <>
      <div className={styles.imageSection}>
        <div className={styles.mainImageWrapper} onClick={() => images.length > 0 && setIsEnlarged(true)}>
          <img src={mainImg} alt={name} className={styles.mainImage} title="Click to enlarge" />
          <div className={styles.enlargeHint}>🔍 Click to Enlarge</div>
        </div>
        
        {images.length > 1 && (
          <div className={styles.thumbnailGrid}>
            {images.map((img, idx) => (
              <img 
                key={idx} 
                src={img} 
                alt={`${name} ${idx}`} 
                className={`${styles.thumbnail} ${currentIndex === idx ? styles.activeThumb : ''}`} 
                onClick={() => setCurrentIndex(idx)}
              />
            ))}
          </div>
        )}
      </div>

      {isEnlarged && (
        <div className={styles.lightboxOverlay} onClick={() => setIsEnlarged(false)}>
          <button className={styles.closeBtn} onClick={() => setIsEnlarged(false)}>✕</button>
          
          <div className={styles.lightboxContent} onClick={e => e.stopPropagation()}>
            {images.length > 1 && (
              <button className={styles.navBtnPrev} onClick={handlePrev}>‹</button>
            )}
            
            <img src={mainImg} alt={name} className={styles.enlargedImage} />
            
            {images.length > 1 && (
              <button className={styles.navBtnNext} onClick={handleNext}>›</button>
            )}
          </div>

          {images.length > 1 && (
            <div className={styles.lightboxThumbnails} onClick={e => e.stopPropagation()}>
              {images.map((img, idx) => (
                <img 
                  key={idx} 
                  src={img} 
                  alt={`${name} ${idx}`} 
                  className={`${styles.lightboxThumb} ${currentIndex === idx ? styles.activeLightboxThumb : ''}`} 
                  onClick={() => setCurrentIndex(idx)}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
