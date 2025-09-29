// components/BookCard.tsx
import styles from "../styles/BookCard.module.css";
import Image from "next/image";
import { FiClock, FiStar } from "react-icons/fi";

interface BookCardProps {
  image: string;
  title: string;
  author: string;
  duration: string;
  rating: number;
  description?: string;
  showPremiumTag?: boolean;
}

export default function BookCard({
  image,
  title,
  author,
  duration,
  rating,
  description,
  showPremiumTag = false,
}: BookCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Image src={image} alt={title} width={172} height={172} />

        {/* Premium Book Pill */}
        {showPremiumTag && (
          <div className={styles.premiumTag}>Premium</div>
        )}
      </div>

      <div className={styles.cardContent}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.author}>{author}</p>

        {description && <p className={styles.description}>{description}</p>}

        <div className={styles.meta}>
          <div className={styles.metaItem}>
            <FiClock className={styles.icon} />
            <span>{duration}</span>
          </div>
          <div className={styles.metaItem}>
            <FiStar className={styles.icon} />
            <span>{rating.toFixed(1)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
