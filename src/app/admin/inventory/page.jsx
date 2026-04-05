"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import styles from '@/components/admin/Admin.module.css';

const emptyForm = {
  brand: '', model: '', trim: '', year_of_manufacture: '', price: '', mileage: '', 
  transmission: 'Automatic', fuel: 'Petrol', color: '', 
  engine: '', seats: '', status: 'Available', image: null,
  condition: 'Reconditioned', body_type: 'Hatchback', description: ''
};

export default function AdminInventory() {
  const [inventory, setInventory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCar, setEditingCar] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('vehicles')
      .select('*')
      .order('created_at', { ascending: false });
    
    if (error) {
      console.error('Error fetching inventory:', error);
    } else {
      setInventory(data || []);
    }
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      const { error } = await supabase
        .from('vehicles')
        .delete()
        .eq('id', id);
      
      if (error) {
        alert('Error deleting vehicle: ' + error.message);
      } else {
        setInventory(inventory.filter(car => car.id !== id));
      }
    }
  };

  const openAddModal = () => {
    setEditingCar(null);
    setFormData(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (car) => {
    setEditingCar(car);
    setFormData({ ...car });
    setIsModalOpen(true);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('vehicle-images')
        .upload(filePath, file);

      if (uploadError) {
        alert('Error uploading image: ' + uploadError.message);
        setLoading(false);
        return;
      }

      const { data: { publicUrl } } = supabase.storage
        .from('vehicle-images')
        .getPublicUrl(filePath);

      setFormData({ ...formData, image: publicUrl });
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const carData = { 
      ...formData, 
      price: formData.price ? Number(formData.price) : 0,
      seats: formData.seats ? Number(formData.seats) : null
    };

    if (!editingCar) delete carData.id;
    delete carData.created_at;

    if (editingCar) {
      const { error } = await supabase
        .from('vehicles')
        .update(carData)
        .eq('id', editingCar.id);
      
      if (error) {
        alert('Error updating vehicle: ' + error.message);
      } else {
        fetchInventory();
        setIsModalOpen(false);
      }
    } else {
      const { error } = await supabase
        .from('vehicles')
        .insert([carData]);
      
      if (error) {
        alert('Error adding vehicle: ' + error.message);
      } else {
        fetchInventory();
        setIsModalOpen(false);
      }
    }
  };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2rem' }}>Inventory Management</h1>
        <button className="btn-primary" onClick={openAddModal}>
          + Add Vehicle
        </button>
      </div>

      <div className={styles.tableWrapper}>
        <div className={styles.tableHeader}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>All Vehicles</h3>
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th width="80">Image</th>
              <th>Vehicle</th>
              <th>Price (LKR)</th>
              <th>Status</th>
              <th width="150">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>Loading Inventory...</td>
              </tr>
            ) : inventory.length === 0 ? (
              <tr>
                <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>No vehicles found in database.</td>
              </tr>
            ) : (
              inventory.map((car) => (
                <tr key={car.id}>
                  <td>
                    <img src={car.image || '/images/sl_car_1.png'} alt={car.model} className={styles.thumbnail} />
                  </td>
                  <td>
                    <div style={{ fontWeight: 600, color: '#fff' }}>{car.model} {car.year_of_manufacture}</div>
                    <div style={{ fontSize: '0.85rem', color: '#8b92a5' }}>{car.brand} {car.trim ? `| ${car.trim}` : ''}</div>
                  </td>
                  <td style={{ fontWeight: 500 }}>
                    Rs. {Number(car.price || 0).toLocaleString()}
                  </td>
                  <td>
                    <span className={`${styles.statusBadge} ${car.status === 'Available' ? styles.statusAvail : styles.statusSold}`}>
                      {car.status}
                    </span>
                  </td>
                  <td>
                    <button className={styles.actionBtn} onClick={() => openEditModal(car)}>Edit</button>
                    <button className={styles.actionBtn} style={{ color: 'var(--accent-red)' }} onClick={() => handleDelete(car.id)}>Delete</button>
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
            <h2 style={{ marginBottom: '1.5rem', fontSize: '1.5rem' }}>
              {editingCar ? 'Edit Vehicle Details' : 'Add New Vehicle'}
            </h2>
            <form onSubmit={handleSave} className={styles.formGrid}>
              
              <div className={styles.fullWidth}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Vehicle Image</label>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                   {formData.image && <img src={formData.image} alt="Preview" style={{ width: 80, height: 60, objectFit: 'cover', borderRadius: 8 }} />}
                   <input 
                      type="file" 
                      accept="image/*" 
                      onChange={handleImageChange} 
                      className={styles.fileInput} 
                      disabled={loading}
                   />
                </div>
                {loading && <span style={{ fontSize: '0.8rem', color: 'var(--accent-red)' }}>Uploading...</span>}
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Brand</label>
                <input required type="text" className={styles.modalInput} value={formData.brand} onChange={e => setFormData({...formData, brand: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Model</label>
                <input required type="text" className={styles.modalInput} value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Trim / Edition</label>
                <input type="text" className={styles.modalInput} value={formData.trim || ''} onChange={e => setFormData({...formData, trim: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Year of Manufacture</label>
                <input required type="number" className={styles.modalInput} value={formData.year_of_manufacture} onChange={e => setFormData({...formData, year_of_manufacture: e.target.value})} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Condition</label>
                <select className={styles.modalInput} value={formData.condition} onChange={e => setFormData({...formData, condition: e.target.value})}>
                  <option value="Brand New">Brand New</option>
                  <option value="Reconditioned">Reconditioned</option>
                  <option value="Registered">Registered</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Transmission</label>
                <select className={styles.modalInput} value={formData.transmission} onChange={e => setFormData({...formData, transmission: e.target.value})}>
                  <option value="Automatic">Automatic</option>
                  <option value="Manual">Manual</option>
                  <option value="Tiptronic">Tiptronic</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Body Type</label>
                <select className={styles.modalInput} value={formData.body_type} onChange={e => setFormData({...formData, body_type: e.target.value})}>
                  <option value="Hatchback">Hatchback</option>
                  <option value="Sedan">Sedan</option>
                  <option value="SUV">SUV</option>
                  <option value="Crossover">Crossover</option>
                  <option value="Van">Van</option>
                  <option value="Pickup">Pickup</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Fuel Type</label>
                <select className={styles.modalInput} value={formData.fuel} onChange={e => setFormData({...formData, fuel: e.target.value})}>
                  <option value="Petrol">Petrol</option>
                  <option value="Diesel">Diesel</option>
                  <option value="Hybrid">Hybrid</option>
                  <option value="Electric">Electric</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Engine Capacity (cc)</label>
                <input required type="text" className={styles.modalInput} value={formData.engine} onChange={e => setFormData({...formData, engine: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Mileage (km)</label>
                <input required type="text" className={styles.modalInput} value={formData.mileage} onChange={e => setFormData({...formData, mileage: e.target.value})} />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Price (LKR)</label>
                <input required type="number" className={styles.modalInput} value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Seats</label>
                <input type="number" className={styles.modalInput} value={formData.seats || ''} onChange={e => setFormData({...formData, seats: e.target.value})} />
              </div>

              <div className={styles.fullWidth}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Description</label>
                <textarea 
                  className={styles.modalInput} 
                  rows="5" 
                  value={formData.description || ''} 
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="Enter vehicle features and description..."
                ></textarea>
              </div>

              <div className={styles.fullWidth}>
                <label style={{ display: 'block', marginBottom: '0.5rem', color: '#8b92a5' }}>Status</label>
                <select className={styles.modalInput} value={formData.status} onChange={e => setFormData({...formData, status: e.target.value})}>
                  <option value="Available">Available</option>
                  <option value="Sold">Sold</option>
                </select>
              </div>

              <div className={styles.fullWidth} style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1rem' }}>
                <button type="button" className={styles.actionBtn} onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="btn-primary" style={{ padding: '10px 24px' }}>
                  {editingCar ? 'Save Changes' : 'Add Vehicle'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
