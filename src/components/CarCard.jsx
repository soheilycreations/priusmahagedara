import Link from 'next/link';
import styles from './CarCard.module.css';

export default function CarCard({ id, image, brand, model, trim, year, year_of_manufacture, price, mileage, transmission, fuel, status }) {
  const displayYear = year_of_manufacture || year;
  const isSold = status === 'Sold';

  return (
    <Link href={`/inventory/${id}`} className={`${styles.card} ${isSold ? styles.soldCard : ''}`}>
      <div className={styles.imageWrapper}>
        {isSold && <div className={styles.soldBadge}>SOLD</div>}
        <img 
          src={image || '/images/sl_car_1.png'} 
          alt={`${displayYear} ${brand} ${model}`} 
          className={`${styles.image} ${isSold ? styles.soldImage : ''}`} 
        />
        <div className={styles.priceTag}>Rs. {Number(price || 0).toLocaleString()}</div>
      </div>
      
      <div className={styles.content}>
        <div className={styles.header}>
          <div style={{ flex: 1 }}>
            <h3 className={styles.title}>{brand} {model}</h3>
            {trim && <div style={{ fontSize: '0.8rem', color: '#8b92a5', marginTop: '2px' }}>{trim}</div>}
          </div>
          <span className={styles.year}>{displayYear}</span>
        </div>
        
        <div className={styles.badges}>
          <div className={styles.badge} title="Mileage">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            {mileage} km
          </div>
          <div className={styles.badge} title="Transmission">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
            {transmission}
          </div>
          <div className={styles.badge} title="Fuel Type">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            {fuel}
          </div>
        </div>
      </div>
    </Link>
  );
}
