"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HappyCustomers.module.css';

export default function HappyCustomersSlider({ feedbacks }) {
  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    if (carousel.current) {
      setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
    }
  }, [feedbacks]);

  return (
    <div className={styles.sliderWrapper}>
      <motion.div 
        ref={carousel} 
        className={styles.carousel}
        whileTap={{ cursor: "grabbing" }}
      >
        <motion.div 
          drag="x" 
          dragConstraints={{ right: 0, left: -width }}
          className={styles.innerCarousel}
        >
          {feedbacks.map((f) => (
            <motion.div key={f.id} className={styles.carouselItem}>
              <div className={styles.portraitCard}>
                {f.media_type === 'video' ? (
                  <video src={f.media_url} className={styles.portraitMedia} controls muted />
                ) : (
                  <img src={f.media_url} alt={f.caption} className={styles.portraitMedia} />
                )}
                <div className={styles.portraitOverlay}>
                  <div className={styles.ratingStars}>
                    {'★'.repeat(f.rating || 5)}{'☆'.repeat(5 - (f.rating || 5))}
                  </div>
                  <p className={styles.portraitCaption}>{f.caption}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
      
      <div className={styles.dragHint}>
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
        </svg>
        Drag to explore
      </div>
    </div>
  );
}
