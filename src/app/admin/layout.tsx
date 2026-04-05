import Sidebar from '@/components/admin/Sidebar';
import Topbar from '@/components/admin/Topbar';
import styles from '@/components/admin/Admin.module.css';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className={styles.adminWrapper}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Topbar />
        <main className={styles.pageContent}>
          {children}
        </main>
      </div>
    </div>
  );
}
