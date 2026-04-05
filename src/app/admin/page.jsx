import styles from '../../components/admin/Admin.module.css';

export default function AdminDashboard() {
  return (
    <>
      <h1 style={{ fontSize: '2rem', marginBottom: '2rem' }}>Dashboard Overview</h1>
      
      <div className={styles.kpiGrid}>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Total Vehicles</div>
          <div className={styles.kpiVal}>124</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Inventory Value</div>
          <div className={styles.kpiVal}>Rs. 1.2B</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Active Inquiries</div>
          <div className={styles.kpiVal}>42</div>
        </div>
        <div className={styles.kpiCard}>
          <div className={styles.kpiLabel}>Weekly Views</div>
          <div className={styles.kpiVal}>14,208</div>
        </div>
      </div>
      
      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 600 }}>Recent Activity</h3>
        </div>
        <div style={{ padding: '2rem', color: '#8b92a5', textAlign: 'center' }}>
          No recent activity to display.
        </div>
      </div>
    </>
  );
}
