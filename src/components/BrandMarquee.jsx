import styles from './BrandMarquee.module.css';

const brands = [
  'Toyota', 'Honda', 'Mercedes-Benz', 'Land Rover', 'BMW', 'Audi', 'Kia', 'Ford', 'Mitsubishi', 'Hyundai'
];

export default function BrandMarquee() {
  return (
    <div className={styles.marquee}>
      <div className={styles.track}>
        {/* Render twice for infinite loop effect */}
        {[...brands, ...brands].map((brand, index) => (
          <div key={index} className={styles.brand}>
            {brand}
          </div>
        ))}
      </div>
    </div>
  );
}
