import styles from "@/styles/SkeletonBookCard.module.css";

export default function SkeletonBookCard() {
  return (
    <div className={styles.card}>
      <div className={styles.image} />
      <div className={styles.titleLine} />
      <div className={styles.authorLine} />
      <div className={styles.descriptionLine} />
      <div className={styles.footer}>
        <div className={styles.iconLine} />
        <div className={styles.ratingLine} />
      </div>
    </div>
  );
}
