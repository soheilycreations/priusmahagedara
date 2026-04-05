import Link from 'next/link';
import styles from './CategoryRibbon.module.css';

const categories = [
  { 
    id: 'suv', 
    name: 'Premium SUVs', 
    svg: (
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 18H8.5V16H10.5V18M38 18H42M42 18H45L46 14.5L44 8.5L25 6L16 8.5L8 9L3 14L4 18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9.5" cy="18.5" r="3.5" stroke="currentColor" strokeWidth="2"/>
        <circle cx="39.5" cy="18.5" r="3.5" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: 'sedan', 
    name: 'Luxury Sedans', 
    svg: (
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17H7.5M40.5 17H46M46 17L44 14L38 13L28 7L16 7L10 13L4 14L2 17ZM10.5 17.5V15.5H12.5V17.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="17.5" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="39" cy="17.5" r="3" stroke="currentColor" strokeWidth="2"/>
      </svg>
    )
  },
  { 
    id: 'hybrid', 
    name: 'Hybrid / EV', 
    svg: (
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 17H46L44 14L38 13L28 7L16 7L10 13L4 14L2 17Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="17.5" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="39" cy="17.5" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M22 10L20 13H24L22 16" stroke="var(--accent-red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    )
  },
  { 
    id: 'van', 
    name: 'Family Vans', 
    svg: (
      <svg width="48" height="24" viewBox="0 0 48 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M2 18H46V9C46 7.5 44.5 6 43 6H12C10.5 6 4 9 2 13V18Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="9" cy="18.5" r="3" stroke="currentColor" strokeWidth="2"/>
        <circle cx="39" cy="18.5" r="3" stroke="currentColor" strokeWidth="2"/>
        <path d="M12 6V18M28 6V18" stroke="currentColor" strokeWidth="1" strokeOpacity="0.3"/>
      </svg>
    )
  }
];

export default function CategoryRibbon() {
  return (
    <div className={styles.wrapper}>
      <div className={`container ${styles.grid}`}>
        {categories.map((cat) => (
          <Link href={`/inventory?type=${cat.id}`} key={cat.id} className={styles.item}>
            <div className={styles.iconBox}>
              {cat.svg}
            </div>
            <span className={styles.name}>{cat.name}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
