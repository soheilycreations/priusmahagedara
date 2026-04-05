import styles from './Hero.module.css';

export default function Hero() {
  return (
    <div className={styles.hero}>
      <div className={styles.background}></div>
      <div className={styles.overlay}></div>
      
      <div className={`container ${styles.heroContent}`}>
        <div className={styles.mainSearch}>
          <h1 className={styles.title}>
            Drive Your <span className={styles.highlight}>Dream</span> Today
          </h1>
          <p className={styles.subtitle}>
            Discover Sri Lanka's finest collection of premium, 
            hand-picked vehicles with iron-clad reliability.
          </p>

          <div className={`glass-panel ${styles.searchBar}`}>
            <div className={styles.filterGroup}>
              <label className={styles.label}>Brand</label>
              <select className={styles.select}>
                <option>Any Brand</option>
                <option>Toyota</option>
                <option>Mercedes-Benz</option>
                <option>Land Rover</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.label}>Model</label>
              <select className={styles.select}>
                <option>All Models</option>
                <option>Prado</option>
                <option>Prius</option>
                <option>C-Class</option>
              </select>
            </div>
            <div className={styles.filterGroup}>
              <label className={styles.label}>Max Price</label>
              <select className={styles.select}>
                <option>Any Price</option>
                <option>Rs. 10M</option>
                <option>Rs. 30M</option>
                <option>Rs. 50M+</option>
              </select>
            </div>
            <button className={styles.searchBtn}>
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              Search
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
