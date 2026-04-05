import styles from './HappyCustomers.module.css';
import { supabase } from '@/lib/supabaseClient';

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

        <div className={styles.gallery}>
          {feedbacks.map((f) => (
            <div key={f.id} className={styles.item}>
              {f.media_type === 'video' ? (
                <video src={f.media_url} className={styles.media} controls muted />
              ) : (
                <img src={f.media_url} alt={f.caption} className={styles.media} />
              )}
              <div className={styles.overlay}>
                <p className={styles.caption}>{f.caption}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
