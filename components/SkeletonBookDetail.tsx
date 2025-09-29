// components/SkeletonBookDetail.tsx
import styles from "@/styles/BookDetail.module.css";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonBookDetail() {
  return (
    <div className={styles.bookContainer}>
      <div className={styles.bookHeader}>
        <div className={styles.text}>
          <h1><Skeleton width={250} /></h1>
          <h3><Skeleton width={180} /></h3>
          <p className={styles.subTitle}><Skeleton width={300} count={2} /></p>

          <div className={styles.metaRow}>
            <Skeleton width={150} />
          </div>

          <div className={styles.metaRow}>
            <Skeleton width={150} />
          </div>

          <div className={styles.buttonGroup}>
            <Skeleton width={100} height={40} />
            <Skeleton width={100} height={40} style={{ marginLeft: "1rem" }} />
          </div>

          <p className={styles.libraryText}><Skeleton width={200} /></p>
        </div>

        <div className={styles.imageWrapper}>
          <Skeleton height={300} width={200} />
        </div>
      </div>

      <div className={styles.bookContent}>
        <h3><Skeleton width={180} /></h3>
        <div className={styles.tags}>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} width={60} height={25} style={{ marginRight: "0.5rem" }} />
          ))}
        </div>

        <p className={styles.description}><Skeleton count={5} /></p>

        <h3><Skeleton width={200} /></h3>
        <p className={styles.description}><Skeleton count={4} /></p>
      </div>
    </div>
  );
}
