import { useEffect, useState } from 'react';
import styles from './BenefitStats.module.css';

const BENEFITS = [
  'Enhance your knowledge',
  'Achieve greater success',
  'Improve your health',
  'Develop better parenting skills',
  'Increase happiness',
  'Be the best version of yourself!',
];

export default function BenefitStats() {
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setHighlightedIndex((prev) => (prev + 1) % BENEFITS.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className={styles.container}>
      <div className={styles.left}>
        {BENEFITS.map((benefit, idx) => (
          <p
            key={idx}
            className={`${styles.benefit} ${
              idx === highlightedIndex ? styles.highlight : ''
            }`}
          >
            {benefit}
          </p>
        ))}
      </div>
      <div className={styles.right}>
        <p>
          <span className={styles.percentage}>93%</span> of Summarist members{' '}
          <strong>significantly increase</strong> reading frequency.
        </p>
        <p>
          <span className={styles.percentage}>96%</span> of Summarist members{' '}
          <strong>establish better</strong> habits.
        </p>
        <p>
          <span className={styles.percentage}>90%</span> have made{' '}
          <strong>significant positive</strong> change to their lives.
        </p>
      </div>
    </section>
  );
}
