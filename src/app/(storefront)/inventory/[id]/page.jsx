import Link from 'next/link';
import LeasingCalculator from '@/components/LeasingCalculator';
import styles from './vdp.module.css';
import { supabase } from '@/lib/supabaseClient';

export async function generateMetadata({ params }) {
  const p = await params;
  const { data: car } = await supabase
    .from('vehicles')
    .select('brand, model')
    .eq('id', p.id)
    .single();

  if (!car) return { title: 'Vehicle | Prius Mahagedara' };
  return {
    title: `${car.brand} ${car.model} | Prius Mahagedara`,
  };
}

export default async function VehicleDetailPage(props) {
  const params = await props.params;
  
  const { data: car, error } = await supabase
    .from('vehicles')
    .select('*')
    .eq('id', params.id)
    .single();

  if (error || !car) {
    return (
      <div className="container" style={{ paddingTop: '150px', minHeight: '60vh', textAlign: 'center' }}>
        <h1 className="section-title">Vehicle Not Found</h1>
        <p style={{ marginBottom: '2rem', opacity: 0.7 }}>The vehicle you are looking for might have been sold or removed.</p>
        <Link href="/inventory" className="btn-primary">Back to Inventory</Link>
      </div>
    );
  }

  return (
    <main className={styles.page}>
      <div className={styles.heroHeader} style={{ backgroundImage: `url(${car.image || '/images/sl_car_1.png'})` }}>
        <div className={styles.overlay}></div>
        <div className={`container ${styles.headerContent}`}>
          <Link href="/inventory" className={styles.backLink}>&larr; Back to Inventory</Link>
          <div className={styles.titleInfo}>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
              <span className={styles.badge}>{car.year_of_manufacture}</span>
              {car.condition && <span className={styles.badge} style={{ background: 'rgba(37, 211, 102, 0.2)', color: '#25d366', border: '1px solid rgba(37, 211, 102, 0.3)' }}>{car.condition}</span>}
            </div>
            <h1 className={styles.title}>{car.brand} {car.model} {car.trim && <span style={{ fontWeight: 400, opacity: 0.8, fontSize: '0.8em' }}>| {car.trim}</span>}</h1>
            <div className={styles.price}>Rs. {Number(car.price || 0).toLocaleString()}</div>
          </div>
        </div>
      </div>

      <div className={`container ${styles.contentLayout}`}>
        <div className={styles.mainCol}>
          
          <div className={styles.sectionBlock}>
            <h2 className={styles.sectionTitle}>Overview</h2>
            
            <div className={styles.specsGrid}>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Condition</span>
                <span className={styles.specValue}>{car.condition || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Body Type</span>
                <span className={styles.specValue}>{car.body_type || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Mileage</span>
                <span className={styles.specValue}>{car.mileage} km</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Transmission</span>
                <span className={styles.specValue}>{car.transmission}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Fuel Type</span>
                <span className={styles.specValue}>{car.fuel}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Engine</span>
                <span className={styles.specValue}>{car.engine}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Color</span>
                <span className={styles.specValue}>{car.color || 'N/A'}</span>
              </div>
              <div className={styles.specItem}>
                <span className={styles.specLabel}>Seats</span>
                <span className={styles.specValue}>{car.seats || 'N/A'}</span>
              </div>
            </div>
            
            <div className={styles.desc}>
              {car.description ? (
                <div style={{ whiteSpace: 'pre-line' }}>{car.description}</div>
              ) : (
                <p>
                  This beautifully maintained {car.year_of_manufacture} {car.brand} {car.model} is a prime example of automotive excellence. Imported directly and stringently checked by our technicians. It features a stunning {car.color} exterior and comes fully loaded with premium options. Perfect for both city maneuvering and long-distance comfort on Sri Lankan roads.
                </p>
              )}
            </div>
          </div>

        </div>

        <aside className={styles.sidebar}>
          <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem' }}>
            <h3 style={{ marginBottom: '1.5rem', fontSize: '1.2rem' }}>Contact Sales</h3>
            <button className="btn-primary" style={{ width: '100%', marginBottom: '1rem' }}>
              Schedule Test Drive
            </button>
            <a href="https://wa.me/94777198000" target="_blank" rel="noopener noreferrer" className={styles.waBtn}>
               WhatsApp Inquiry
            </a>
          </div>

          <LeasingCalculator price={car.price || 0} />
        </aside>
      </div>
    </main>
  );
}
