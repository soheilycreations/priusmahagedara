import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.grid}`}>
        
        {/* Brand Column */}
        <div className={styles.brandCol}>
          <div className={styles.brand}>
            <img src="/images/cropped-logo-4 (1).png" alt="Prius Mahagedara Logo" className={styles.footerLogo} />
          </div>
          <p className={styles.brandText}>
            Sri Lanka's premier destination for high-quality, reliable, and thoroughly inspected domestic and imported vehicles.
          </p>
          <div className={styles.socials}>
            <a href="#" className={styles.socialIcon} aria-label="Facebook">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M22.675 0H1.325C.593 0 0 .593 0 1.325v21.351C0 23.407.593 24 1.325 24H12.82v-9.294H9.692v-3.622h3.128V8.413c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12V24h6.116c.73 0 1.323-.593 1.323-1.325V1.325C24 .593 23.407 0 22.675 0z"/>
              </svg>
            </a>
            <a href="#" className={styles.socialIcon} aria-label="Instagram">
               <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                 <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
               </svg>
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Useful Links</h4>
          <ul className={styles.linkList}>
            <li><a href="#">Home</a></li>
            <li><a href="#inventory">Inventory</a></li>
            <li><a href="#about">About Us</a></li>
            <li><a href="#">Sell Your Car</a></li>
          </ul>
        </div>

        {/* Information */}
        <div className={styles.linkCol}>
          <h4 className={styles.colTitle}>Information</h4>
          <ul className={styles.linkList}>
            <li><a href="#">FAQ</a></li>
            <li><a href="#">Site Map</a></li>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
          </ul>
        </div>

        {/* Get In Touch */}
        <div className={styles.contactCol}>
          <h4 className={styles.colTitle}>Get In Touch</h4>
          <ul className={styles.contactList}>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Prius Mahagedara<br/>Galle Road, Kalutara (Near the KFC)
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              +94 077 5 400 500
            </li>
            <li>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              danukafernando32@gmail.com
            </li>
          </ul>
        </div>

      </div>
      
      <div className={styles.bottomBar}>
        <div className={`container ${styles.bottomContent}`}>
          <p>&copy; {new Date().getFullYear()} Prius Mahagedara. All Rights Reserved.</p>
          <p className={styles.developer}>Developed by <span style={{ color: 'var(--accent-red)', fontWeight: 600 }}>Soheily Creations</span></p>
        </div>
      </div>
    </footer>
  );
}
