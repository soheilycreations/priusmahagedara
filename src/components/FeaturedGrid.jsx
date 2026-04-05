import styles from './FeaturedGrid.module.css';
import CarCard from './CarCard';
import { supabase } from '@/lib/supabaseClient';

export default async function FeaturedGrid() {
  const { data: arrivals, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(3);

  if (error) {
    console.error('Error fetching featured vehicles:', error);
  }

  const displayCars = arrivals || [];

  return (
    <section className={styles.section} id="inventory">
      <div className={`container`}>
        <div className={styles.header}>
          <h2 className="section-title">New <span style={{ color: 'var(--accent-red)' }}>Arrivals</span></h2>
          <a href="/inventory" className={styles.viewAll}>View All Inventory &rarr;</a>
        </div>
        
        <div className={styles.grid}>
          {displayCars.length === 0 ? (
            <p style={{ gridColumn: '1/-1', textAlign: 'center', opacity: 0.5 }}>Check back later for new arrivals.</p>
          ) : (
            displayCars.map((car) => (
              <CarCard key={car.id} {...car} year={car.year_of_manufacture} />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
