"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/components/admin/Admin.module.css';

const emptyForm = {
  caption: '',
  media_url: '',
  media_type: 'image',
  rating: 5
};

export default function AdminFeedbacks() {
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState(emptyForm);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('feedbacks')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching feedbacks:', error);
    } else {
      setFeedbacks(data || []);
    }
    setLoading(false);
  };

  const handleMediaUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `feedbacks/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehicle-images') // Reusing the same bucket for simplicity or use a new one
        .upload(filePath, file);

      if (uploadError) {
        alert('Error uploading media: ' + uploadError.message);
        setUploading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, media_url: publicUrl });
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this feedback?')) {
      const { error } = await supabase
        .from('feedbacks')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Error deleting feedback: ' + error.message);
      } else {
        setFeedbacks(feedbacks.filter(f => f.id !== id));
      }
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const { error } = await supabase
      .from('feedbacks')
      .insert([formData]);
    
    if (error) {
      alert('Error adding feedback: ' + error.message);
    } else {
      fetchFeedbacks();
      setIsModalOpen(false);
      setFormData(emptyForm);
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Customer Feedbacks</h1>
        <button className="btn-primary" onClick={() => setIsModalOpen(true)}>
          + Add New Feedback
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Manage Gallery</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="120">Media</th>
              <th>Caption</th>
              <th>Rating</th>
              <th width="100">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>Loading Gallery...</td>
              </tr>
            ) : feedbacks.length === 0 ? (
              <tr>
                <td colSpan="4" style={{ textAlign: 'center', padding: '2rem' }}>No feedbacks found. Add some happy customer moments!</td>
              </tr>
            ) : (
              feedbacks.map((f) => (
                <tr key={f.id}>
                  <td>
                    {f.media_type === 'video' ? (
                      <div className={styles.thumbnail} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#222' }}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
                      </div>
                    ) : (
                      <img src={f.media_url} alt="Feedback" className={styles.thumbnail} />
                    )}
                  </td>
                  <td>{f.caption}</td>
                  <td>
                    <div style={{ color: '#ffc107', fontSize: '0.85rem' }}>
                      {'★'.repeat(f.rating || 5)}{'☆'.repeat(5 - (f.rating || 5))}
                    </div>
                    <span style={{ fontSize: '0.7rem', opacity: 0.5 }}>{f.media_type}</span>
                  </td>
                  <td>
                    <button className={styles.actionBtn} style={{ color: 'var(--accent-red)' }} onClick={() => handleDelete(f.id)}>Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>Add Customer Moment</h2>
            <form onSubmit={handleSave} className={styles.formGrid}>
              
              <div className={styles.fullWidth}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Upload Photo/Video</label>
                <input 
                  type="file" 
                  accept="image/*,video/*" 
                  onChange={handleMediaUpload} 
                  className={styles.fileInput}
                  disabled={uploading}
                />
                {uploading && <p style={{ color: 'var(--accent-red)', fontSize: '0.8rem', marginTop: '0.5rem' }}>Uploading media...</p>}
                {formData.media_url && !uploading && <p style={{ color: '#25d366', fontSize: '0.8rem', marginTop: '0.5rem' }}>✓ Media ready</p>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Media Type</label>
                <select 
                  className={styles.modalInput} 
                  value={formData.media_type} 
                  onChange={e => setFormData({...formData, media_type: e.target.value})}
                >
                  <option value="image">Photo</option>
                  <option value="video">Video</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Customer Rating (Stars)</label>
                <select 
                  className={styles.modalInput} 
                  value={formData.rating} 
                  onChange={e => setFormData({...formData, rating: Number(e.target.value)})}
                >
                  <option value={5}>5 Stars ★★★★★</option>
                  <option value={4}>4 Stars ★★★★☆</option>
                  <option value={3}>3 Stars ★★★☆☆</option>
                  <option value={2}>2 Stars ★★☆☆☆</option>
                  <option value={1}>1 Star  ★☆☆☆☆</option>
                </select>
              </div>

              <div className={styles.fullWidth}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Caption / Feedback Text</label>
                <textarea 
                  required
                  className={styles.modalInput} 
                  rows="3" 
                  value={formData.caption} 
                  onChange={e => setFormData({...formData, caption: e.target.value})}
                  placeholder="e.g. Happy customer taking delivery of their new Land Cruiser!"
                />
              </div>

              <div className={styles.fullWidth} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className={styles.actionBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }} disabled={uploading}>
                  Save to Gallery
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
