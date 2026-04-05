"use client";
import { useState, useEffect } from 'react';
import styles from './LeasingCalculator.module.css';

export default function LeasingCalculator({ price }) {
  const [downpayment, setDownpayment] = useState(price * 0.3); // 30% default
  const [duration, setDuration] = useState(60); // 60 months default
  const [rate, setRate] = useState(14); // 14% annual interest rate default
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = price - downpayment;
    if (principal <= 0) {
      setMonthlyPayment(0);
      return;
    }
    const r = (rate / 100) / 12; // monthly interest rate
    const n = duration;
    
    // M = P [ i(1 + i)^n ] / [ (1 + i)^n - 1]
    const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(payment);
  }, [price, downpayment, duration, rate]);

  return (
    <div className={`glass-panel ${styles.calculator}`}>
      <h3 className={styles.title}>Estimate Your Leasing</h3>
      
      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <label>Vehicle Price</label>
          <span>Rs. {price.toLocaleString()}</span>
        </div>
        {/* Read-only since it's for this specific car */}
      </div>

      <div className={styles.inputGroup}>
        <div className={styles.labelRow}>
          <label>Down Payment</label>
          <span>Rs. {downpayment.toLocaleString()}</span>
        </div>
        <input 
          type="range" 
          min="0" 
          max={price} 
          step="100000"
          value={downpayment}
          onChange={(e) => setDownpayment(Number(e.target.value))}
          className={styles.range}
        />
        <div className={styles.rangeLabels}>
          <span>0%</span>
          <span>{Math.round((downpayment/price)*100)}%</span>
        </div>
      </div>

      <div className={styles.row}>
        <div className={styles.inputGroup}>
          <label>Duration (Months)</label>
          <select 
            className={styles.select}
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
          >
            <option value={12}>12 Months (1 Year)</option>
            <option value={24}>24 Months (2 Years)</option>
            <option value={36}>36 Months (3 Years)</option>
            <option value={48}>48 Months (4 Years)</option>
            <option value={60}>60 Months (5 Years)</option>
            <option value={72}>72 Months (6 Years)</option>
          </select>
        </div>

        <div className={styles.inputGroup}>
          <label>Interest Rate (%)</label>
          <input 
            type="number" 
            className={styles.numInput} 
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
          />
        </div>
      </div>

      <div className={styles.result}>
        <span className={styles.resultLabel}>Estimated Monthly Payment:</span>
        <span className={styles.resultVal}>Rs. {Math.round(monthlyPayment).toLocaleString()}</span>
      </div>
      
      <p className={styles.disclaimer}>
        * This is only an estimate based on standard banking rates. Actual rates may vary.
      </p>
    </div>
  );
}
