import { Crown, Star, Leaf } from 'lucide-react';
import styles from './GrowthSection.module.css';

export default function GrowthSection() {
  return (
    <section className={styles.container}>
      <h2 className={styles.heading}>Start growing with Summarist now</h2>
      <div className={styles.grid}>
        <div className={styles.card}>
          <Crown className={styles.icon} />
          <h3 className={styles.stat}>3 Million</h3>
          <p className={styles.text}>Downloads on all platforms</p>
        </div>
        <div className={styles.card}>
          <div className={styles.starRating}>
            {'★'.repeat(4)}<span className={styles.halfStar}>★</span>
          </div>
          <h3 className={styles.stat}>4.5 Stars</h3>
          <p className={styles.text}>Average ratings on iOS and Google Play</p>
        </div>
        <div className={styles.card}>
          <Leaf className={styles.icon} />
          <h3 className={styles.stat}>97%</h3>
          <p className={styles.text}>Of Summarist members create a better reading habit</p>
        </div>
      </div>
    </section>
  );
}
