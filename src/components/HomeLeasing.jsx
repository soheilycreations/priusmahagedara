"use client";
import { useState, useEffect } from 'react';
import styles from './HomeLeasing.module.css';

export default function HomeLeasing() {
  const [price, setPrice] = useState(25000000);
  const [downpayment, setDownpayment] = useState(7500000);
  const [duration, setDuration] = useState(60);
  const [monthlyPayment, setMonthlyPayment] = useState(0);

  useEffect(() => {
    const principal = price - downpayment;
    if (principal <= 0) {
        setMonthlyPayment(0);
        return;
    }
    const r = (14 / 100) / 12; // 14% interest rate assumed
    const n = duration;
    const payment = (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
    setMonthlyPayment(payment);
  }, [price, downpayment, duration]);

  return (
    <section id="leasing" className={styles.section}>
      <div className="container">
        <div className={styles.layout}>
          <div className={styles.content}>
            <h2 className="section-title">Drive Home with <span style={{ color: 'var(--accent-red)' }}>Smart Leasing</span></h2>
            <p className={styles.desc}>Calculate your monthly installment instantly. We partner with top-tier banks to provide you the lowest interest rates in Sri Lanka.</p>
            
            <div className={styles.stats}>
                <div className={styles.statItem}>
                    <strong>14.5%</strong>
                    <span>Starting Rate</span>
                </div>
                <div className={styles.statItem}>
                    <strong>24H</strong>
                    <span>Fast Approval</span>
                </div>
                <div className={styles.statItem}>
                    <strong>7 Years</strong>
                    <span>Max Tenure</span>
                </div>
            </div>
          </div>

          <div className={`glass-panel ${styles.calcCard}`}>
            <div className={styles.calcGroup}>
              <label>Vehicle Price (LKR)</label>
              <input type="number" value={price} onChange={e => setPrice(Number(e.target.value))} />
            </div>

            <div className={styles.calcGroup}>
              <label>Down Payment (LKR) - {Math.round((downpayment/price)*100)}%</label>
              <input type="range" min={0} max={price} step={100000} value={downpayment} onChange={e => setDownpayment(Number(e.target.value))} />
            </div>

            <div className={styles.calcGroup}>
              <label>Leasing Period (Months)</label>
              <select value={duration} onChange={e => setDuration(Number(e.target.value))}>
                <option value={12}>12 Months</option>
                <option value={24}>24 Months</option>
                <option value={36}>36 Months</option>
                <option value={48}>48 Months</option>
                <option value={60}>60 Months</option>
                <option value={72}>72 Months</option>
              </select>
            </div>

            <div className={styles.result}>
                <span>Monthly Installment</span>
                <div className={styles.payment}>Rs. {Math.round(monthlyPayment).toLocaleString()}</div>
            </div>

            <button className="btn-primary" style={{ width: '100%', marginTop: '1.5rem' }}>Get Approval Now</button>
          </div>
        </div>
      </div>
    </section>
  );
}
