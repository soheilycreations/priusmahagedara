"use client";

import { useState } from 'react';
import TestDriveModal from './TestDriveModal';

export default function TestDriveAction({ vehicleId, vehicleName }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button 
        className="btn-primary" 
        style={{ width: '100%', marginBottom: '1rem' }}
        onClick={() => setIsModalOpen(true)}
      >
        Schedule Test Drive
      </button>
      
      <TestDriveModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        vehicleId={vehicleId}
        vehicleName={vehicleName}
      />
    </>
  );
}
