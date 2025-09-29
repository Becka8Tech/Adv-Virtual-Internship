import { useEffect, useState } from 'react';
import styles from './ImpactStats.module.css';

export default function ImpactStats() {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % 6);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const impactStatements = [
    'Expand your learning',
    'Accomplish your goals',
    'Strengthen your vitality',
    'Become a better caregiver',
    'Improve your mood',
    'Maximize your abilities',
  ];

  return (
    <section className={styles.container}>
      <div className={styles.statsBox}>
        <p><span className={styles.percentage}>91%</span> of Summarist members <strong>report feeling more productive</strong> after incorporating the service into their daily routine.</p>
        <p><span className={styles.percentage}>94%</span> of Summarist members have <strong>noticed an improvement</strong> in their overall comprehension and retention of information.</p>
        <p><span className={styles.percentage}>88%</span> of Summarist members <strong>feel more informed</strong> about current events and industry trends since using the platform.</p>
      </div>

      <div className={styles.impactText}>
        {impactStatements.map((text, idx) => (
          <p key={idx} className={`${styles.statement} ${idx === activeIndex ? styles.active : ''}`}>
            {text}
          </p>
        ))}
      </div>
    </section>
  );
}
