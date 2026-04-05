import CarCard from '@/components/CarCard';
import styles from './inventory.module.css';
import { supabase } from '@/lib/supabaseClient';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Inventory | Prius Mahagedara',
  description: 'Browse our extensive stock of high-end vehicles.',
};

export default async function InventoryPage() {
  const { data: cars, error } = await supabase
    .from('vehicles')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error fetching vehicles:', error);
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div className="container">
          <h1 className={styles.title}>Vehicle <span style={{ color: 'var(--accent-red)' }}>Inventory</span></h1>
          <p className={styles.subtitle}>Find your perfect ride from our curated selection.</p>
        </div>
      </div>

      <div className={`container ${styles.layout}`}>
        {/* Sidebar Filters */}
        <aside className={styles.sidebar}>
          <div className="glass-panel" style={{ padding: '2rem' }}>
            <h3 className={styles.filterTitle}>Filters</h3>
            
            <div className={styles.filterGroup}>
              <label>Brand</label>
              <select className={styles.select}>
                <option>All Brands</option>
                <option>Toyota</option>
                <option>Honda</option>
                <option>Mercedes-Benz</option>
                <option>Land Rover</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Price Range</label>
              <select className={styles.select}>
                <option>Any Price</option>
                <option>Under 10 Mil.</option>
                <option>10 Mil. - 30 Mil.</option>
                <option>30 Mil. - 60 Mil.</option>
                <option>Over 60 Mil.</option>
              </select>
            </div>

            <div className={styles.filterGroup}>
              <label>Transmission</label>
              <select className={styles.select}>
                <option>Any</option>
                <option>Automatic</option>
                <option>Manual</option>
              </select>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1rem' }}>Apply Filters</button>
          </div>
        </aside>

        {/* Main Grid */}
        <main className={styles.main}>
          <div className={styles.grid}>
            {(!cars || cars.length === 0) ? (
              <div style={{ gridColumn: '1/-1', textAlign: 'center', padding: '3rem' }}>
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem' }}>No Vehicles Available</h3>
                <p style={{ color: '#8b92a5' }}>Check back soon as we update our inventory daily.</p>
              </div>
            ) : (
              cars.map(car => (
                <CarCard key={car.id} {...car} year={car.year_of_manufacture} />
              ))
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
