"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from './TestDriveModal.module.css';

export default function TestDriveModal({ isOpen, onClose, vehicleId, vehicleName }) {
  const [formData, setFormData] = useState({
    customer_name: '',
    customer_phone: '',
    customer_email: '',
    test_drive_date: '',
    test_drive_time: '10:00 AM',
    vehicle_id: vehicleId
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await supabase
      .from('inquiries')
      .insert([formData]);

    if (error) {
      alert('Error scheduling test drive: ' + error.message);
    } else {
      setSuccess(true);
      setTimeout(() => {
        onClose();
        setSuccess(false);
        setFormData({
          customer_name: '',
          customer_phone: '',
          customer_email: '',
          test_drive_date: '',
          test_drive_time: '10:00 AM',
          vehicle_id: vehicleId
        });
      }, 3000);
    }
    setLoading(false);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <button className={styles.closeBtn} onClick={onClose}>&times;</button>
        
        {success ? (
          <div className={styles.successState}>
            <div className={styles.successIcon}>✓</div>
            <h2 className={styles.title}>Appointment Scheduled!</h2>
            <p className={styles.text}>We've received your request for the <strong>{vehicleName}</strong>. Our team will contact you shortly to confirm the time.</p>
          </div>
        ) : (
          <>
            <h2 className={styles.title}>Schedule Test Drive</h2>
            <p className={styles.subtitle}>Experience the <strong>{vehicleName}</strong> in person.</p>
            
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name</label>
                <input 
                  required 
                  type="text" 
                  className={styles.input} 
                  placeholder="Enter your name" 
                  value={formData.customer_name}
                  onChange={(e) => setFormData({...formData, customer_name: e.target.value})}
                />
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Phone Number</label>
                  <input 
                    required 
                    type="tel" 
                    className={styles.input} 
                    placeholder="07x xxxxxxx" 
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({...formData, customer_phone: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Email (Optional)</label>
                  <input 
                    type="email" 
                    className={styles.input} 
                    placeholder="example@mail.com" 
                    value={formData.customer_email}
                    onChange={(e) => setFormData({...formData, customer_email: e.target.value})}
                  />
                </div>
              </div>
              
              <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Date</label>
                  <input 
                    required 
                    type="date" 
                    min={new Date().toISOString().split('T')[0]}
                    className={styles.input} 
                    value={formData.test_drive_date}
                    onChange={(e) => setFormData({...formData, test_drive_date: e.target.value})}
                  />
                </div>
                <div className={styles.formGroup}>
                  <label className={styles.label}>Preferred Time</label>
                  <select 
                    className={styles.input}
                    value={formData.test_drive_time}
                    onChange={(e) => setFormData({...formData, test_drive_time: e.target.value})}
                  >
                    <option>09:00 AM</option>
                    <option>10:00 AM</option>
                    <option>11:00 AM</option>
                    <option>12:00 PM</option>
                    <option>01:00 PM</option>
                    <option>02:00 PM</option>
                    <option>03:00 PM</option>
                    <option>04:00 PM</option>
                    <option>05:00 PM</option>
                  </select>
                </div>
              </div>
              
              <button disabled={loading} type="submit" className={styles.submitBtn}>
                {loading ? 'Scheduling...' : 'Confirm Appointment'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
