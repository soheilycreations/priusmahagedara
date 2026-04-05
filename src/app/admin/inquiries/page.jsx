"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/components/admin/Admin.module.css';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchInquiries();
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('inquiries')
      .select(`
        *,
        vehicles (
          brand,
          model,
          year_of_manufacture
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching inquiries:', error);
    } else {
      setInquiries(data || []);
    }
    setLoading(false);
  };

  const handleStatusChange = async (id, newStatus) => {
    const { error } = await supabase
      .from('inquiries')
      .update({ status: newStatus })
      .eq('id', id);
    
    if (error) {
      alert('Error updating status: ' + error.message);
    } else {
      setInquiries(inquiries.map(i => i.id === id ? { ...i, status: newStatus } : i));
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this inquiry?')) {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Error deleting inquiry: ' + error.message);
      } else {
        setInquiries(inquiries.filter(i => i.id !== id));
      }
    }
  };

  return (
    <>
      <div style={{ marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Test Drive Inquiries</h1>
        <p style={{ color: '#8b92a5' }}>Manage and track customer test drive requests.</p>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Requests</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Customer</th>
              <th>Vehicle</th>
              <th>Appointment</th>
              <th>Status</th>
              <th width="120">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading Inquiries...</td>
              </tr>
            ) : inquiries.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No inquiries found.</td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id}>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{inquiry.customer_name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#8b92a5' }}>{inquiry.customer_phone}</div>
                    {inquiry.customer_email && <div style={{ fontSize: '0.75rem', opacity: 0.6 }}>{inquiry.customer_email}</div>}
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{inquiry.vehicles?.brand} {inquiry.vehicles?.model}</div>
                    <div style={{ fontSize: '0.8rem', color: '#8b92a5' }}>{inquiry.vehicles?.year_of_manufacture}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{new Date(inquiry.test_drive_date).toLocaleDateString()}</div>
                    <div style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}>{inquiry.test_drive_time}</div>
                  </td>
                  <td>
                    <select 
                      value={inquiry.status} 
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className={styles.modalInput}
                      style={{ 
                        padding: '4px 8px', 
                        fontSize: '0.8rem', 
                        width: 'auto',
                        background: inquiry.status === 'Confirmed' ? 'rgba(37, 211, 102, 0.1)' : 'rgba(255,255,255,0.05)',
                        borderColor: inquiry.status === 'Confirmed' ? '#25d366' : 'rgba(255,255,255,0.1)'
                      }}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Confirmed">Confirmed</option>
                      <option value="Completed">Completed</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td>
                    <button className={styles.actionBtn} style={{ color: 'var(--accent-red)' }} onClick={() => handleDelete(inquiry.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}
