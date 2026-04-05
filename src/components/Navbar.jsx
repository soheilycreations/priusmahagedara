"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.navContainer}`}>
        <Link href="/" className={styles.logo}>
          <img src="/images/cropped-logo-4 (1).png" alt="Prius Mahagedara Logo" className={styles.logoImg} />
        </Link>
        
        <div className={styles.links}>
          <Link href="/inventory" className={styles.link}>Inventory</Link>
          <Link href="/#about" className={styles.link}>About Us</Link>
          <Link href="/#services" className={styles.link}>Services</Link>
          <Link href="/#leasing" className={styles.link}>Leasing</Link>
          <Link href="/#sell" className={styles.cta}>Sell Your Car</Link>
        </div>
      </div>
    </nav>
  );
}
