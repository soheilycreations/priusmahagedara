"use client";

import { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './HappyCustomers.module.css';

export default function HappyCustomersSlider({ feedbacks }) {
  const [scrollX, setScrollX] = useState(0);
  const [maxWidth, setMaxWidth] = useState(0);
  const carousel = useRef();
  const itemWidth = 344; // 320px item + 24px gap

  useEffect(() => {
    if (carousel.current) {
      const scrollWidth = carousel.current.scrollWidth;
      const offsetWidth = carousel.current.offsetWidth;
      setMaxWidth(scrollWidth - offsetWidth);
    }
  }, [feedbacks]);

  // Auto-scroll logic
  useEffect(() => {
    const interval = setInterval(() => {
      setScrollX((prev) => {
        const next = prev - 1;
        if (Math.abs(next) >= maxWidth) return 0;
        return next;
      });
    }, 30); // Smooth slow scroll

    return () => clearInterval(interval);
  }, [maxWidth]);

  const handleNext = () => {
    setScrollX(prev => Math.max(prev - itemWidth, -maxWidth));
  };

  const handlePrev = () => {
    setScrollX(prev => Math.min(prev + itemWidth, 0));
  };

  return (
    <div className={styles.sliderWrapper}>
      <div className={styles.carouselContainer}>
        <button className={`${styles.navBtn} ${styles.prevBtn}`} onClick={handlePrev}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>

        <motion.div 
          ref={carousel} 
          className={styles.carousel}
        >
          <motion.div 
            animate={{ x: scrollX }}
            transition={{ type: "tween", ease: "linear", duration: 0 }} // Smooth for auto-scroll
            style={{ transition: scrollX % itemWidth === 0 ? '0.5s ease-out' : 'none' }} // Ease for buttons
            className={styles.innerCarousel}
          >
            {feedbacks.map((f) => (
              <div key={f.id} className={styles.carouselItem}>
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
              </div>
            ))}
            {/* Duplicate for infinite loop if needed, but let's keep it simple for now as per user request */}
          </motion.div>
        </motion.div>

        <button className={`${styles.navBtn} ${styles.nextBtn}`} onClick={handleNext}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      <div className={styles.dragHint}>
        Auto-scrolling happy moments
      </div>
    </div>
  );
}
