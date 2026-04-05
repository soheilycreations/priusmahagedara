import styles from './HappyCustomers.module.css';
import { supabase } from '@/lib/supabaseClient';
import HappyCustomersSlider from './HappyCustomersSlider';

export default async function HappyCustomers() {
  const { data: feedbacks, error } = await supabase
    .from('feedbacks')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(8);

  if (error || !feedbacks || feedbacks.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.header}>
          <h2 className="section-title">Happy <span style={{ color: 'var(--accent-red)' }}>Customers</span></h2>
          <p className={styles.subtitle}>Moments of joy from families across Sri Lanka joined the Prius Mahagedara family.</p>
        </div>

        <HappyCustomersSlider feedbacks={feedbacks} />
      </div>
    </section>
  );
}
