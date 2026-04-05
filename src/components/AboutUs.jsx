import styles from './AboutUs.module.css';

export default function AboutUs() {
  return (
    <section className={styles.section} id="about">
      <div className={`container ${styles.container}`}>
        <div className={styles.textContent}>
          <h2 className="section-title">The <span style={{ color: 'var(--accent-red)' }}>Prius Mahagedara</span> Difference</h2>
          <p className={styles.description}>
            Browse our extensive selection of premium vehicles, each thoroughly inspected for reliability and safety. Whether you're looking for an efficient compact model for city driving or a robust, spacious option for family trips, we have the right car for you.
          </p>
          
          <div className={styles.features}>
            <div className={styles.feature}>
              <div className={styles.iconBox}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h4 className={styles.featureTitle}>Thoroughly Inspected</h4>
                <p className={styles.featureText}>Every car passes a rigorous multi-point inspection.</p>
              </div>
            </div>
            
            <div className={styles.feature}>
              <div className={styles.iconBox}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <div>
                <h4 className={styles.featureTitle}>Reliability & Safety</h4>
                <p className={styles.featureText}>We prioritize your peace of mind on Sri Lankan roads.</p>
              </div>
            </div>
          </div>
          
          <button className="btn-primary" style={{ marginTop: '2rem' }}>Learn More About Us</button>
        </div>
        
        <div className={styles.imageContent}>
          <div className={styles.glassBadge}>
            <h3>10+ Years</h3>
            <p>Of Excellence</p>
          </div>
        </div>
      </div>
    </section>
  );
}
