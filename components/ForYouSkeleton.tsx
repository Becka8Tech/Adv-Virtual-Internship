// components/ForYouSkeleton.tsx

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import styles from "@/styles/ForYou.module.css";

export default function ForYouSkeleton() {
  return (
    <div className={styles.center}>
      {/* Search Bar */}
      <div style={{ marginBottom: "32px" }}>
        <Skeleton height={40} width={300} borderRadius={6} />
      </div>

      {/* Selected Book */}
      <h2 className={styles.heading}>
        <Skeleton width={250} height={28} />
      </h2>

      <div className={styles.featuredWrapper}>
        <div className={styles.featuredCard}>
          <div className={styles.featuredLeft}>
            <Skeleton count={2} width={180} height={16} style={{ marginBottom: 6 }} />
          </div>

          <div className={styles.selectedBookLine}></div>

          <div className={styles.featuredCenter}>
            <Skeleton width={120} height={180} />
          </div>

          <div className={styles.featuredRight}>
            <Skeleton width={140} height={20} style={{ marginBottom: 8 }} />
            <Skeleton width={100} height={16} style={{ marginBottom: 12 }} />
            <Skeleton width={100} height={14} />
          </div>
        </div>
      </div>

      {/* Recommended Books */}
      <h2 className={styles.heading}>
        <Skeleton width={250} height={24} />
      </h2>
      <p className={styles.subtext}>
        <Skeleton width={200} />
      </p>

      <div className={styles.recommendations}>
        {[...Array(5)].map((_, i) => (
          <div key={`rec-${i}`} className={styles.bookCard}>
            <Skeleton height={200} width={140} />
            <Skeleton width={140} height={20} style={{ marginTop: 10 }} />
            <Skeleton width={100} height={16} />
          </div>
        ))}
      </div>

      {/* Suggested Books */}
      <h2 className={styles.heading}>
        <Skeleton width={250} height={24} />
      </h2>
      <p className={styles.subtext}>
        <Skeleton width={200} />
      </p>

      <div className={styles.recommendations}>
        {[...Array(5)].map((_, i) => (
          <div key={`sugg-${i}`} className={styles.bookCard}>
            <Skeleton height={200} width={140} />
            <Skeleton width={140} height={20} style={{ marginTop: 10 }} />
            <Skeleton width={100} height={16} />
          </div>
        ))}
      </div>
    </div>
  );
}
